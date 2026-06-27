<?php

namespace App\Http\Middleware;

use App\Helpers\Helper;
use App\Models\Module;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\DB;
use Inertia\Middleware;

class HandleInertiaRequests extends Middleware
{
    /**
     * The root template that's loaded on the first page visit.
     *
     * @see https://inertiajs.com/server-side-setup#root-template
     *
     * @var string
     */
    protected $rootView = 'app';

    /**
     * Determines the current asset version.
     *
     * @see https://inertiajs.com/asset-versioning
     */
    public function version(Request $request): ?string
    {
        return parent::version($request);
    }

    /**
     * Define the props that are shared by default.
     *
     * @see https://inertiajs.com/shared-data
     *
     * @return array<string, mixed>
     */
    public function share(Request $request): array
    {
        $modules = Cache::rememberForever('active_modules', function () {
            return Module::where('is_active', true)
                ->select('name', 'icon', 'route', 'category', 'order', 'base_name')
                ->get()
                ->toArray();
        });

        return array_merge(parent::share($request), [
            'appVersion' => env('APP_VERSION', '1.0.0'),
            'appName' => env('APP_NAME', 'Laravel'),
            'appDeveloper' => env('APP_DEVELOPER', 'Developer'),
            'flash' => function () use ($request) {
                return [
                    // 'message' => $request->session()->get('message'), // ambiguous, use specific keys for different types of messages    
                    'success' => $request->session()->get('success'),
                    'error' => $request->session()->get('error'),
                    'info' => $request->session()->get('info'),
                    'warning' => $request->session()->get('warning'),
                ];
            },
            'auth' => Auth::check() ? [
                'user' => [
                    'avatar' => Auth::user()->profile?->avatar,
                    'username' => Auth::user()->username,
                    'name' => Auth::user()->profile?->getFullName(),
                    'initials' => Auth::user()->profile?->getInitials(),
                    'email' => Auth::user()->email,
                    'position' => Auth::user()->profile?->position,
                    'isAdmin' => (bool) Auth::user()->is_admin,
                    'isFirstLogin' => (bool) Auth::user()->is_first_login,
                    'type' => Auth::user()->profile?->type,
                    'accessibleModules' => $this->getAccessibleModules(),
                ],
            ] : null,
            'token' => Auth::check() ? Auth::user()->api_token : null,
            'modules' => $modules
        ]);
    }

    /**
     * Get the list of modules that the authenticated user has access to based on their permissions.
     *
     * This method checks the user's profile and retrieves all active permissions associated with that profile's roles.
     * It then extracts the unique module names from those permissions and caches the result for 30 minutes.
     *
     * @return array List of module names that the user has access to (e.g. ['profiles', 'user_management']).
     *               Returns an empty array if the user is not authenticated or has no permissions.
     */
    protected function getAccessibleModules()
    {
        if (!Auth::check()) {
            return [];
        }

        $user = Auth::user();
        $profileId = $user->profile?->id;

        return Cache::remember(
            "user.modules.$profileId",
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
}
