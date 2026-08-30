import { CModal, CButtonClose, CButton } from "@/Components";
import { Box } from "@mui/material";
import { useState } from "react";
import { router } from "@inertiajs/react";

import LogoutIcon from "@mui/icons-material/Logout";

const Logout = ({ open, onClose }) => {
    const [btnDisabled, setBtnDisabled] = useState(false);

    const handleLogout = () => {
        // Prevent multiple requests
        if (btnDisabled) return;

        router.post(
            "/logout",
            {},
            {
                onBefore: () => {
                    setBtnDisabled(true);
                },
                onFinish: () => {
                    setBtnDisabled(false);
                },
            },
        );
    };

    return (
        <CModal
            title="Logout"
            titleIcon="LogoutIcon"
            width={400}
            open={open}
            onClose={onClose}
        >
            Are you sure you want to logout?
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "flex-end",
                    mt: 2,
                }}
            >
                <CButtonClose onClick={onClose} />

                <CButton
                    startIcon={<LogoutIcon />}
                    sx={{ ml: 1, mr: 0 }}
                    loading={btnDisabled}
                    onClick={handleLogout}
                    color="error"
                >
                    Logout
                </CButton>
            </Box>
        </CModal>
    );
};

export default Logout;
