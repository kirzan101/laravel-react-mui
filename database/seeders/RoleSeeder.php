<?php

namespace Database\Seeders;

use App\Models\Permission;
use App\Models\Role;
use App\Models\RolePermission;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class RoleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $roles = [
            [
                'name' => 'Admin',
                'description' => 'Admin role',
                'user_group_id' => 1, // Assuming Admin user group has ID 1
                'permissions' => [
                    'users' => [
                        'create',
                        'view',
                        'update',
                        'delete',
                    ],
                    'user_groups' => [
                        'create',
                        'view',
                        'update',
                        'delete',
                    ],
                    'roles' => [
                        'create',
                        'view',
                        'update',
                        'delete',
                    ],
                    // 'modules' => [
                    //     'create',
                    //     'view',
                    //     'update',
                    //     'delete',
                    // ],
                ], // Example permissions
            ],
            [
                'name' => 'Programmer',
                'description' => 'Programmer role',
                'user_group_id' => 1, // Assuming Admin user group has ID 1
                'permissions' => [
                    'users' => [
                        'create',
                        'view',
                        'update',
                        'delete',
                    ],
                    'user_groups' => [
                        'create',
                        'view',
                        'update',
                        'delete',
                    ],
                    'roles' => [
                        'create',
                        'view',
                        'update',
                        'delete',
                    ],
                    // 'modules' => [
                    //     'create',
                    //     'view',
                    //     'update',
                    //     'delete',
                    // ],
                ], // Example permissions
            ],
            [
                'name' => 'System Analyst',
                'description' => 'System Analyst role',
                'user_group_id' => 1, // Assuming Admin user group has ID 1
                'permissions' => [
                    'users' => [
                        'view',
                    ],
                    'user_groups' => [
                        'view',
                    ],
                    'roles' => [
                        'view',
                    ],
                    // 'modules' => [],
                ], // Example permissions
            ],
            [
                'name' => 'Tester',
                'description' => 'Tester role',
                'user_group_id' => 1, // Assuming Admin user group has ID 1
                'permissions' => [
                    'users' => [
                        'view',
                        'create',
                    ],
                    'user_groups' => [
                        'view',
                        'create',
                    ],
                    'roles' => [
                        'view',
                        'create',
                    ],
                    // 'modules' => [],
                ], // Example permissions
            ],
        ];

        // Fetch all permissions
        $permissionLists = Permission::all();

        foreach ($roles as $roleData) {
            $role = Role::create([
                'name' => $roleData['name'],
                'description' => $roleData['description'],
                'user_group_id' => $roleData['user_group_id'],
            ]);

            if ($role) {
                $permissionModules = array_keys($roleData['permissions']); // will be ['users', 'user_groups', 'roles']
                $providedPermissions = $permissionLists->whereIn('module', $permissionModules);

                $rolePermissionData = [];
                foreach ($providedPermissions as $permission) {
                    $isActive = false; // Default to false  

                    // Check if the permission's type is in the provided permissions for its module
                    // e.g., if the permission is for 'users' and its type is 'create', check if 'create' is in $roleData['permissions']['users']
                    if (in_array($permission->type, $roleData['permissions'][$permission->module])) {
                        $isActive = $permission->is_active; // Use the is_active value from the permission
                    }

                    $rolePermissionData[] = [
                        'role_id' => $role->id,
                        'permission_id' => $permission->id,
                        'is_active' => $isActive,
                        'created_at' => now(),
                        'updated_at' => now(),
                    ];
                }

                // Insert role permissions in bulk
                if (!empty($rolePermissionData)) {
                    RolePermission::insert($rolePermissionData);
                }
            }
        }
    }
}
