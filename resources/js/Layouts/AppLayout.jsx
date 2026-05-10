import React from "react";
import { useState } from "react";
import {
    Box,
    AppBar as MuiAppBar,
    Toolbar,
    Typography,
    IconButton,
    Drawer,
    CssBaseline,
    Divider,
    List,
    ListItem,
    ListItemButton,
    ListItemText,
    ListItemIcon,
    styled,
    useTheme,
    useMediaQuery,
    Button,
} from "@mui/material";

import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import LogoutIcon from "@mui/icons-material/Logout";
import DashboardIcon from "@mui/icons-material/Dashboard";
import GroupsIcon from "@mui/icons-material/Groups";
import SettingsIcon from "@mui/icons-material/Settings";

import { ThemeButton } from "@/Components";
import { router, usePage } from "@inertiajs/react";

import ProfileNav from "./Components/ProfileNav";
import SidebarItem from "./Components/SidebarItem";

const drawerWidth = 260;

/* ================= APP BAR ================= */
const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== "open" && prop !== "isMobile",
})(({ theme, open, isMobile }) => ({
    transition: theme.transitions.create(["margin", "width"], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),

    // Only shrink on desktop
    ...(!isMobile &&
        open && {
            width: `calc(100% - ${drawerWidth}px)`,
            marginLeft: `${drawerWidth}px`,

            transition: theme.transitions.create(["margin", "width"], {
                easing: theme.transitions.easing.easeOut,

                duration: theme.transitions.duration.enteringScreen,
            }),
        }),
}));

/* ================= MAIN CONTENT ================= */
const Main = styled("main", {
    shouldForwardProp: (prop) => prop !== "open" && prop !== "isMobile",
})(({ theme, open, isMobile }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),

    transition: theme.transitions.create("margin", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),

    // Mobile should NEVER shift
    marginLeft: isMobile ? 0 : open ? 0 : `-${drawerWidth}px`,

    ...(!isMobile &&
        open && {
            transition: theme.transitions.create("margin", {
                easing: theme.transitions.easing.easeOut,
                duration: theme.transitions.duration.enteringScreen,
            }),

            marginLeft: 0,
        }),
}));

/* ================= DRAWER HEADER ================= */
const DrawerHeader = styled("div")(({ theme }) => ({
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
}));

/* ================= COMPONENT ================= */
const AppLayout = ({ children }) => {
    const theme = useTheme();
    const [open, setOpen] = useState(false);
    const [btnDisabled, setBtnDisabled] = useState(false);

    // Get user data from Inertia page props
    const user = usePage().props.auth?.user || {};

    // app info from backend (via Inertia props)
    const page = usePage();
    const appName = page.props.appName || "Laravel React App";
    const appDeveloper = page.props.appDeveloper || "Developer";
    const appVersion = page.props.appVersion || "1.0.0";

    // Responsive drawer behavior
    const isMobile = useMediaQuery(theme.breakpoints.down("md"));

    const handleLogout = () => {
        // prevent multiple clicks
        // Will not use the button disabled state as it may cause UI issues, but this will prevent multiple logout requests
        if (btnDisabled) return; // Prevent if already disabled

        router.post(
            "/logout",
            {},
            {
                onBefore: () => {
                    setBtnDisabled(true);
                },
                onFinish: () => {
                    setBtnDisabled(false);
                },
            },
        );
    };

    const handleDrawerOpen = () => setOpen(true);
    const handleDrawerClose = () => setOpen(false);

    return (
        <Box sx={{ display: "flex" }}>
            <CssBaseline />

            {/* ================= APP BAR ================= */}
            <AppBar
                position="fixed"
                open={open}
                isMobile={isMobile}
                sx={{ backgroundColor: "#13294B" }}
            >
                <Toolbar>
                    {/* OPEN BUTTON */}
                    <IconButton
                        color="inherit"
                        onClick={handleDrawerOpen}
                        edge="start"
                        sx={{ mr: 2, ...(open && { display: "none" }) }}
                    >
                        <MenuIcon />
                    </IconButton>

                    <Typography variant="h6" sx={{ flexGrow: 1 }}>
                        {appName}
                    </Typography>

                    <ThemeButton sx={{ mr: 1 }} />

                    <Button
                        color="inherit"
                        variant="text"
                        onClick={handleLogout}
                        startIcon={<LogoutIcon />}
                    >
                        Logout
                    </Button>
                </Toolbar>
            </AppBar>

            {/* ================= DRAWER ================= */}
            <Drawer
                variant={isMobile ? "temporary" : "persistent"}
                anchor="left"
                open={open}
                onClose={() => setOpen(false)}
                sx={{
                    width: drawerWidth,
                    flexShrink: 0,
                    "& .MuiDrawer-paper": {
                        width: drawerWidth,
                        boxSizing: "border-box",
                    },
                }}
            >
                <DrawerHeader>
                    <IconButton onClick={handleDrawerClose}>
                        {theme.direction === "ltr" ? (
                            <ChevronLeftIcon />
                        ) : (
                            <ChevronLeftIcon />
                        )}
                    </IconButton>
                </DrawerHeader>

                <Divider />

                {/* Profile details */}
                <ProfileNav user={user} />

                <Divider />

                <List>
                    <SidebarItem
                        href="/dashboard"
                        icon={DashboardIcon}
                        label="Dashboard"
                    />

                    <SidebarItem
                        href="/user-groups"
                        icon={GroupsIcon}
                        label="User Groups"
                    />

                    <SidebarItem
                        href="/settings"
                        icon={SettingsIcon}
                        label="Settings"
                    />
                </List>
            </Drawer>

            {/* ================= MAIN CONTENT ================= */}
            <Main open={open} isMobile={isMobile}>
                <DrawerHeader />

                {children}
            </Main>

            <Box
                sx={{
                    position: "fixed",
                    bottom: 0,
                    left: 0,
                    right: 0,
                    backgroundColor: "inherit",
                    p: 1,
                    textAlign: "center",
                }}
            >
                {appDeveloper} {new Date().getFullYear()} &copy; — v{appVersion}
            </Box>
        </Box>
    );
};

export default AppLayout;
