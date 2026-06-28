<?php

namespace App\Services;

use App\Interfaces\UserModuleInterface;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\DB;

class UserModuleService implements UserModuleInterface
{
    /**
     * Get the list of modules that the authenticated user has access to based on their permissions.
     *
     * This method checks the user's profile and retrieves all active permissions associated with that profile's roles.
     * It then extracts the unique module names from those permissions and caches the result for 30 minutes.
     *
     * @return array List of module names that the user has access to (e.g. ['profiles', 'user_management']).
     *               Returns an empty array if the user is not authenticated or has no permissions.
     */
    public function getAccessibleModules(?int $profileId): array
    {
        if (!$profileId) {
            return [];
        }

        // $version = Cache::get("permissions.version.$profileId", 1);
        $version = Cache::get("permissions.version.global", 1);

        return Cache::remember(
            "user.modules.$profileId.v$version",
            now()->addMinutes(30),
            function () use ($profileId) {
                return DB::table('profile_roles as pr')
                    ->join('roles as r', 'r.id', '=', 'pr.role_id')
                    ->join('role_permissions as rp', 'rp.role_id', '=', 'r.id')
                    ->join('permissions as p', 'p.id', '=', 'rp.permission_id')
                    ->where('pr.profile_id', $profileId)
                    ->where('r.is_active', true)
                    ->where('rp.is_active', true)
                    ->where('p.is_active', true)
                    ->distinct()
                    ->pluck('p.module')
                    ->values()
                    ->toArray();
            }
        );
    }

    /**
     * Refresh the global permissions version.
     *
     * This method increments the global permissions version in the cache. It is used to invalidate
     * cached module access data for all users when permissions are updated.
     */
    public function refreshGlobalPermissionsVersion(): void
    {
        Cache::increment("permissions.version.global");
    }
}
