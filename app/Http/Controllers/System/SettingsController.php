<?php

namespace App\Http\Controllers\System;

use App\Helpers\Helper;
use App\Http\Controllers\Controller;
use App\Interfaces\FetchInterfaces\PermissionFetchInterface;
use App\Interfaces\FetchInterfaces\UserGroupFetchInterface;
use App\Traits\ActivityLoggerTrait;
use App\Traits\ReturnMessageTrait;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;
use Inertia\Inertia;

class SettingsController extends Controller
{
    use ReturnMessageTrait,
        ActivityLoggerTrait;

    public function __construct(
        private PermissionFetchInterface $permissionFetch,
        private UserGroupFetchInterface $userGroupFetch,
    ) {}

    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        [
            'permissions' => $permissions,
            'userGroups' => $userGroups,
            'moduleLists' => $moduleLists,
        ] = $this->getCacheData();

        return Inertia::render('System/Settings', [
            'can' => $this->getCan(),
            'userGroupTypes' => Helper::USER_GROUP_CODE_TYPES,      // user group props
            'permissions' => $permissions,                          // role props
            'userGroups' => $userGroups,                            // role props
            'moduleLists' => $moduleLists,                          // role props
        ]);
    }

    /**
     * Get the combined permissions for various models.
     *
     * @return array
     */
    protected function getCan(): array
    {
        $userGroupCan = $this->getModulePermissions(new \App\Models\UserGroup());
        $roleCan = $this->getModulePermissions(new \App\Models\Role());
        // ... add more models as needed

        // combine all permissions into a single array
        $combinedCan = array_merge($userGroupCan, $roleCan);

        return $combinedCan;
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

        $userGroups = Cache::remember('user_group_fetch_list', 60, function () {
            $result = $this->userGroupFetch->indexUserGroups();
            return $result->data ?? [];
        });

        $moduleLists = Cache::remember('module_lists', 60, function () {
            return Helper::getModuleList();
        });

        return [
            'permissions' => $permissions,
            'userGroups' => $userGroups,
            'moduleLists' => $moduleLists,
        ];
    }
}
