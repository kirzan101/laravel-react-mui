import { CDataGrid } from "@/Components";

import EditUser from "../Actions/EditUser";
import { autocompleteClasses } from "@mui/material";

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
            width: 350,
            renderCell: (params) => {
                return (
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
