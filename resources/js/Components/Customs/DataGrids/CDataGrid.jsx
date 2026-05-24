import { DataGrid } from "@mui/x-data-grid";
import { useCallback, useEffect, useState } from "react";

import axios from "@/Utilities/axios";

const CDataGrid = ({
    url,
    columns = [],
    queryParams = {},
    initialPageSize = 10,
    ...props
}) => {
    const [rows, setRows] = useState([]);
    const [loading, setLoading] = useState(false);

    const [rowCount, setRowCount] = useState(0);

    const [paginationModel, setPaginationModel] = useState({
        page: 0,
        pageSize: initialPageSize,
    });

    const [sortModel, setSortModel] = useState([]);

    const fetchData = useCallback(async () => {
        setLoading(true);

        try {
            const response = await axios.get(url, {
                params: {
                    page: paginationModel.page + 1,
                    per_page: paginationModel.pageSize,

                    sort_field: sortModel[0]?.field,
                    sort_order: sortModel[0]?.sort,

                    ...queryParams,
                },
            });

            setRows(response.data.data || []);
            setRowCount(response.data.total || 0);
        } catch (error) {
            console.error("CDataGrid fetch error:", error);
        } finally {
            setLoading(false);
        }
    }, [
        url,
        paginationModel.page,
        paginationModel.pageSize,
        JSON.stringify(sortModel),
        JSON.stringify(queryParams),
    ]);

    useEffect(() => {
        fetchData();
    }, [
        paginationModel,
        sortModel,
        queryParams.search,
        queryParams.refreshKey,
    ]);

    return (
        <DataGrid
            rows={rows}
            columns={columns}
            rowCount={rowCount}
            loading={loading}
            paginationMode="server"
            sortingMode="server"
            paginationModel={paginationModel}
            onPaginationModelChange={setPaginationModel}
            sortModel={sortModel}
            onSortModelChange={setSortModel}
            pageSizeOptions={[10, 25, 50, 100]}
            disableRowSelectionOnClick
            disableColumnFilter
            {...props}
        />
    );
};

export default CDataGrid;
