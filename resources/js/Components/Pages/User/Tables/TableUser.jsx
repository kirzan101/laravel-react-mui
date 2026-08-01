import { CDataGrid } from "@/Components";
import { Box } from "@mui/material";

import EditUser from "../Actions/EditUser";
import UserAvatar from "@/Components/Utilities/UserAvatar";

const TableUser = ({
    flash,
    errors,
    search,
    refreshKey,
    userGroups,
    accountTypes,
    roles,
    can,
}) => {
    const columns = [
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
    ];

    return (
        <CDataGrid
            url="/users"
            columns={columns}
            queryParams={{ refreshKey, search }}
        />
    );
};

export default TableUser;
