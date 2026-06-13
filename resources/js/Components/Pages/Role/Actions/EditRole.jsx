import {
    CModalFull,
    CButtonAdd,
    CButtonClose,
    CButtonSubmit,
    CCard,
    CCardContent,
    CFabSubmit,
    CButtonEdit,
} from "@/Components";
import { useEffect, useState } from "react";

import FormRole from "./Forms/FormRole";
import TablePermissionList from "../Tables/TablePermissionList";
import { Box, Grid, Typography } from "@mui/material";
import { router } from "@inertiajs/react";

const EditRole = ({
    role,
    flash,
    errors,
    sx,
    permissions,
    moduleLists,
    can,
}) => {
    const [open, setOpen] = useState(false);
    const [btnDisabled, setBtnDisabled] = useState(false);

    const [form, setForm] = useState({
        id: null,
        name: "",
        is_active: true,
        description: "",
        permissionIds: [],
    });

    // update form value when role props change
    useEffect(() => {
        if (!role) return;

        setForm({
            id: role?.id || null,
            name: role?.name || "",
            is_active: role?.is_active ?? true,
            description: role?.description || "",
            permissionIds: role?.rolePermissions?.map((perm) => perm.id) || [],
        });
    }, [role]);

    const handlePermissionsChange = (permissions) => {
        setForm((prev) => ({
            ...prev,
            permissionIds: permissions,
        }));
    };

    // reset form value to initial state
    const handleResetForm = () => {
        setForm({
            id: role?.id || null,
            name: role?.name || "",
            is_active: role?.is_active ?? true,
            description: role?.description || "",
            permissionIds: role?.rolePermissions?.map((perm) => perm.id) || [],
        });
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        // submission here
        router.post(
            `/roles/${role.id}`,
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
                {role.name}
            </CButtonEdit>

            <CModalFull
                title="Edit Role"
                open={open}
                onClose={() => setOpen(false)}
            >
                <form onSubmit={handleSubmit}>
                    <Grid container spacing={4}>
                        {/* Left Side */}
                        <Grid
                            size={{ xs: 12, md: 4 }}
                            sx={{
                                borderRight: {
                                    md: 1,
                                },
                                borderColor: "divider",
                                pr: {
                                    md: 3,
                                },
                            }}
                        >
                            <Typography variant="h6" sx={{ mb: 2 }}>
                                Role Details
                            </Typography>
                            <CCard title="Role Details">
                                <CCardContent>
                                    <Typography
                                        gutterBottom
                                        sx={{
                                            color: "text.secondary",
                                            fontSize: 14,
                                        }}
                                    >
                                        Fill in the form to add a new role.
                                    </Typography>
                                    <FormRole
                                        form={form}
                                        setForm={setForm}
                                        errors={errors}
                                        permissions={permissions}
                                        moduleLists={moduleLists}
                                    />
                                </CCardContent>
                            </CCard>
                        </Grid>

                        {/* Right Side */}
                        <Grid
                            size={{ xs: 12, md: 8 }}
                            sx={{
                                pl: {
                                    md: 2,
                                },
                            }}
                        >
                            <TablePermissionList
                                rolePermissions={role.rolePermissions}
                                permissions={permissions}
                                moduleLists={moduleLists}
                                selectedPermissions={form.permissionIds}
                                onChange={handlePermissionsChange}
                            />
                        </Grid>
                    </Grid>

                    <Box
                        sx={{
                            position: "absolute",
                            bottom: 48,
                            right: 24,
                        }}
                    >
                        <CFabSubmit
                            onClick={handleSubmit}
                            loading={btnDisabled}
                        />
                    </Box>
                </form>
            </CModalFull>
        </>
    );
};

export default EditRole;
