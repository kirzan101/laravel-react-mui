import { IconButton, Tooltip } from "@mui/material";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";

import { useThemeMode } from "@/Contexts/ThemeContext";

const ThemeButton = ({ ...props }) => {
    const { mode, toggleTheme } = useThemeMode();

    return (
        <Tooltip title="Toggle Theme" placement="bottom">
            <IconButton onClick={toggleTheme} color="inherit" {...props}>
                {mode === "light" ? <DarkModeIcon /> : <LightModeIcon />}
            </IconButton>
        </Tooltip>
    );
};

export default ThemeButton;
