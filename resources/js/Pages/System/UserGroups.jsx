import { CBox } from "@/Components";
import { Typography } from "@mui/material";

const UserGroups = ({ flash, errors }) => {
    return (
        <CBox
            sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                height: "80vh",
            }}
        >
            <Typography variant="h3" gutterBottom>
                User Groups Page
            </Typography>
            <Typography variant="h6">
                Sample user groups management page. You can implement user group
                listing, creation, and management features here.
            </Typography>
        </CBox>
    );
};

export default UserGroups;
