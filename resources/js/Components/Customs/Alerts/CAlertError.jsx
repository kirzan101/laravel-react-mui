import Alert from "@mui/material/Alert";

const CAlertError = ({ children, ...props }) => {
    return (
        <Alert variant="filled" severity="error" color="error" {...props}>
            {children}
        </Alert>
    );
};

export default CAlertError;
