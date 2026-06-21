import React, { useEffect, useRef } from "react";
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
    Fade,
} from "@mui/material";

import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import LogoutIcon from "@mui/icons-material/Logout";

import { iconMap } from "@/Utilities/icons";

import { ThemeButton } from "@/Components";
import { router, usePage } from "@inertiajs/react";

import ProfileNav from "./Components/ProfileNav";
import SidebarItem from "./Components/SidebarItem";
import GlobalSnackbar from "../Components/Utilities/GlobalSnackbar";

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

    // Modules for sidebar - from Inertia props (shared via HandleInertiaRequests middleware)
    const modules = page.props.modules || [];
    const accessibleModules = page.props.auth?.user?.accessibleModules || [];

    const moduleLists = modules
        .filter((module) => accessibleModules.includes(module.base_name)) // Filter modules based on user permissions
        .sort((a, b) => a.order - b.order)
        .map((module) => ({
            name: module.name,
            icon: module.icon,
            route: module.route,
        }));

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

    // Snackbar logic
    const snackRef = useRef();

    // Listen for flash messages from Inertia and show snackbar
    const { flash } = usePage().props;
    useEffect(() => {
        if (flash?.success) {
            snackRef.current?.show(flash.success, "success");
        }

        if (flash?.error) {
            snackRef.current?.show(flash.error, "error");
        }

        if (flash?.info) {
            snackRef.current?.show(flash.info, "info");
        }

        if (flash?.warning) {
            snackRef.current?.show(flash.warning, "warning");
        }
    }, [flash]);

    // validation errors from backend (via Inertia props)
    const { errors } = usePage().props;
    useEffect(() => {
        if (Object.keys(errors || {}).length > 0) {
            snackRef.current?.show("Validation error occurred", "error");
        }
    }, [errors]);
    // End of Snackbar logic

    return (
        <Box sx={{ display: "flex", width: "100%" }}>
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
                        icon={iconMap.DashboardIcon}
                        label="Dashboard"
                    />

                    {moduleLists.map((module) => (
                        <SidebarItem
                            key={module.name}
                            href={`${module.route}`}
                            icon={
                                iconMap[module.icon] || iconMap.ViewModuleIcon
                            }
                            label={module.name.replace(/-/g, " ")}
                        />
                    ))}
                </List>
            </Drawer>

            {/* ================= MAIN CONTENT ================= */}
            <Main
                sx={{
                    width: open ? `calc(100% - ${drawerWidth}px)` : "100%",
                }}
                open={open}
                isMobile={isMobile}
            >
                <DrawerHeader />

                <Fade in={true} timeout={500}>
                    <Box>{children}</Box>
                </Fade>

                <Box
                    sx={{
                        position: "fixed",
                        bottom: 0,
                        left: 0,
                        right: 0,
                        backgroundColor: "inherit",
                        p: 1,
                        textAlign: "center",
                        borderTop: "1px solid",
                        borderColor: "divider",
                        fontSize: "0.875rem",
                        color: "text.secondary",
                    }}
                >
                    {appDeveloper} {new Date().getFullYear()} &copy; — v
                    {appVersion}
                </Box>

                <GlobalSnackbar ref={snackRef} />
            </Main>
        </Box>
    );
};

export default AppLayout;
