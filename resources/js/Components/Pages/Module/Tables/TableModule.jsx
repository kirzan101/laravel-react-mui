import { CDataGrid } from "@/Components";

import EditModule from "../Actions/EditModule";
import { autocompleteClasses } from "@mui/material";

const TableModule = ({ flash, errors, search, refreshKey }) => {
    const columns = [
        { field: "id", headerName: "ID", width: 70 },
        {
            field: "name",
            headerName: "Name",
            width: 400,
            renderCell: (params) => {
                return (
                    <EditModule
                        module={params.row}
                        flash={flash}
                        errors={errors}
                    />
                );
            },
        },
        { field: "route", headerName: "Route", width: 200 },
        { field: "category", headerName: "Category", width: 300 },
    ];

    return (
        <CDataGrid
            url="/modules"
            columns={columns}
            queryParams={{ refreshKey, search }}
        />
    );
};

export default TableModule;
