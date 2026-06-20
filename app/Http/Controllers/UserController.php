<?php

namespace App\Http\Controllers;

use App\Helpers\Helper;
use App\Http\Resources\IndexResource\UserGroupIndexResource;
use App\Interfaces\ActivityLogInterface;
use App\Interfaces\FetchInterfaces\RoleFetchInterface;
use App\Interfaces\FetchInterfaces\UserGroupFetchInterface;
use App\Interfaces\ManageAccountInterface;
use App\Models\User;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Gate;
use Inertia\Inertia;

class UserController extends Controller
{
    public function __construct(
        private UserGroupFetchInterface $userGroupFetch,
        private RoleFetchInterface $roleFetch,
        private ManageAccountInterface $manageAccount,
        private ActivityLogInterface $activityLog
    ) {}

    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        if (Gate::denies('view', new User())) {
            return Inertia::render('Error', [
                'code' => 403,
                'message' => 'You do not have permission to view this page.'
            ]);
        }

        $userGroups = Cache::remember('user_groups_list', 60, function () {
            $result = $this->userGroupFetch->indexUserGroups();
            return $result->data ?? [];
        });

        $roles = Cache::remember('roles_list', 60, function () {
            $result = $this->roleFetch->indexRoles();
            return $result->data ?? [];
        });

        return Inertia::render('System/Users', [
            'user_groups' => UserGroupIndexResource::collection($userGroups),
            'roles' => $roles,
            'account_types' => Helper::ACCOUNT_TYPES,
            'can' => $this->getModulePermissions(new User()),
        ]);
    }
}
