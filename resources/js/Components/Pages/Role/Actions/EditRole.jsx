import {
    CModalFull,
    CCard,
    CCardContent,
    CFabSubmit,
    CButtonEdit,
} from "@/Components";
import { useEffect, useState } from "react";

import EditLabel from "@/Components/Utilities/EditLabel";
import FormRole from "./Forms/FormRole";
import SelectRolePermissions from "../Fields/SelectRolePermissions";
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
    onSuccess,
}) => {
    const [open, setOpen] = useState(false);
    const [btnDisabled, setBtnDisabled] = useState(false);

    const getFormData = (role) => ({
        id: role?.id ?? null,
        name: role?.name ?? "",
        is_active: role?.is_active ?? true,
        description: role?.description ?? "",
        permissionIds:
            role?.rolePermissions?.map((perm) => perm.permission_id) || [],
    });

    const [form, setForm] = useState(getFormData(role));

    // Store the original form value for logging purposes
    const [oldForm, setOldForm] = useState(null);

    // update form value when role props change
    useEffect(() => {
        setForm(getFormData(role));
    }, [role]);

    // Open modal
    const handleOpen = () => {
        const initialForm = getFormData(role);

        setForm(initialForm);
        setOldForm({ ...initialForm });
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setForm(getFormData(null));
        setOldForm(null);
    };

    const handlePermissionsChange = (permissions) => {
        setForm((prev) => ({
            ...prev,
            permissionIds: permissions,
        }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        // submission here
        router.post(
            `/roles/${role.id}`,
            {
                _method: "PUT",
                ...form,
                old_properties: oldForm, // add old_properties to the form data for logging purposes
            },
            {
                forceFormData: true,
                onSuccess: ({ props }) => {
                    handleClose();

                    // call onSuccess callback if provided
                    onSuccess?.();
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

    // check if user has permission to update roles
    const canUpdateRole = can.includes("update-roles");

    return (
        <>
            {canUpdateRole ? (
                <CButtonEdit sx={sx} onClick={handleOpen}>
                    {role.name}
                </CButtonEdit>
            ) : (
                <EditLabel label={role.name} />
            )}

            <CModalFull
                title="Edit Role"
                titleIcon="EditIcon"
                open={open}
                onClose={handleClose}
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
                            <CCard>
                                <CCardContent>
                                    <Typography
                                        gutterBottom
                                        sx={{
                                            color: "text.secondary",
                                            fontSize: 14,
                                        }}
                                    >
                                        Fill in the form to edit the role.
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
                            <SelectRolePermissions
                                permissions={permissions}
                                moduleLists={moduleLists}
                                selectedPermissions={form.permissionIds}
                                onChange={handlePermissionsChange}
                                errors={errors}
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
