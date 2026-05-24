import { CContainer, CBoxContent, CSearchField } from "@/Components";
import { Typography, Alert, TextField, Grid } from "@mui/material";
import { CButtonAdd, CTextField } from "@/Components";
import AddUserGroup from "./Actions/AddUserGroup";
import AlertTransaction from "@/Components/Utilities/AlertTransaction";
import TableUserGroup from "./Tables/TableUserGroup";
import { useEffect, useState } from "react";

const UserGroupContent = ({ flash, errors }) => {
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
            <Grid container alignItems="center" spacing={2} sx={{ mb: 2 }}>
                {/* Left: Title + Button */}
                <Grid
                    size={{ xs: 12, md: 6 }}
                    display="flex"
                    alignItems="center"
                >
                    <Typography variant="h4">User Groups</Typography>

                    <AddUserGroup
                        sx={{ ml: 2 }}
                        flash={flash}
                        errors={errors}
                    />
                </Grid>

                {/* Right: Search */}
                <Grid
                    size={{ xs: 12, md: 6 }}
                    display="flex"
                    justifyContent={{
                        xs: "flex-start",
                        md: "flex-end",
                    }}
                >
                    <CSearchField
                        sx={{
                            width: {
                                xs: "100%",
                            },
                        }}
                        label="Search User Groups"
                        placeholder="Type to search user groups..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </Grid>
            </Grid>

            {/* Display flash messages if they exist */}
            {flash && <AlertTransaction flash={flash} />}

            <TableUserGroup
                flash={flash}
                errors={errors}
                refreshKey={refreshKey}
                search={debouncedSearch}
            />
        </CBoxContent>
    );
};

export default UserGroupContent;
