import { CDataGrid } from "@/Components";

import EditUserGroup from "../Actions/EditUserGroup";
import { autocompleteClasses } from "@mui/material";

const TableUserGroup = ({ flash, errors, search, refreshKey }) => {
    const columns = [
        { field: "id", headerName: "ID", width: 70 },
        {
            field: "name",
            headerName: "Name",
            width: 400,
            renderCell: (params) => {
                return (
                    <EditUserGroup
                        userGroup={params.row}
                        flash={flash}
                        errors={errors}
                    />
                );
            },
        },
        { field: "code", headerName: "Code", width: 200 },
        { field: "description", headerName: "Description", width: 300 },
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
