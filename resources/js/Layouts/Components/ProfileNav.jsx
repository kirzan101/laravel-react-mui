import { Paper, Avatar, Typography, Box } from "@mui/material";
import AdminBadge from "./AdminBadge";
import DeveloperBadge from "./DeveloperBadge";

const ProfileNav = ({ user }) => {
    const avatarUrl = user.avatar;
    const initials = user.initials || "NA";
    const position = user.position || "N/A";
    const name = user.name || "Guest User";
    const isAdmin = user.isAdmin || false;

    return (
        <Paper variant="string" square>
            <Box
                sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 2,
                    p: 2,
                    minHeight: "100px",
                }}
            >
                {/* AVATAR */}
                {/* <Avatar sx={{ width: 56, height: 56 }}>LF</Avatar> */}
                {avatarUrl ? (
                    <Avatar
                        sx={{
                            width: 56,
                            height: 56,
                        }}
                        alt={name}
                        src={avatarUrl}
                    />
                ) : (
                    <Avatar
                        sx={{
                            width: 56,
                            height: 56,
                            bgcolor: "primary.main",
                            color: "#fff",
                        }}
                    >
                        {initials}
                    </Avatar>
                )}

                {/* TEXT */}
                <Box>
                    <Typography
                        sx={{
                            fontWeight: 600,
                            lineHeight: 1.2,
                            whiteSpace: "normal", // allow wrapping
                            wordBreak: "break-word", // force long names to wrap
                        }}
                    >
                        {name}
                        {isAdmin && <AdminBadge />}
                        <DeveloperBadge user={user} />
                    </Typography>

                    <Typography variant="body2" sx={{ opacity: 0.7 }}>
                        {position}
                    </Typography>
                </Box>
            </Box>
        </Paper>
    );
};

export default ProfileNav;
