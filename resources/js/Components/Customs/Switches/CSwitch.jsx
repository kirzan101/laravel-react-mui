import Switch from "@mui/material/Switch";

const CSwitch = (props) => {
    return (
        <Switch
            color="primary"
            inputProps={{ "aria-label": "controlled" }}
            {...props}
        />
    );
};

export default CSwitch;
