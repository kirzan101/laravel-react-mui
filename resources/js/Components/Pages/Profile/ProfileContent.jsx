import { useState } from "react";

import {
    Avatar,
    Box,
    Button,
    Chip,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Divider,
    Grid,
    IconButton,
    Stack,
    TextField,
    Typography,
} from "@mui/material";

import {
    Badge as BadgeIcon,
    CalendarMonth as CalendarIcon,
    Close as CloseIcon,
    Edit as EditIcon,
    Email as EmailIcon,
    Lock as LockIcon,
    Person as PersonIcon,
    Phone as PhoneIcon,
} from "@mui/icons-material";

import { CBoxContent } from "@/Components";
import AlertTransaction from "@/Components/Utilities/AlertTransaction";

const ProfileContent = ({ flash, errors = {}, profile = {} }) => {
    const [editOpen, setEditOpen] = useState(false);

    const [form, setForm] = useState({
        first_name: profile.first_name ?? "",
        middle_name: profile.middle_name ?? "",
        last_name: profile.last_name ?? "",
        nickname: profile.nickname ?? "",
        username: profile.username ?? "",
        email: profile.email ?? "",
        contact_number: profile.contact_numbers?.[0] ?? "",
    });

    const initials =
        profile.initials ||
        profile.full_name
            ?.split(" ")
            .filter(Boolean)
            .map((name) => name.charAt(0))
            .join("")
            .slice(0, 2)
            .toUpperCase() ||
        "U";

    const handleChange = (field) => (event) => {
        setForm((current) => ({
            ...current,
            [field]: event.target.value,
        }));
    };

    const handleSave = () => {
        /*
         * Handle your profile update here.
         *
         * Example:
         *
         * router.put(route("profile.update"), form, {
         *     preserveScroll: true,
         *     onSuccess: () => setEditOpen(false),
         * });
         */

        console.log("Updated profile:", form);
    };

    return (
        <CBoxContent>
            {flash?.error ? <AlertTransaction flash={flash} /> : null}

            <Box
                sx={{
                    width: "100%",
                    maxWidth: 1000,
                    mx: "auto",
                }}
            >
                {/* =====================================================
                    PROFILE CARD
                ====================================================== */}
                <Box
                    sx={{
                        overflow: "hidden",
                        border: 1,
                        borderColor: "divider",
                        borderRadius: 3,
                        bgcolor: "background.paper",
                        boxShadow: "0 4px 20px rgba(0, 0, 0, 0.08)",
                    }}
                >
                    {/* =================================================
                        PROFILE BANNER
                    ================================================== */}
                    <Box
                        sx={{
                            position: "relative",
                            height: {
                                xs: 140,
                                sm: 190,
                            },
                            overflow: "hidden",
                            background: (theme) =>
                                `linear-gradient(
                                    135deg,
                                    ${theme.palette.primary.dark} 0%,
                                    ${theme.palette.primary.main} 50%,
                                    ${theme.palette.secondary.main} 100%
                                )`,
                        }}
                    >
                        {/* Decorative circles */}
                        <Box
                            aria-hidden="true"
                            sx={{
                                position: "absolute",
                                width: 240,
                                height: 240,
                                top: -110,
                                right: -40,
                                borderRadius: "50%",
                                bgcolor: "rgba(255,255,255,0.08)",
                            }}
                        />

                        <Box
                            aria-hidden="true"
                            sx={{
                                position: "absolute",
                                width: 160,
                                height: 160,
                                bottom: -90,
                                left: "35%",
                                borderRadius: "50%",
                                bgcolor: "rgba(255,255,255,0.06)",
                            }}
                        />

                        {/* Edit Profile */}
                        <Button
                            variant="contained"
                            startIcon={<EditIcon />}
                            onClick={() => setEditOpen(true)}
                            sx={{
                                position: "absolute",
                                top: {
                                    xs: 12,
                                    sm: 20,
                                },
                                right: {
                                    xs: 12,
                                    sm: 20,
                                },
                                color: "#fff",
                                bgcolor: "rgba(0, 0, 0, 0.35)",
                                backdropFilter: "blur(8px)",
                                "&:hover": {
                                    bgcolor: "rgba(0, 0, 0, 0.55)",
                                },
                            }}
                        >
                            Edit Profile
                        </Button>
                    </Box>

                    {/* =================================================
                        PROFILE HEADER
                    ================================================== */}
                    <Box
                        sx={{
                            position: "relative",
                            px: {
                                xs: 2,
                                sm: 4,
                            },
                            pb: 4,
                        }}
                    >
                        {/* Avatar */}
                        <Box
                            sx={{
                                display: "flex",
                                justifyContent: {
                                    xs: "center",
                                    sm: "flex-start",
                                },
                            }}
                        >
                            <Box
                                sx={{
                                    position: "relative",
                                    mt: -7,
                                }}
                            >
                                <Avatar
                                    src={profile.avatar || undefined}
                                    alt={profile.full_name || "Profile avatar"}
                                    sx={{
                                        width: {
                                            xs: 110,
                                            sm: 140,
                                        },
                                        height: {
                                            xs: 110,
                                            sm: 140,
                                        },
                                        border: "7px solid",
                                        borderColor: "background.paper",
                                        bgcolor: "primary.main",
                                        fontSize: 40,
                                        fontWeight: 700,
                                    }}
                                >
                                    {initials}
                                </Avatar>

                                {/* Online status */}
                                <Box
                                    aria-label={
                                        profile.status === "active"
                                            ? "Active"
                                            : "Inactive"
                                    }
                                    sx={{
                                        position: "absolute",
                                        right: 6,
                                        bottom: 6,
                                        width: 28,
                                        height: 28,
                                        border: "5px solid",
                                        borderColor: "background.paper",
                                        borderRadius: "50%",
                                        bgcolor:
                                            profile.status === "active"
                                                ? "#23a55a"
                                                : "#80848e",
                                    }}
                                />
                            </Box>
                        </Box>

                        {/* =================================================
                            NAME
                        ================================================== */}
                        <Box sx={{ mt: 2 }}>
                            <Stack
                                direction="row"
                                spacing={1}
                                sx={{
                                    alignItems: "center",
                                    flexWrap: "wrap",
                                }}
                            >
                                <Typography
                                    variant="h4"
                                    sx={{
                                        fontSize: {
                                            xs: "1.7rem",
                                            sm: "2rem",
                                        },
                                        fontWeight: 800,
                                    }}
                                >
                                    {profile.full_name || "Unnamed User"}
                                </Typography>

                                {profile.is_admin ? (
                                    <Chip
                                        label="ADMIN"
                                        size="small"
                                        color="primary"
                                        sx={{
                                            fontWeight: 700,
                                        }}
                                    />
                                ) : null}
                            </Stack>

                            <Typography variant="body1" color="text.secondary">
                                @{profile.username || "user"}
                            </Typography>

                            {profile.nickname ? (
                                <Typography
                                    variant="body2"
                                    color="text.secondary"
                                    sx={{ mt: 0.5 }}
                                >
                                    {profile.nickname}
                                </Typography>
                            ) : null}
                        </Box>

                        <Divider sx={{ my: 3 }} />

                        {/* =================================================
                            INFORMATION
                        ================================================== */}
                        <Grid container spacing={3}>
                            {/* =================================================
                                ABOUT ME
                            ================================================== */}
                            <Grid size={{ xs: 12, md: 7 }}>
                                <Typography
                                    variant="overline"
                                    color="text.secondary"
                                    sx={{
                                        fontWeight: 700,
                                    }}
                                >
                                    About Me
                                </Typography>

                                <Box
                                    sx={{
                                        mt: 1,
                                        p: 2,
                                        borderRadius: 2,
                                        bgcolor: "action.hover",
                                    }}
                                >
                                    <Stack spacing={2}>
                                        <InfoRow
                                            icon={<PersonIcon />}
                                            label="Full Name"
                                            value={profile.full_name}
                                        />

                                        <InfoRow
                                            icon={<BadgeIcon />}
                                            label="Position"
                                            value={profile.position}
                                        />

                                        <InfoRow
                                            icon={<PersonIcon />}
                                            label="User Group"
                                            value={profile.user_group_name}
                                        />

                                        <InfoRow
                                            icon={<EmailIcon />}
                                            label="Email"
                                            value={profile.email}
                                        />

                                        <InfoRow
                                            icon={<PhoneIcon />}
                                            label="Contact Number"
                                            value={
                                                profile.contact_numbers?.length
                                                    ? profile.contact_numbers.join(
                                                          ", ",
                                                      )
                                                    : null
                                            }
                                        />
                                    </Stack>
                                </Box>
                            </Grid>

                            {/* =================================================
                                ACCOUNT INFORMATION
                            ================================================== */}
                            <Grid size={{ xs: 12, md: 5 }}>
                                <Typography
                                    variant="overline"
                                    color="text.secondary"
                                    sx={{
                                        fontWeight: 700,
                                    }}
                                >
                                    Account Information
                                </Typography>

                                <Box
                                    sx={{
                                        mt: 1,
                                        p: 2,
                                        borderRadius: 2,
                                        bgcolor: "action.hover",
                                    }}
                                >
                                    <Stack spacing={2}>
                                        <InfoRow
                                            icon={<BadgeIcon />}
                                            label="Account Type"
                                            value={profile.type}
                                        />

                                        {/* STATUS */}
                                        <Box>
                                            <Stack
                                                direction="row"
                                                spacing={1.5}
                                                sx={{
                                                    alignItems: "center",
                                                }}
                                            >
                                                <Box
                                                    sx={{
                                                        display: "flex",
                                                        alignItems: "center",
                                                        justifyContent:
                                                            "center",
                                                        flexShrink: 0,
                                                        color: "text.secondary",
                                                        "& svg": {
                                                            fontSize: 21,
                                                        },
                                                    }}
                                                >
                                                    <BadgeIcon />
                                                </Box>

                                                <Box
                                                    sx={{
                                                        minWidth: 0,
                                                        flex: 1,
                                                    }}
                                                >
                                                    <Typography
                                                        variant="caption"
                                                        color="text.secondary"
                                                        display="block"
                                                        sx={{
                                                            fontWeight: 600,
                                                        }}
                                                    >
                                                        Status
                                                    </Typography>

                                                    <Box
                                                        sx={{
                                                            mt: 0.25,
                                                        }}
                                                    >
                                                        <Chip
                                                            label={
                                                                profile.status ||
                                                                "Unknown"
                                                            }
                                                            size="small"
                                                            color={
                                                                profile.status ===
                                                                "active"
                                                                    ? "success"
                                                                    : "default"
                                                            }
                                                            sx={{
                                                                textTransform:
                                                                    "capitalize",
                                                            }}
                                                        />
                                                    </Box>
                                                </Box>
                                            </Stack>
                                        </Box>

                                        {/* =================================================
                                            CHANGE PASSWORD
                                        ================================================== */}
                                        <Box
                                            sx={{
                                                pt: 1,
                                            }}
                                        >
                                            <Button
                                                fullWidth
                                                variant="outlined"
                                                color="warning"
                                                startIcon={<LockIcon />}
                                                onClick={() => {
                                                    /*
                                                     * Handle change
                                                     * password here.
                                                     *
                                                     * Intentionally
                                                     * left empty.
                                                     */
                                                }}
                                                sx={{
                                                    justifyContent:
                                                        "flex-start",
                                                    textTransform: "none",
                                                    fontWeight: 600,
                                                }}
                                            >
                                                Change Password
                                            </Button>
                                        </Box>

                                        <Divider />

                                        <InfoRow
                                            icon={<CalendarIcon />}
                                            label="Last Login"
                                            value={profile.last_login_at}
                                        />

                                        <InfoRow
                                            icon={<CalendarIcon />}
                                            label="Created"
                                            value={profile.created_at}
                                        />

                                        <InfoRow
                                            icon={<CalendarIcon />}
                                            label="Last Updated"
                                            value={profile.updated_at}
                                        />
                                    </Stack>
                                </Box>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
            </Box>

            {/* =========================================================
                EDIT PROFILE DIALOG
            ========================================================== */}
            <Dialog
                open={editOpen}
                onClose={() => setEditOpen(false)}
                fullWidth
                maxWidth="md"
            >
                <DialogTitle
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                    }}
                >
                    Edit Profile
                    <IconButton
                        onClick={() => setEditOpen(false)}
                        aria-label="Close edit profile"
                    >
                        <CloseIcon />
                    </IconButton>
                </DialogTitle>

                <DialogContent dividers>
                    <Grid container spacing={2.5} sx={{ pt: 1 }}>
                        <Grid size={{ xs: 12, sm: 6 }}>
                            <TextField
                                fullWidth
                                label="First Name"
                                value={form.first_name}
                                onChange={handleChange("first_name")}
                                error={Boolean(errors.first_name)}
                                helperText={errors.first_name || ""}
                            />
                        </Grid>

                        <Grid size={{ xs: 12, sm: 6 }}>
                            <TextField
                                fullWidth
                                label="Middle Name"
                                value={form.middle_name}
                                onChange={handleChange("middle_name")}
                                error={Boolean(errors.middle_name)}
                                helperText={errors.middle_name || ""}
                            />
                        </Grid>

                        <Grid size={{ xs: 12, sm: 6 }}>
                            <TextField
                                fullWidth
                                label="Last Name"
                                value={form.last_name}
                                onChange={handleChange("last_name")}
                                error={Boolean(errors.last_name)}
                                helperText={errors.last_name || ""}
                            />
                        </Grid>

                        <Grid size={{ xs: 12, sm: 6 }}>
                            <TextField
                                fullWidth
                                label="Nickname"
                                value={form.nickname}
                                onChange={handleChange("nickname")}
                                error={Boolean(errors.nickname)}
                                helperText={errors.nickname || ""}
                            />
                        </Grid>

                        <Grid size={{ xs: 12, sm: 6 }}>
                            <TextField
                                fullWidth
                                label="Username"
                                value={form.username}
                                onChange={handleChange("username")}
                                error={Boolean(errors.username)}
                                helperText={errors.username || ""}
                            />
                        </Grid>

                        <Grid size={{ xs: 12, sm: 6 }}>
                            <TextField
                                fullWidth
                                label="Email"
                                type="email"
                                value={form.email}
                                onChange={handleChange("email")}
                                error={Boolean(errors.email)}
                                helperText={errors.email || ""}
                            />
                        </Grid>

                        <Grid size={{ xs: 12 }}>
                            <TextField
                                fullWidth
                                label="Contact Number"
                                value={form.contact_number}
                                onChange={handleChange("contact_number")}
                                error={Boolean(errors.contact_numbers)}
                                helperText={errors.contact_numbers || ""}
                            />
                        </Grid>
                    </Grid>
                </DialogContent>

                <DialogActions sx={{ p: 2 }}>
                    <Button onClick={() => setEditOpen(false)}>Cancel</Button>

                    <Button
                        variant="contained"
                        startIcon={<EditIcon />}
                        onClick={handleSave}
                    >
                        Save Changes
                    </Button>
                </DialogActions>
            </Dialog>
        </CBoxContent>
    );
};

/**
 * Text-only information row.
 *
 * `value` must contain text/string data only.
 * This prevents invalid DOM nesting such as:
 *
 * <p>
 *     <div>...</div>
 * </p>
 */
const InfoRow = ({ icon, label, value }) => {
    const displayValue =
        value !== null && value !== undefined && String(value).trim() !== ""
            ? String(value)
            : "Not provided";

    return (
        <Stack
            direction="row"
            spacing={1.5}
            sx={{
                alignItems: "center",
                minWidth: 0,
            }}
        >
            <Box
                sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                    color: "text.secondary",
                    "& svg": {
                        fontSize: 21,
                    },
                }}
            >
                {icon}
            </Box>

            <Box
                sx={{
                    minWidth: 0,
                    flex: 1,
                }}
            >
                <Typography
                    variant="caption"
                    color="text.secondary"
                    display="block"
                    sx={{
                        fontWeight: 600,
                    }}
                >
                    {label}
                </Typography>

                <Typography
                    component="span"
                    variant="body2"
                    sx={{
                        display: "block",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                        fontWeight: 600,
                    }}
                >
                    {displayValue}
                </Typography>
            </Box>
        </Stack>
    );
};

export default ProfileContent;
