import { CModal, CButtonEdit, CButtonClose, CButtonSubmit } from "@/Components";
import { userEffect, useState } from "react";

import FormUserGroup from "./Forms/FormUserGroup";
import { Box } from "@mui/material";
import { router } from "@inertiajs/react";

const EditUserGroup = ({ userGroup, flash, errors, sx }) => {
    const [open, setOpen] = useState(false);
    const [btnDisabled, setBtnDisabled] = useState(false);

    const [form, setForm] = useState({
        id: null,
        name: "",
        code: "",
        description: "",
    });

    // update form value when userGroup props change
    useEffect(() => {
        if (!userGroup) return;

        setForm({
            id: userGroup?.id || null,
            name: userGroup?.name || "",
            code: userGroup?.code || "",
            description: userGroup?.description || "",
        });
    }, [userGroup]);

    // reset form value to initial state
    const handleResetForm = () => {
        setForm({
            id: userGroup?.id || null,
            name: userGroup?.name || "",
            code: userGroup?.code || "",
            description: userGroup?.description || "",
        });
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        // submission here
        router.post(
            `/user-groups/${userGroup.id}`,
            {
                _method: "PUT",
                forceFormData: true,
                ...form,
            },
            {
                onSuccess: ({ props }) => {
                    setOpen(false);

                    // reset form value
                    handleResetForm();
                },
                onError: () => {
                    // emits("notification", "Some fields has an error.", "error");
                    // add snackbar here
                },
                onBefore: () => {
                    setBtnDisabled(true);
                },
                onFinish: () => {
                    setBtnDisabled(false);
                },
            },
        );
    };

    return (
        <>
            <CButtonEdit sx={sx} onClick={() => setOpen(true)}>
                {userGroup.name}
            </CButtonEdit>

            <CModal
                title={`Editing ${userGroup.name}`}
                width={650}
                open={open}
                onClose={() => setOpen(false)}
            >
                <form onSubmit={handleSubmit}>
                    <FormUserGroup
                        form={form}
                        setForm={setForm}
                        errors={errors}
                    />

                    <Box
                        sx={{
                            display: "flex",
                            justifyContent: "flex-end",
                            mt: 2,
                        }}
                    >
                        <CButtonClose onClick={() => setOpen(false)} />
                        <CButtonSubmit sx={{ ml: 1 }} loading={btnDisabled} />
                    </Box>
                </form>
            </CModal>
        </>
    );
};

export default EditUserGroup;
