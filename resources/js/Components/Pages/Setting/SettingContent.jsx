import { CContainer, CBoxContent, CSearchField } from "@/Components";
import { iconMap } from "@/Utilities/icons";
import { lighten } from "@mui/material/styles";

import UserGroupContent from "@/Components/Pages/UserGroup/UserGroupContent";
import RoleContent from "@/Components/Pages/Role/RoleContent";
import {
    Tabs,
    Tab,
    Box,
    IconButton,
    Tooltip,
    useTheme,
    useMediaQuery,
} from "@mui/material";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";

import { useEffect, useState } from "react";

const SettingContent = ({
    flash,
    errors,
    can,
    userGroupTypes,
    permissions,
    moduleLists,
}) => {
    const [value, setValue] = useState(0);
    const [showMessages, setShowMessages] = useState(true); // State to control the display of flash messages and errors
    const [sidebarExpanded, setSidebarExpanded] = useState(false);

    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("md"));

    useEffect(() => {
        setShowMessages(true);
    }, [flash, errors]);

    const handleTabChange = (event, newValue) => {
        setValue(newValue);
        setShowMessages(false);
        if (isMobile) {
            setSidebarExpanded(false);
        }
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

    const iconOnly = isMobile && !sidebarExpanded;
    const ICON_PANEL_WIDTH = 56; // px — tight width for icon-only sidebar

    return (
        <CBoxContent>
            <Box sx={{ display: "flex", width: "100%", overflow: "hidden" }}>
                {/* Left: Navigation */}
                <Box
                    sx={{
                        flexShrink: 0,
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        width: iconOnly ? ICON_PANEL_WIDTH : undefined,
                        transition: "width 0.2s",
                    }}
                >
                    <Tabs
                        orientation="vertical"
                        value={value}
                        onChange={handleTabChange}
                        sx={{
                            width: "100%",
                            "& .MuiTabs-indicator": iconOnly
                                ? { left: 0 }
                                : undefined,
                        }}
                    >
                        {tabs.map((tab, index) => {
                            const Icon = iconMap[tab.icon];

                            return (
                                <Tooltip
                                    key={index}
                                    title={iconOnly ? tab.label : ""}
                                    placement="right"
                                    disableHoverListener={!iconOnly}
                                    disableFocusListener={!iconOnly}
                                    disableTouchListener={!iconOnly}
                                >
                                    <Tab
                                        icon={<Icon fontSize="small" />}
                                        iconPosition={
                                            iconOnly ? "top" : "start"
                                        }
                                        label={iconOnly ? undefined : tab.label}
                                        aria-label={tab.label}
                                        sx={{
                                            minWidth: iconOnly
                                                ? ICON_PANEL_WIDTH
                                                : undefined,
                                            maxWidth: iconOnly
                                                ? ICON_PANEL_WIDTH
                                                : undefined,
                                            px: iconOnly ? 0 : undefined,
                                            py: iconOnly ? 1 : undefined,
                                            minHeight: iconOnly ? 48 : undefined,
                                        }}
                                    />
                                </Tooltip>
                            );
                        })}
                    </Tabs>

                    {isMobile && (
                        <IconButton
                            size="small"
                            onClick={() =>
                                setSidebarExpanded((prev) => !prev)
                            }
                            sx={{ mt: 1 }}
                            aria-label={
                                sidebarExpanded
                                    ? "Collapse menu"
                                    : "Expand menu"
                            }
                        >
                            {sidebarExpanded ? (
                                <ChevronLeftIcon fontSize="small" />
                            ) : (
                                <ChevronRightIcon fontSize="small" />
                            )}
                        </IconButton>
                    )}
                </Box>

                {/* Right: Content */}
                <Box
                    sx={{
                        flex: 1,
                        minWidth: 0,
                        pl: { xs: 1, md: 3 },
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
