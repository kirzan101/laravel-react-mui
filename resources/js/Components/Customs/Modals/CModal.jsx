import { Modal, Box, Typography, Fade } from "@mui/material";

const CModal = ({
    title,
    description,
    width = 400,
    children,
    open,
    onClose,
    ...props
}) => {
    const modalStyle = {
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",

        width: {
            xs: "90%", // mobile
            sm: width, // tablet and up
        },

        maxWidth: 1000,

        bgcolor: "background.paper",
        borderRadius: 2,
        boxShadow: 24,
        px: 4,
        py: 2,
    };

    return (
        <Modal
            open={open}
            onClose={onClose}
            aria-labelledby="cmodal-title"
            aria-describedby="cmodal-description"
            {...props}
        >
            <Fade in={open} timeout={300}>
                <Box sx={modalStyle}>
                    {title && (
                        <Typography
                            id="cmodal-title"
                            variant="h6"
                            component="h2"
                            sx={{ mt: 1, mb: 2 }}
                        >
                            {title}
                        </Typography>
                    )}

                    {description && (
                        <Typography
                            id="cmodal-description"
                            sx={{ mt: 1, mb: 2 }}
                        >
                            {description}
                        </Typography>
                    )}

                    {children}
                </Box>
            </Fade>
        </Modal>
    );
};

export default CModal;
