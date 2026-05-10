import { CContainer, CBoxContent } from "@/Components";
import { Typography } from "@mui/material";
import { CButtonAdd } from "@/Components";

const UserGroupContent = ({ flash, errors }) => {
    return (
        <CBoxContent>
            <Typography variant="h4" gutterBottom>
                User Group Content{" "}
                <CButtonAdd onClick={() => alert("Add User Group")} />
            </Typography>
            <Typography variant="body1">
                This is the content area for User Groups. You can add forms,
                tables, or any other components related to user group management
                here.
            </Typography>
        </CBoxContent>
    );
};

export default UserGroupContent;
