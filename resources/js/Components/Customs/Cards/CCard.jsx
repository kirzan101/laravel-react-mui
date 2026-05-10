import { Card } from "@mui/material";

const CCard = ({ title, children, ...props }) => {
    return (
        <Card {...props}>
            {children}
        </Card>
    );
};

export default CCard;