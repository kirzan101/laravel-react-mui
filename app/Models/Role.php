<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Support\Facades\Cache;

class Role extends Model
{
    protected static function booted()
    {
        static::saved(fn($role) => $role->clearRoleCache());
        static::deleted(fn($role) => $role->clearRoleCache());
    }

    /**
     * Clear the role cache for the current role.
     *
     * This method clears the cache for all profiles that have this role.
     */
    public function clearRoleCache()
    {
        $this->loadMissing('profileRoles.profile');

        foreach ($this->profileRoles as $profileRole) {
            $profile = $profileRole->profile;
            if ($profile) {
                Cache::forget("user.modules.{$profile->id}"); // cache from handleInertiaRequests
            }
        }
    }

    protected $fillable = [
        'name',
        'description',
        'user_group_id',
        'is_active',
    ];

    /**
     * Get the user group that owns the role.
     */
    public function userGroup(): BelongsTo
    {
        return $this->belongsTo(UserGroup::class);
    }

    /**
     * Get the permissions associated with the role.
     */
    public function rolePermissions(): HasMany
    {
        return $this->hasMany(RolePermission::class);
    }

    /**
     * Get the profile roles associated with the role.
     */
    public function profileRoles(): HasMany
    {
        return $this->hasMany(ProfileRole::class);
    }
}
