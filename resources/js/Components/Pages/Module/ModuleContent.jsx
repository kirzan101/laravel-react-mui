import { CContainer, CBoxContent, CSearchField } from "@/Components";
import { Typography, Alert, TextField, Grid } from "@mui/material";
import { CButtonAdd, CTextField } from "@/Components";
import AddModule from "./Actions/AddModule";
import AlertTransaction from "@/Components/Utilities/AlertTransaction";
import TableModule from "./Tables/TableModule";
import { useEffect, useState } from "react";

const ModuleContent = ({ flash, errors }) => {
    const [search, setSearch] = useState("");
    const [debouncedSearch, setDebouncedSearch] = useState("");
    const [refreshKey, setRefreshKey] = useState(0);

    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedSearch(search);
        }, 500); // 500ms delay

        return () => clearTimeout(timer);
    }, [search]);

    useEffect(() => {
        if (flash) setRefreshKey((k) => k + 1);
    }, [flash]);

    return (
        <CBoxContent>
            <Grid
                container
                spacing={2}
                sx={{ mb: 2, display: "flex", alignItems: "center" }}
            >
                {/* Left: Title + Button */}
                <Grid
                    size={{ xs: 12, md: 6 }}
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 2,
                    }}
                >
                    <Typography variant="h4">Modules</Typography>

                    <AddModule
                        sx={{
                            display: "inline-flex",
                            ml: { xs: "auto", md: 0 },
                        }}
                        flash={flash}
                        errors={errors}
                    />
                </Grid>

                {/* Right: Search */}
                <Grid
                    size={{ xs: 12, md: 6 }}
                    display="flex"
                    sx={{
                        justifyContent: {
                            xs: "flex-start",
                            md: "flex-end",
                        },
                    }}
                >
                    <CSearchField
                        sx={{
                            width: {
                                xs: "100%",
                            },
                        }}
                        label="Search Modules"
                        placeholder="Type to search modules..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </Grid>
            </Grid>

            {/* Display flash error messages if they exist */}
            {flash && flash.error && <AlertTransaction flash={flash} />}

            <TableModule
                flash={flash}
                errors={errors}
                refreshKey={refreshKey}
                search={debouncedSearch}
            />
        </CBoxContent>
    );
};

export default ModuleContent;
