<?php

namespace Database\Seeders;

use App\Helpers\Helper;
use App\Models\Module;
use App\Models\Permission;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class PermissionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $permissions = [
            [
                'module' => 'users',
                'icon' => 'PeopleIcon',
                'types' => ['create', 'view', 'update'],
                'order' => 1,
                'category' => null,
            ],
            [
                'module' => 'user_groups',
                'icon' => 'GroupsIcon',
                'types' => ['create', 'view', 'update'],
                'order' => 2,
                'category' => Helper::MODULE_CATEGORY_SETTINGS,
            ],
            [
                'module' => 'roles',
                'icon' => 'RoleIcon',
                'types' => ['create', 'view', 'update'],
                'order' => 3,
                'category' => Helper::MODULE_CATEGORY_SETTINGS,
            ],
            // [
            //     'module' => 'modules',
            //     'icon' => 'ViewModuleIcon',
            //     'types' => ['create', 'view', 'update'],
            //     'order' => 4,
            // ],
        ];

        $accessTypes = ['create', 'view', 'update', 'delete'];

        foreach ($permissions as $permission) {
            foreach ($accessTypes as $type) {
                $exists = Permission::where('module', $permission['module'])
                    ->where('type', $type)
                    ->exists();

                if ($exists) {
                    continue;
                }

                Permission::create([
                    'module' => $permission['module'],
                    'type' => $type,
                    'is_active' => in_array($type, $permission['types']),
                ]);
            }

            // create module
            Module::create([
                'name' => Str::title(str_replace('_', ' ', $permission['module'])),
                'icon' => $permission['icon'],
                'category' => $permission['category'],
                'route' => '/' . str_replace('_', '-', $permission['module']),
                'order' => $permission['order'],
                'base_name' => $permission['module'],
            ]);
        }
    }
}
