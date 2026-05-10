import TextField from "@mui/material/TextField";

const CTextField = ({ children, ...props }) => (
    <TextField size="small" variant="outlined" {...props}>
        {children}
    </TextField>
);

export default CTextField;
