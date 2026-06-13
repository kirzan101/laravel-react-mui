import { Modal, Box, Typography, Fade, Button } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

const CModalFull = ({
    title,
    description,
    children,
    open,
    onClose,
    ...props
}) => {
    /*
    |--------------------------------------------------------------------------
    | Modal styles
    |--------------------------------------------------------------------------
    */
    const modalStyle = {
        top: 0,
        left: 0,

        width: "100vw",
        height: "100vh",

        bgcolor: "background.paper",

        display: "flex",
        flexDirection: "column",

        overflow: "hidden",

        position: "relative", // FOR FAB POSITIONING
    };

    return (
        <Modal
            open={open}
            onClose={onClose}
            aria-labelledby="cmodalfull-title"
            aria-describedby="cmodalfull-description"
            {...props}
        >
            <Fade in={open} timeout={300}>
                <Box sx={modalStyle}>
                    {/* Header */}
                    {(title || description) && (
                        <Box
                            sx={{
                                px: 4,
                                pt: 3,
                                pb: 2,
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "flex-start",
                                gap: 2,
                            }}
                        >
                            {/* Left Side */}
                            <Box>
                                {title && (
                                    <Typography
                                        id="cmodalfull-title"
                                        variant="h6"
                                        component="h2"
                                    >
                                        {title}
                                    </Typography>
                                )}

                                {description && (
                                    <Typography
                                        id="cmodalfull-description"
                                        variant="body2"
                                        color="text.secondary"
                                        sx={{ mt: 1 }}
                                    >
                                        {description}
                                    </Typography>
                                )}
                            </Box>

                            {/* Right Side */}
                            <Box>
                                <Button
                                    variant="contained"
                                    color="error"
                                    startIcon={<CloseIcon />}
                                    onClick={onClose}
                                >
                                    Close
                                </Button>
                            </Box>
                        </Box>
                    )}

                    {/* Content */}
                    <Box
                        sx={{
                            flex: 1,
                            overflowY: "auto",
                            px: 4,
                            py: 3,
                        }}
                    >
                        {children}
                    </Box>
                </Box>
            </Fade>
        </Modal>
    );
};

export default CModalFull;
