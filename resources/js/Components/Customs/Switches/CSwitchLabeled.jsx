import Switch from "@mui/material/Switch";
import FormControlLabel from "@mui/material/FormControlLabel";

const CSwitchLabeled = ({ label = "Label", ...props }) => {
    return (
        <FormControlLabel
            label={label}
            control={
                <Switch
                    color="primary"
                    inputProps={{ "aria-label": "controlled" }}
                    {...props}
                />
            }
        />
    );
};

export default CSwitchLabeled;
