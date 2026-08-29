import { CBoxContent, CSelect } from "@/Components";
import { iconMap } from "@/Utilities/icons";

import UserGroupContent from "@/Components/Pages/UserGroup/UserGroupContent";
import RoleContent from "@/Components/Pages/Role/RoleContent";
import ModuleContent from "@/Components/Pages/Module/ModuleContent";

import {
    Tabs,
    Tab,
    Box,
    FormControl,
    Select,
    MenuItem,
    useTheme,
    useMediaQuery,
} from "@mui/material";

import { useEffect, useState } from "react";

const DRAWER_WIDTH = 200;

const SettingContent = ({
    flash,
    errors,
    can,
    userGroupTypes,
    permissions,
    moduleLists,
    accessibleRoutes,
    settingsModules,
    categories,
}) => {
    const [value, setValue] = useState(0);
    const [showMessages, setShowMessages] = useState(true);

    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("md"));

    useEffect(() => {
        setShowMessages(true);
    }, [flash, errors]);

    const handleTabChange = (event, newValue) => {
        setValue(newValue);
        setShowMessages(false);
    };

    const defaultFlash = {
        success: null,
        error: null,
        info: null,
        warning: null,
    };

    const defaultErrors = {};

    // list of contents for each setting module
    const settingTabContents = [
        {
            base_name: "user_groups",
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
            base_name: "roles",
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
        // {
        //     base_name: "modules",
        //     component: (
        //         <ModuleContent
        //             flash={showMessages ? flash : defaultFlash}
        //             errors={showMessages ? errors : defaultErrors}
        //             can={can}
        //             categories={categories}
        //         />
        //     ),
        // },
    ];

    // Map settings modules to their corresponding tab content
    const tabs = settingsModules.map((module) => {
        const tabContent = settingTabContents.find(
            (content) => content.base_name === module.base_name,
        );

        return {
            label: module.name,
            icon: module.icon,
            component: tabContent ? tabContent.component : null,
        };
    });

    // Filter tabs based on accessible routes
    const accessibleTabs = tabs.filter((tab) =>
        accessibleRoutes.some((route) =>
            route.includes(tab.label.toLowerCase().replace(" ", "_")),
        ),
    );

    return (
        <CBoxContent>
            <Box
                sx={{
                    display: "flex",
                    flexDirection: isMobile ? "column" : "row",
                    width: "100%",
                    gap: 2,
                }}
            >
                {/* Mobile: Dropdown */}
                {isMobile ? (
                    <FormControl fullWidth>
                        <CSelect
                            options={accessibleTabs.map((tab, index) => ({
                                value: index,
                                label: tab.label,
                            }))}
                            value={value}
                            onChange={(e) =>
                                handleTabChange(null, e.target.value)
                            }
                            label="Select Setting"
                        />
                    </FormControl>
                ) : (
                    /* Desktop: Vertical Tabs */
                    <Box
                        sx={{
                            width: 220,
                            flexShrink: 0,
                            borderRight: 1,
                            borderColor: "divider",
                        }}
                    >
                        <Tabs
                            orientation="vertical"
                            value={value}
                            onChange={handleTabChange}
                            sx={{
                                "& .MuiTab-root": {
                                    justifyContent: "flex-start",
                                    alignItems: "stretch",
                                    minHeight: 48,
                                    textTransform: "none",
                                    px: 2,
                                },
                            }}
                        >
                            {accessibleTabs.map((tab, index) => {
                                const Icon = iconMap[tab.icon];

                                return (
                                    <Tab
                                        key={index}
                                        value={index}
                                        disableRipple
                                        label={
                                            <Box
                                                sx={{
                                                    display: "flex",
                                                    alignItems: "center",
                                                    width: "100%",
                                                    gap: 1.5,
                                                }}
                                            >
                                                <Icon fontSize="small" />
                                                <Box
                                                    component="span"
                                                    sx={{
                                                        fontSize: 14,
                                                        fontWeight: 500,
                                                    }}
                                                >
                                                    {tab.label}
                                                </Box>
                                            </Box>
                                        }
                                    />
                                );
                            })}
                        </Tabs>
                    </Box>
                )}

                {/* Content */}
                <Box
                    sx={{
                        flex: 1,
                        minWidth: 0,
                        overflow: "auto",
                    }}
                >
                    {accessibleTabs[value].component}
                </Box>
            </Box>
        </CBoxContent>
    );
};

export default SettingContent;
