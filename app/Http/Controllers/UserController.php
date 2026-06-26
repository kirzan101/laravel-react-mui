<?php

namespace App\Http\Controllers;

use App\DTOs\AccountDTO;
use App\DTOs\ActivityLogDTO;
use App\DTOs\ProfileDTO;
use App\DTOs\UserDTO;
use App\Helpers\Helper;
use App\Http\Requests\UserFormRequest;
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
            'can' => $this->getModulePermissions(new User()),
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
        $activityLogData = ActivityLogDTO::fromArray([
            'module' => 'users',
            'description' => $registerResult->message,
            'status' => $registerResult->status,
            'type' => 'create',
            'properties' => $request->toArray(),
        ]);
        $this->activityLog->storeActivityLog($activityLogData);

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
        $activityLogData = ActivityLogDTO::fromArray([
            'module' => 'profiles',
            'description' => $updateResult->message,
            'status' => $updateResult->status,
            'type' => 'update',
            'properties' => $request->toArray(),
        ]);
        $this->activityLog->storeActivityLog($activityLogData);

        return redirect()->back()->with($updateResult->status, $updateResult->message);
    }
}
