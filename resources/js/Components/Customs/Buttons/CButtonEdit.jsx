import Button from "@mui/material/Button";
import EditIcon from "@mui/icons-material/Edit";

const CButtonEdit = ({
    size = "medium",
    variant = "text",
    endIcon = <EditIcon />,
    children = "Edit",
    sx,
    ...props
}) => {
    return (
        <Button
            size={size}
            variant={variant}
            endIcon={endIcon}
            sx={{
                m: 1,
                ...sx,
                color: (theme) => theme.palette.buttonTextColor.main,
                "&:hover": {
                    color: (theme) => theme.palette.buttonTextColor.main,
                },
            }}
            {...props}
        >
            {children}
        </Button>
    );
};

export default CButtonEdit;
