import { CardContent } from "@mui/material";

const CCardContent = ({ children, ...props }) => {
    return <CardContent {...props}>{children}</CardContent>;
};

export default CCardContent;
