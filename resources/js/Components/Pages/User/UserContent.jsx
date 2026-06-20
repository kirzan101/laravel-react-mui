import { CContainer, CBoxContent, CSearchField } from "@/Components";
import { Typography, Alert, TextField, Grid } from "@mui/material";
import { CButtonAdd, CTextField } from "@/Components";
import AddUser from "./Actions/AddUser";
import TableUser from "./Tables/TableUser";
import { useEffect, useState } from "react";

const UserContent = ({ flash, errors, userGroups, accountTypes, can }) => {
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
                    <Typography variant="h4">Users</Typography>

                    <AddUser
                        sx={{
                            display: "inline-flex",
                            ml: { xs: "auto", md: 0 },
                        }}
                        flash={flash}
                        errors={errors}
                        userGroups={userGroups}
                        accountTypes={accountTypes}
                        can={can}
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
                        label="Search Users"
                        placeholder="Type to search users..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </Grid>
            </Grid>

            <TableUser
                flash={flash}
                errors={errors}
                refreshKey={refreshKey}
                search={debouncedSearch}
                userGroups={userGroups}
                accountTypes={accountTypes}
                can={can}
            />
        </CBoxContent>
    );
};

export default UserContent;
