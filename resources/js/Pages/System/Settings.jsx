import { CBox } from "@/Components";
import { Typography, Breadcrumbs, Link } from "@mui/material";
import { Head, usePage, router } from "@inertiajs/react";

import SettingContent from "@/Components/Pages/Setting/SettingContent";

const Settings = ({
    flash,
    errors,
    can,
    userGroupTypes,
    permissions,
    moduleLists,
}) => {
    const page = usePage();
    const appName = page.props.appName || "Laravel React App";

    return (
        <>
            <Head title={`Settings — ${appName}`} />
            <CBox>
                <Breadcrumbs aria-label="breadcrumb">
                    {/* <Link underline="hover" color="inherit" href="/dashboard">
                        Dashboard
                    </Link> */}
                    <Typography
                        color="inherit"
                        href="/dashboard"
                        onClick={() => router.visit("/dashboard")}
                        sx={{ cursor: "pointer" }}
                    >
                        Dashboard
                    </Typography>
                    <Typography sx={{ color: "text.primary" }}>
                        Settings
                    </Typography>
                </Breadcrumbs>

                <SettingContent
                    flash={flash}
                    errors={errors}
                    can={can}
                    userGroupTypes={userGroupTypes}
                    permissions={permissions}
                    moduleLists={moduleLists}
                />
            </CBox>
        </>
    );
};

export default Settings;
