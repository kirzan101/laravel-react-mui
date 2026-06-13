import Grid from "@mui/material/Grid";

const CFormGrid = ({ children, size = 12, ...props }) => {
    return (
        <Grid sx={{ pt: 0.5 }} size={{ xs: 12, sm: 6 }} {...props}>
            {children}
        </Grid>
    );
};

export default CFormGrid;
