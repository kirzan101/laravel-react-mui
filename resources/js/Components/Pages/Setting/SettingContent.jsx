import { CBoxContent } from "@/Components";
import { iconMap } from "@/Utilities/icons";

import UserGroupContent from "@/Components/Pages/UserGroup/UserGroupContent";
import RoleContent from "@/Components/Pages/Role/RoleContent";
import {
    Tabs,
    Tab,
    Box,
    Drawer,
    IconButton,
    List,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Divider,
    Typography,
    useTheme,
    useMediaQuery,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";

import { useEffect, useState } from "react";

const DRAWER_WIDTH = 200;

const SettingContent = ({
    flash,
    errors,
    can,
    userGroupTypes,
    permissions,
    moduleLists,
}) => {
    const [value, setValue] = useState(0);
    const [showMessages, setShowMessages] = useState(true);
    const [drawerOpen, setDrawerOpen] = useState(false);

    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("md"));

    useEffect(() => {
        setShowMessages(true);
    }, [flash, errors]);

    const handleTabChange = (event, newValue) => {
        setValue(newValue);
        setShowMessages(false);
    };

    const handleMobileSelect = (index) => {
        setValue(index);
        setShowMessages(false);
        setDrawerOpen(false);
    };

    const defaultFlash = {
        success: null,
        error: null,
        info: null,
        warning: null,
    };
    const defaultErrors = {};

    const tabs = [
        {
            label: "User groups",
            icon: "GroupsIcon",
            component: (
                <UserGroupContent
                    flash={showMessages ? flash : defaultFlash}
                    errors={showMessages ? errors : defaultErrors}
                    can={can}
                    userGroupTypes={userGroupTypes}
                />
            ),
        },
        {
            label: "Roles",
            icon: "RoleIcon",
            component: (
                <RoleContent
                    flash={showMessages ? flash : defaultFlash}
                    errors={showMessages ? errors : defaultErrors}
                    permissions={permissions}
                    moduleLists={moduleLists}
                    can={can}
                />
            ),
        },
    ];

    return (
        <CBoxContent>
            {/* Mobile: hamburger button + Drawer nav */}
            {isMobile && (
                <>
                    <Box sx={{ mb: 1 }}>
                        <IconButton
                            onClick={() => setDrawerOpen(true)}
                            aria-label="Open settings menu"
                            size="small"
                        >
                            <MenuIcon />
                        </IconButton>
                        <Typography
                            variant="caption"
                            sx={{ ml: 1, color: "text.secondary" }}
                        >
                            {tabs[value].label}
                        </Typography>
                    </Box>

                    <Drawer
                        anchor="left"
                        open={drawerOpen}
                        onClose={() => setDrawerOpen(false)}
                        sx={{
                            "& .MuiDrawer-paper": {
                                width: DRAWER_WIDTH,
                                pt: 2,
                            },
                        }}
                    >
                        <Typography variant="subtitle2" sx={{ px: 2, pb: 1 }}>
                            Settings
                        </Typography>
                        <Divider />
                        <List>
                            {tabs.map((tab, index) => {
                                const Icon = iconMap[tab.icon];
                                return (
                                    <ListItemButton
                                        key={index}
                                        selected={value === index}
                                        onClick={() =>
                                            handleMobileSelect(index)
                                        }
                                    >
                                        <ListItemIcon sx={{ minWidth: 36 }}>
                                            <Icon fontSize="small" />
                                        </ListItemIcon>
                                        <ListItemText primary={tab.label} />
                                    </ListItemButton>
                                );
                            })}
                        </List>
                    </Drawer>
                </>
            )}

            <Box sx={{ display: "flex", width: "100%" }}>
                {/* Desktop: inline vertical Tabs */}
                {!isMobile && (
                    <Tabs
                        orientation="vertical"
                        value={value}
                        onChange={handleTabChange}
                        sx={{ flexShrink: 0 }}
                    >
                        {tabs.map((tab, index) => {
                            const Icon = iconMap[tab.icon];
                            return (
                                <Tab
                                    key={index}
                                    icon={<Icon />}
                                    iconPosition="start"
                                    label={tab.label}
                                />
                            );
                        })}
                    </Tabs>
                )}

                {/* Content */}
                <Box
                    sx={{
                        flex: 1,
                        minWidth: 0,
                        pl: isMobile ? 0 : 3,
                        overflow: "auto",
                    }}
                >
                    {tabs[value].component}
                </Box>
            </Box>
        </CBoxContent>
    );
};

export default SettingContent;
