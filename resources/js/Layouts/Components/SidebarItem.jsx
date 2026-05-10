import {
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
} from "@mui/material";
import { router, usePage } from "@inertiajs/react";

const SidebarItem = ({ href, icon: Icon, label }) => {
    const { url } = usePage();

    const isActive = url.startsWith(href);

    const handleClick = (e) => {
        e.preventDefault();
        router.visit(href);
    };

    return (
        <ListItem disablePadding>
            <ListItemButton
                href={href}
                onClick={handleClick}
                selected={isActive}
                sx={{
                    "&.Mui-selected": {
                        backgroundColor: "primary.main",
                        color: "primary.contrastText",

                        "& .MuiListItemIcon-root": {
                            color: "primary.contrastText",
                        },
                    },

                    "&.Mui-selected:hover": {
                        backgroundColor: "primary.dark",
                    },
                }}
            >
                <ListItemIcon>
                    <Icon />
                </ListItemIcon>

                <ListItemText primary={label} />
            </ListItemButton>
        </ListItem>
    );
};

export default SidebarItem;
