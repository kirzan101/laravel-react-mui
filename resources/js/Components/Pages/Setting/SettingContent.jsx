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

    return (
        <CBoxContent>
            <Box sx={{ display: "flex", width: "100%" }}>
                {/* Left: Navigation */}
                <Box
                    sx={{
                        flexShrink: 0,
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                    }}
                >
                    <Tabs
                        orientation="vertical"
                        value={value}
                        onChange={handleTabChange}
                        sx={{ flexShrink: 0 }}
                    >
                        {tabs.map((tab, index) => {
                            const Icon = iconMap[tab.icon];
                            const iconOnly = isMobile && !sidebarExpanded;

                            return (
                                <Tooltip
                                    key={index}
                                    title={iconOnly ? tab.label : ""}
                                    placement="right"
                                >
                                    <Tab
                                        icon={<Icon />}
                                        iconPosition={
                                            iconOnly ? "top" : "start"
                                        }
                                        label={iconOnly ? undefined : tab.label}
                                        aria-label={tab.label}
                                        sx={{
                                            minWidth: iconOnly ? 48 : undefined,
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
                        pl: 3,
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
