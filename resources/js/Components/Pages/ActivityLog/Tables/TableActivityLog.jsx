import { useMemo } from "react";
import { CDataGrid } from "@/Components";

import ShowActivityLogDetails from "@/Components/Pages/ActivityLog/Actions/ShowActivityLogDetails";

const TableActivityLog = ({
    flash,
    errors,
    search,
    refreshKey,
    onRefresh,
    can,
}) => {
    const columns = useMemo(
        () => [
            {
                field: "id",
                headerName: "ID",
                width: 70,
            },
            {
                field: "module",
                headerName: "Module",
                width: 150,
            },
            {
                field: "description",
                headerName: "Description",
                width: 300,
            },
            {
                field: "processed_by_name",
                headerName: "Processed By",
                width: 200,
            },
            {
                field: "created_at",
                headerName: "Processed At",
                width: 200,
            },
            {
                field: "details",
                headerName: "Details",
                flex: 1,
                sortable: false,
                renderCell: (params) => {
                    return (
                        <ShowActivityLogDetails
                            activityLog={params.row}
                            sx={{
                                minHeight: 28,
                                py: 0,
                                m: 0,
                            }}
                        />
                    );
                },
            },
        ],
        [flash, errors, can, onRefresh],
    );

    const queryParams = useMemo(
        () => ({
            search,
            refreshKey,
        }),
        [search, refreshKey],
    );

    return (
        <CDataGrid
            url="/activity-logs"
            columns={columns}
            queryParams={queryParams}
        />
    );
};

export default TableActivityLog;
