import { CDataGrid } from "@/Components";

import EditModule from "../Actions/EditModule";
import { autocompleteClasses } from "@mui/material";

const TableModule = ({
    flash,
    errors,
    search,
    refreshKey,
    can,
    categories,
}) => {
    const columns = [
        { field: "id", headerName: "ID", width: 70 },
        {
            field: "name",
            headerName: "Name",
            width: 300,
            renderCell: (params) => {
                return (
                    <EditModule
                        module={params.row}
                        flash={flash}
                        errors={errors}
                        can={can}
                        categories={categories}
                        sx={{
                            minHeight: 28,
                            py: 0,
                            m: 0,
                        }}
                    />
                );
            },
        },
        { field: "route", headerName: "Route", width: 200 },
        { field: "category", headerName: "Category", flex: 1 },
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
