<?php

namespace App\Http\Controllers\System;

use App\Helpers\Helper;
use App\Http\Controllers\Controller;
use App\Interfaces\FetchInterfaces\PermissionFetchInterface;
use App\Models\Role;
use App\Models\UserGroup;
use App\Traits\ActivityLoggerTrait;
use App\Traits\ReturnMessageTrait;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Gate;
use Inertia\Inertia;

class SettingsController extends Controller
{
    use ReturnMessageTrait,
        ActivityLoggerTrait;

    public function __construct(
        private PermissionFetchInterface $permissionFetch,
    ) {}

    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        if (Gate::denies('view', new UserGroup()) && Gate::denies('view', new Role())) {
            return Inertia::render('Error', [
                'code' => 403,
                'message' => 'You do not have permission to view this page.'
            ]);
        }

        [
            'permissions' => $permissions,
            'moduleLists' => $moduleLists,
        ] = $this->getCacheData();

        return Inertia::render('System/Settings', [
            'userGroupTypes' => Helper::USER_GROUP_CODE_TYPES,      // user group props
            'permissions' => $permissions,                          // role props
            'moduleLists' => $moduleLists,                          // role props
        ]);
    }

    /**
     * Fetch and cache the required data for the settings page.
     *
     * @return array
     */
    protected function getCacheData(): array
    {
        $permissions = Cache::remember('permission_fetch_list', 60, function () {
            // Fetch the result and extract only the 'data' part
            $result = $this->permissionFetch->indexPermissions();
            return $result->data ?? []; // Only return 'data' part
        });

        $moduleLists = Cache::remember('module_lists', 60, function () {
            return Helper::getModuleList();
        });

        return [
            'permissions' => $permissions,
            'moduleLists' => $moduleLists,
        ];
    }
}
