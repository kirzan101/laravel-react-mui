import { useMemo } from "react";
import { CDataGrid, CChip } from "@/Components";
import { Box } from "@mui/material";

import EditUser from "../Actions/EditUser";
import ResetPassword from "../Actions/ResetPassword";
import SetAccountStatus from "../Actions/SetAccountStatus";
import UserAvatar from "@/Components/Utilities/UserAvatar";

const TableUser = ({
    flash,
    errors,
    search,
    refreshKey,
    onRefresh,
    userGroups,
    accountTypes,
    roles,
    can,
}) => {
    const columns = useMemo(
        () => [
            { field: "id", headerName: "ID", width: 70 },
            {
                field: "name",
                headerName: "Name",
                width: 330,
                renderCell: (params) => {
                    return (
                        <Box
                            sx={{
                                display: "flex",
                                alignItems: "center",
                                gap: 1,
                                width: "100%",
                                minWidth: 0,
                            }}
                        >
                            <UserAvatar
                                avatarUrl={params.row.avatar}
                                initials={params.row.initials}
                                size={32}
                            />
                            <Box sx={{ flex: 1, minWidth: 0 }}>
                                <EditUser
                                    user={params.row}
                                    flash={flash}
                                    errors={errors}
                                    userGroups={userGroups}
                                    accountTypes={accountTypes}
                                    roles={roles}
                                    can={can}
                                    sx={{
                                        minHeight: 28,
                                        py: 0,
                                        m: 0,
                                    }}
                                    onSuccess={onRefresh}
                                />
                            </Box>
                        </Box>
                    );
                },
            },
            { field: "username", headerName: "Username", width: 200 },
            { field: "email", headerName: "Email", width: 250 },
            { field: "position", headerName: "Position", width: 200 },
            { field: "user_group_name", headerName: "User Group", width: 200 },
            {
                field: "status",
                headerName: "Status",
                width: 150,
                renderCell: (params) => {
                    return (
                        <CChip
                            label={params.row.status}
                            size="small"
                            color={
                                params.row.status === "active"
                                    ? "accent"
                                    : "error"
                            }
                            sx={{ minHeight: 28, py: 0, m: 0 }}
                        />
                    );
                },
            },
            {
                field: "actions",
                headerName: "Actions",
                width: 150,
                renderCell: (params) => {
                    return (
                        <>
                            <ResetPassword
                                user={params.row}
                                flash={flash}
                                errors={errors}
                                can={can}
                                sx={{ minHeight: 28, py: 0, m: 0 }}
                                onSuccess={onRefresh}
                            />
                            <SetAccountStatus
                                user={params.row}
                                flash={flash}
                                errors={errors}
                                can={can}
                                sx={{ minHeight: 28, py: 0, m: 0 }}
                                onSuccess={onRefresh}
                            />
                        </>
                    );
                },
            },
        ],
        [flash, errors, userGroups, accountTypes, roles, can, onRefresh],
    );

    const queryParams = useMemo(
        () => ({
            search,
            refreshKey,
        }),
        [search, refreshKey],
    );

    return (
        <CDataGrid url="/users" columns={columns} queryParams={queryParams} />
    );
};

export default TableUser;
