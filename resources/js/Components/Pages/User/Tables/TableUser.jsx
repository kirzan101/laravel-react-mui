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
                        can={can}
                    />
                );
            },
        },
        { field: "username", headerName: "Username", flex: 1 },
        { field: "email", headerName: "Email", flex: 1 },
        { field: "position", headerName: "Position", flex: 1 },
        { field: "user_group_name", headerName: "User Group", flex: 1 },
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
