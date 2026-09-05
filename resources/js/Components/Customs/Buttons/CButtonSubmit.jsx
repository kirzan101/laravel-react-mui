import Button from "@mui/material/Button";
import { iconMap } from "@/Utilities/icons";

const CButtonSubmit = ({
    size = "medium",
    variant = "contained",
    loadingPosition = "start",
    startIcon = "SaveIcon",
    children = "Save",
    sx,
    ...props
}) => {
    let IconComponent = iconMap[startIcon];

    if (!IconComponent) {
        console.warn(
            `Icon "${startIcon}" does not exist in the iconMap. ` +
                `Using SaveIcon instead.`,
        );

        IconComponent = iconMap.SaveIcon;
    }

    return (
        <Button
            type="submit"
            size={size}
            variant={variant}
            startIcon={IconComponent ? <IconComponent /> : null}
            loadingPosition={loadingPosition}
            sx={{ m: 1, ...sx }}
            {...props}
        >
            {children}
        </Button>
    );
};

export default CButtonSubmit;
