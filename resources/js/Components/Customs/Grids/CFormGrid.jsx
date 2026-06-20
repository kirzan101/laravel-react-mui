import Grid from "@mui/material/Grid";

const CFormGrid = ({ children, size = { xs: 12, sm: 6 }, ...props }) => {
    return (
        <Grid sx={{ pt: 0.5 }} size={size} {...props}>
            {children}
        </Grid>
    );
};

export default CFormGrid;
