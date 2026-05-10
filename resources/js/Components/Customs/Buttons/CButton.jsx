import Button from "@mui/material/Button";

const CButton = ({
    size = "small",
    variant = "contained",
    loadingPosition = "start",
    children,
    sx,
    ...props
}) => {
    return (
        <Button
            size={size}
            variant={variant}
            loadingPosition={loadingPosition}
            sx={{ m: 1, ...sx }}
            {...props}
        >
            {children}
        </Button>
    );
};

export default CButton;
