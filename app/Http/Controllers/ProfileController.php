<?php

namespace App\Http\Controllers;

use App\DTOs\AccountDTO;
use App\DTOs\ActivityLogDTO;
use App\DTOs\ProfileDTO;
use App\DTOs\UserDTO;
use App\Helpers\Helper;
use App\Http\Requests\ProfileFormRequest;
use App\Http\Resources\IndexResource\UserGroupIndexResource;
use App\Interfaces\ActivityLogInterface;
use App\Interfaces\FetchInterfaces\RoleFetchInterface;
use App\Interfaces\FetchInterfaces\UserGroupFetchInterface;
use App\Interfaces\ManageAccountInterface;
use App\Models\Profile;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Gate;
use Inertia\Inertia;

class ProfileController extends Controller
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
        if (Gate::denies('view', new Profile())) {
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

        return Inertia::render('System/Profiles', [
            'user_groups' => UserGroupIndexResource::collection($userGroups),
            'roles' => $roles,
            'account_types' => Helper::ACCOUNT_TYPES,
            'can' => $this->getModulePermissions(new Profile()),
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(ProfileFormRequest $request)
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
            'module' => 'profiles',
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
    public function update(ProfileFormRequest $request, int $id)
    {
        $userDTO = UserDTO::fromArray($request->all());
        $profileDTO = ProfileDTO::fromArray($request->all());

        $accountDTO = new AccountDTO(
            user: $userDTO,
            profile: $profileDTO,
            user_group_id: $request->input('user_group_id'),
            role_ids: $request->input('role_ids', []),
        );

        $updateResult = $this->manageAccount->updateUserProfile($accountDTO, $id);

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
