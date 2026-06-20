import { CModal, CButtonEdit, CButtonClose, CButtonSubmit } from "@/Components";
import { useEffect, userEffect, useState } from "react";

import FormUser from "./Forms/FormUser";
import { Box } from "@mui/material";
import { router } from "@inertiajs/react";

const EditUser = ({
    user,
    flash,
    errors,
    userGroups,
    accountTypes,
    can,
    sx,
}) => {
    const [open, setOpen] = useState(false);
    const [btnDisabled, setBtnDisabled] = useState(false);

    const buildEmptyForm = () => ({
        username: "",
        email: "",
        first_name: "",
        middle_name: "",
        last_name: "",
        nickname: "",
        type: "",
        position: "",
        contact_numbers: [],
        user_group_id: "",
        role_ids: [],
        user_id: "",
        id: "",
    });

    const buildFormFromUser = (user) => ({
        id: user?.id || "",
        username: user?.username || "",
        email: user?.email || "",
        first_name: user?.first_name || "",
        middle_name: user?.middle_name || "",
        last_name: user?.last_name || "",
        nickname: user?.nickname || "",
        type: user?.type || "",
        position: user?.position || "",
        contact_numbers: user?.contact_numbers || [],
        user_group_id: user?.user_group_id || "",
        role_ids: user?.role_ids || [],
        user_id: user?.user_id || "",
    });

    const [form, setForm] = useState(buildEmptyForm);

    useEffect(() => {
        if (!user) return;
        setForm(buildFormFromUser(user));
    }, [user]);

    const handleResetForm = () => {
        if (user) {
            setForm(buildFormFromUser(user));
        } else {
            setForm(buildEmptyForm());
        }
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        // submission here
        router.post(
            `/users/${user.id}`,
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
                {user.name}
            </CButtonEdit>

            <CModal
                title={`Editing ${user.name}`}
                width={750}
                open={open}
                onClose={() => setOpen(false)}
            >
                <form onSubmit={handleSubmit}>
                    <FormUser
                        form={form}
                        setForm={setForm}
                        errors={errors}
                        userGroups={userGroups}
                        accountTypes={accountTypes}
                        can={can}
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

export default EditUser;
