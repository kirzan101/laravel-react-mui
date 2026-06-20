<?php

namespace App\Http\Controllers;

use App\Helpers\Helper;
use App\Http\Resources\IndexResource\UserGroupIndexResource;
use App\Interfaces\ActivityLogInterface;
use App\Interfaces\FetchInterfaces\RoleFetchInterface;
use App\Interfaces\FetchInterfaces\UserGroupFetchInterface;
use App\Interfaces\ManageAccountInterface;
use App\Models\User;
use App\Traits\ReturnModulePermissionTrait;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Gate;
use Inertia\Inertia;

class UserController extends Controller
{
    use ReturnModulePermissionTrait;

    public function __construct(
        private UserGroupFetchInterface $userGroupFetch,
        private RoleFetchInterface $roleFetch,
        private ManageAccountInterface $manageAccount,
        private ActivityLogInterface $activityLog
    ) {}

    /**
     * Returns the permissions for the current user profile for the given model.
     *
     * @param Model $model The Eloquent model instance representing the target module (used to determine the table name).
     *
     * @return array An array of permission types (e.g., ['view', 'update', 'delete']) for the specified module.
     */
    protected function getModulePermissions(Model $model): array
    {
        $profileId = Auth::user()?->profile?->id;

        if (!$profileId) {
            return [];
        }

        return $this->returnPermissions($model, $profileId);
    }

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
