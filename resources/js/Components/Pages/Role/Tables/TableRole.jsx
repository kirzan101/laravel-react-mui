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
            width: 300,
            renderCell: (params) => {
                return (
                    <EditRole
                        role={params.row}
                        flash={flash}
                        errors={errors}
                        permissions={permissions}
                        moduleLists={moduleLists}
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
        {
            field: "is_active",
            headerName: "Is Active",
            width: 150,
            sortable: false,
            renderCell: (params) => (params.row.is_active ? "Yes" : "No"),
        },
        { field: "description", headerName: "Description", flex: 1 },
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
