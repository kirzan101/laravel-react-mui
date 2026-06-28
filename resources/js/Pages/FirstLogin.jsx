import {
    Typography,
    Grid,
    TextField,
    Button,
    Box,
    Divider,
} from "@mui/material";
import { CTextField, CButton, CAlertError } from "@/Components";
import { useTheme, useMediaQuery } from "@mui/material";
import { useState } from "react";
import { router, Head, usePage } from "@inertiajs/react";

import EmptyLayout from "@/Layouts/EmptyLayout";

const FirstLogin = ({ flash, errors }) => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("md"));

    // app info from backend (via Inertia props)
    const page = usePage();
    const appName = page.props.appName || "Laravel React App";
    const appDeveloper = page.props.appDeveloper || "Developer";
    const appVersion = page.props.appVersion || "1.0.0";

    const [btnDisabled, setBtnDisabled] = useState(false);
    const [form, setForm] = useState({
        password: "",
        password_confirmation: "",
    });

    const isDark = theme.palette.mode === "dark";
    const imageUrl = isDark
        ? "/images/change_password_dark.svg"
        : "/images/change_password_light.svg";

    const handleChange = (field) => (e) => {
        setForm((prev) => ({
            ...prev,
            [field]: e.target.value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault(); // Prevent default form submission behavior

        router.post("/first-login-change-password", form, {
            onSuccess: ({ props }) => {
                // Handle successful login, e.g., redirect or show a success message
            },
            onError: () => {
                // Handle login error, e.g., show an error message
            },
            onBefore: () => {
                setBtnDisabled(true);
            },
            onFinish: () => {
                setBtnDisabled(false);
            },
        });
    };

    return (
        <>
            <Head title={`First Login — ${appName}`} />
            <Grid container sx={{ minHeight: "100vh" }}>
                {/* LEFT */}
                <Grid
                    size={{ xs: 0, md: 6 }}
                    sx={{
                        display: { xs: "none", md: "flex" },
                        background: (theme) => theme.gradients.primary,
                        color: "white",
                        alignItems: "center",
                        justifyContent: "center",
                        p: 4,
                    }}
                >
                    <Box
                        sx={{
                            textAlign: "center",
                            maxWidth: 500,
                        }}
                    >
                        <img
                            src={imageUrl}
                            alt="First Login"
                            style={{ width: "100%", maxWidth: 400 }}
                        />

                        <Typography
                            sx={{ mt: 4 }}
                            variant="h3"
                            fontWeight="bold"
                        >
                            {appName}
                        </Typography>

                        <Typography variant="h5" sx={{ mt: 2 }}>
                            First Login - Update Your Password
                        </Typography>

                        {/* <Typography variant="body2" sx={{ mt: 3 }}>
                            Optional description or welcome message can be
                            placed here to provide additional context or
                            instructions to the user.
                        </Typography> */}
                    </Box>
                </Grid>

                {/* RIGHT */}
                <Grid
                    size={{ xs: 12, md: 6 }}
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        bgcolor: (theme) => theme.palette.background,
                        p: 4,
                    }}
                >
                    <Box
                        sx={{
                            width: "100%",
                            maxWidth: 400,
                            textAlign: "center",
                        }}
                    >
                        <Typography variant="h4" fontWeight="bold">
                            Welcome!
                        </Typography>

                        <Typography
                            variant="subtitle1"
                            fontWeight="italic"
                            sx={{ mt: 1 }}
                        >
                            Please Update Your Password
                        </Typography>

                        {errors.error && (
                            <CAlertError sx={{ mt: 2 }}>
                                {errors.error}
                            </CAlertError>
                        )}

                        <form className="mt-2" onSubmit={handleSubmit}>
                            <CTextField
                                fullWidth
                                label="New Password"
                                sx={{ mt: 2 }}
                                value={form.password}
                                onChange={handleChange("password")}
                                type="password"
                                error={!!errors.password}
                                helperText={errors.password}
                                autoComplete="current-password"
                            />

                            <CTextField
                                fullWidth
                                label="Confirm Password"
                                sx={{ mt: 2 }}
                                value={form.password_confirmation}
                                onChange={handleChange("password_confirmation")}
                                type="password"
                                error={!!errors.password_confirmation}
                                helperText={errors.password_confirmation}
                                autoComplete="current-password"
                            />

                            <CButton
                                fullWidth
                                sx={{ mt: 2, mx: 0 }}
                                loading={btnDisabled}
                                loadingPosition="start"
                                type="submit"
                            >
                                UPDATE PASSWORD
                            </CButton>
                        </form>

                        <Divider sx={{ my: 2 }} />

                        <Typography variant="body2"></Typography>
                        <Typography variant="body2">
                            {appDeveloper} {new Date().getFullYear()} &copy; — v
                            {appVersion}
                        </Typography>
                    </Box>
                </Grid>
            </Grid>
        </>
    );
};

FirstLogin.layout = (page) => <EmptyLayout>{page}</EmptyLayout>;

export default FirstLogin;
