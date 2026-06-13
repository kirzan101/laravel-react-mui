import Switch from "@mui/material/Switch";
import FormControlLabel from "@mui/material/FormControlLabel";

const CSwitchLabeled = ({ label = "Label", checked, onChange }) => {
    return (
        <FormControlLabel
            label={label}
            control={
                <Switch
                    checked={checked}
                    onChange={onChange}
                    color="primary"
                    slotProps={{
                        input: {
                            "aria-label": "controlled",
                        },
                    }}
                />
            }
        />
    );
};

export default CSwitchLabeled;
