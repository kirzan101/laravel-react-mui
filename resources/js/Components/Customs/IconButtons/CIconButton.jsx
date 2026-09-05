import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import { iconMap } from "@/Utilities/icons";

const CIconButton = ({
    size = "medium",
    icon,
    tooltip,
    children,
    sx,
    ...props
}) => {
    let IconComponent = iconMap[icon];

    if (!IconComponent) {
        console.warn(
            `Icon "${icon}" does not exist in the iconMap. ` +
                `Using QuestionMarkIcon instead.`,
        );

        IconComponent = iconMap.QuestionMarkIcon;
    }

    const button = (
        <IconButton
            size={size}
            sx={{ m: 1, ...sx }}
            aria-label={props["aria-label"] ?? tooltip}
            {...props}
        >
            <IconComponent fontSize="inherit" />
            {children}
        </IconButton>
    );

    return tooltip ? (
        <Tooltip title={tooltip}>
            <span>{button}</span>
        </Tooltip>
    ) : (
        button
    );
};

export default CIconButton;
