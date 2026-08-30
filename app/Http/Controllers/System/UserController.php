<?php

namespace App\Http\Controllers\System;

use App\DTOs\AccountDTO;
use App\DTOs\ActivityLogDTO;
use App\DTOs\ProfileDTO;
use App\DTOs\UserDTO;
use App\Helpers\Helper;
use App\Http\Requests\UserFormRequest;
use App\Http\Resources\IndexResource\UserGroupIndexResource;
use App\Interfaces\ActivityLoggerInterface;
use App\Interfaces\FetchInterfaces\RoleFetchInterface;
use App\Interfaces\FetchInterfaces\UserGroupFetchInterface;
use App\Interfaces\ManageAccountInterface;
use App\Models\User;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Gate;
use Inertia\Inertia;
use App\Http\Controllers\Controller;
use App\Http\Requests\System\ChangeAvatarFormRequest;
use App\Interfaces\UserModuleInterface;
use Illuminate\Support\Facades\Auth;

class UserController extends Controller
{
    public function __construct(
        private UserModuleInterface $userModule,
        private UserGroupFetchInterface $userGroupFetch,
        private RoleFetchInterface $roleFetch,
        private ManageAccountInterface $manageAccount,
        private ActivityLoggerInterface $activityLogger
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
            $request = [
                'is_active' => true,
            ];
            $result = $this->roleFetch->indexRoles($request);
            return $result->data ?? [];
        });

        return Inertia::render('System/Users', [
            'user_groups' => UserGroupIndexResource::collection($userGroups),
            'roles' => $roles,
            'account_types' => Helper::ACCOUNT_TYPES,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(UserFormRequest $request)
    {
        $userDTO = UserDTO::fromArray($request->all());
        $profileDTO = ProfileDTO::fromArray($request->all());

        $accountDTO = new AccountDTO(
            user: $userDTO,
            profile: $profileDTO,
            user_group_id: $request->input('user_group_id'),
            role_ids: $request->input('role_ids', []),
        );

        $registerResult = $this->manageAccount->register($accountDTO);

        if ($registerResult->status === Helper::ERROR) {
            return Inertia::render('Error', [
                'code' => $registerResult->code,
                'message' => $registerResult->message
            ]);
        }

        // Log the activity
        $this->activityLogger->addLog($registerResult, $request, 'users', 'create');

        $this->refreshCache(); // Refresh the cache after creating a new user   

        return redirect()->back()->with($registerResult->status, $registerResult->message);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UserFormRequest $request, int $id)
    {
        // Additional validation for profile_id since it's required for updating a user
        $request->validate([
            'profile_id' => 'required|integer|exists:profiles,id',
        ]);

        $userDTO = UserDTO::fromArray($request->all());
        $profileDTO = ProfileDTO::fromArray($request->all());
        $profileDTO = $profileDTO->withUser($id);

        $accountDTO = new AccountDTO(
            user: $userDTO,
            profile: $profileDTO,
            user_group_id: $request->input('user_group_id'),
            role_ids: $request->input('role_ids', []),
        );

        $profileId = $request->input('profile_id');
        $updateResult = $this->manageAccount->updateUserProfile($accountDTO, $profileId);

        if ($updateResult->status === Helper::ERROR) {
            return Inertia::render('Error', [
                'code' => $updateResult->code,
                'message' => $updateResult->message
            ]);
        }

        // Log the activity
        $this->activityLogger->addLog($updateResult, $request, 'profiles', 'update');

        $this->refreshCache(); // Refresh the cache after updating the user

        return redirect()->back()->with($updateResult->status, $updateResult->message);
    }

    /**
     * Change the avatar for the specified profile.
     */
    public function changeAvatar(ChangeAvatarFormRequest $request, ?int $profileId = null)
    {
        $file = $request->file('avatar');

        // If profileId is not provided, use the authenticated user's profile ID
        if (!$profileId) {
            $profileId = Auth::user()->profile->id;
        }

        // Call the service to handle avatar change
        $result = $this->manageAccount->changeProfileAvatar($profileId, $file);

        if ($result->status === Helper::ERROR) {
            return redirect()->back()->with($result->status, $result->message);
        }

        // Log the activity
        // log the file type and size in bytes
        $request->merge([
            'avatar_file_type' => $file->getClientMimeType(),
            'avatar_file_size' => $file->getSize(),
        ]);
        $this->activityLogger->addLog($result, $request, 'profiles', 'update');

        $this->refreshCache(); // Refresh the cache after changing the avatar

        return redirect()->back()->with($result->status, $result->message);
    }

    /**
     * Remove the avatar for the specified profile.
     */
    public function removeAvatar(?int $profileId = null)
    {
        // If profileId is not provided, use the authenticated user's profile ID
        $profileId = $profileId ?? Auth::user()->profile->id;
        $currentAvatarPath = Auth::user()->profile->avatar; // copy temporary for logging

        // Call the service to handle avatar removal
        $result = $this->manageAccount->removeProfileAvatar($profileId);

        if ($result->status === Helper::ERROR) {
            return redirect()->back()->with($result->status, $result->message);
        }

        // Log the activity
        // log the current avatar path before removal
        $request = request(); // Get the current request instance
        $request->merge([
            'removed_avatar_path' => $currentAvatarPath,
            'profile_id' => $profileId,
        ]);
        $this->activityLogger->addLog($result, $request, 'profiles', 'update');

        $this->refreshCache(); // Refresh the cache after removing the avatar

        return redirect()->back()->with($result->status, $result->message);
    }

    /**
     * Refresh the cache for the current user's permissions.
     */
    protected function refreshCache(): void
    {
        $this->userModule->refreshGlobalPermissionsVersion();
    }
}
