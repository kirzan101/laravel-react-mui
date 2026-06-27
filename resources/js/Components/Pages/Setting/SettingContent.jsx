import { CContainer, CBoxContent, CSearchField } from "@/Components";
import { iconMap } from "@/Utilities/icons";
import { lighten } from "@mui/material/styles";

import UserGroupContent from "@/Components/Pages/UserGroup/UserGroupContent";
import RoleContent from "@/Components/Pages/Role/RoleContent";
import { Tabs, Tab, Box } from "@mui/material";

import { useEffect, useState } from "react";

const SettingContent = ({
    flash,
    errors,
    can,
    userGroupTypes,
    permissions,
    userGroups,
    moduleLists,
}) => {
    const [value, setValue] = useState(0);
    const [showMessages, setShowMessages] = useState(true); // State to control the display of flash messages and errors

    useEffect(() => {
        setShowMessages(true);
    }, [flash, errors]);

    const handleTabChange = (event, newValue) => {
        setValue(newValue);
        setShowMessages(false);
    };

    const tabs = [
        {
            label: "User groups",
            icon: "GroupsIcon",
            component: (
                <UserGroupContent
                    flash={showMessages ? flash : null}
                    errors={showMessages ? errors : null}
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
                    flash={showMessages ? flash : null}
                    errors={showMessages ? errors : null}
                    permissions={permissions}
                    userGroups={userGroups}
                    moduleLists={moduleLists}
                    can={can}
                />
            ),
        },
    ];

    return (
        <CBoxContent>
            <Box sx={{ display: "flex", width: "100%" }}>
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

                <Box
                    sx={{
                        flex: 1,
                        minWidth: 0, // <-- important
                        pl: 3,
                    }}
                >
                    {tabs[value].component}
                </Box>
            </Box>
        </CBoxContent>
    );
};

export default SettingContent;
