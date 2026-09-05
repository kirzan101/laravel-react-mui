import { useMemo } from "react";
import { Box } from "@mui/material";
import { CDataGrid } from "@/Components";

import ShowActivityLogDetails from "@/Components/Pages/ActivityLog/Actions/ShowActivityLogDetails";
import UserAvatar from "@/Components/Utilities/UserAvatar";
import ProcessBy from "@/Components/Utilities/ProcessBy";

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
                width: 250,
                renderCell: (params) => {
                    return (
                        <Box
                            sx={{
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                width: "100%",
                                height: "100%",
                                minWidth: 0,
                            }}
                        >
                            <ProcessBy
                                avatarUrl={params.row.processed_by_avatar}
                                initials={params.row.processed_by_initials}
                                name={params.row.processed_by_name}
                                fontSize={14}
                            />
                        </Box>
                    );
                },
            },
            {
                field: "created_at",
                headerName: "Processed At",
                width: 200,
            },
            {
                field: "details",
                headerName: "Details",
                width: 150,
                sortable: false,
                disableColumnMenu: true,
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
