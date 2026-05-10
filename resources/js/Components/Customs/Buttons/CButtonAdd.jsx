import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";

const CButtonAdd = ({
    size = "small",
    variant = "contained",
    startIcon = <AddIcon />,
    children = "Add",
    sx,
    ...props
}) => {
    return (
        <Button
            size={size}
            variant={variant}
            startIcon={startIcon}
            sx={{ m: 1, ...sx }}
            {...props}
        >
            {children}
        </Button>
    );
};

export default CButtonAdd;
