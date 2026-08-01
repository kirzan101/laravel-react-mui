import { CDataGrid } from "@/Components";

import EditUserGroup from "../Actions/EditUserGroup";
import { autocompleteClasses } from "@mui/material";

const TableUserGroup = ({
    flash,
    errors,
    search,
    refreshKey,
    can,
    userGroupTypes,
}) => {
    const columns = [
        { field: "id", headerName: "ID", width: 70 },
        {
            field: "name",
            headerName: "Name",
            width: 300,
            renderCell: (params) => {
                return (
                    <EditUserGroup
                        userGroup={params.row}
                        flash={flash}
                        errors={errors}
                        can={can}
                        userGroupTypes={userGroupTypes}
                        sx={{
                            minHeight: 28,
                            py: 0,
                            m: 0,
                        }}
                    />
                );
            },
        },
        { field: "code", headerName: "Code", width: 150 },
        { field: "description", headerName: "Description", width: 150 },
    ];

    return (
        <CDataGrid
            url="/user-groups"
            columns={columns}
            queryParams={{ refreshKey, search }}
        />
    );
};

export default TableUserGroup;
