import { CDataGrid } from "@/Components";

import EditRole from "../Actions/EditRole";
import { autocompleteClasses } from "@mui/material";

const TableRole = ({
    flash,
    errors,
    search,
    refreshKey,
    permissions,
    moduleLists,
    can,
}) => {
    const columns = [
        { field: "id", headerName: "ID", width: 70 },
        {
            field: "name",
            headerName: "Name",
            width: 400,
            renderCell: (params) => {
                return (
                    <EditRole role={params.row} flash={flash} errors={errors} permissions={permissions} moduleLists={moduleLists} can={can} />
                );
            },
        },
        { field: "is_active", headerName: "Is Active", width: 200 },
        { field: "description", headerName: "Description", width: 300 },
    ];

    return (
        <CDataGrid
            url="/roles"
            columns={columns}
            queryParams={{ refreshKey, search }}
        />
    );
};

export default TableRole;
