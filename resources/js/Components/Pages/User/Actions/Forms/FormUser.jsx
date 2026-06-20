import { CTextField, CFormGrid, CFormRow, CSelect } from "@/Components";
import { Grid, Typography } from "@mui/material";
import { useState } from "react";

const FormUser = ({
    form,
    setForm,
    errors = {},
    userGroups,
    accountTypes,
    can,
}) => {
    const handleChange = (field) => (e) => {
        setForm((prev) => ({
            ...prev,
            [field]: e.target.value,
        }));
    };

    return (
        <CFormRow>
            <CFormGrid size={{ xs: 12, sm: 4 }}>
                <CTextField
                    label="First name"
                    id="first_name"
                    name="first_name"
                    value={form.first_name}
                    onChange={handleChange("first_name")}
                    error={!!errors.first_name}
                    helperText={errors.first_name}
                />
            </CFormGrid>

            <CFormGrid size={{ xs: 12, sm: 4 }}>
                <CTextField
                    label="Middle name"
                    id="middle_name"
                    name="middle_name"
                    value={form.middle_name}
                    onChange={handleChange("middle_name")}
                    error={!!errors.middle_name}
                    helperText={errors.middle_name}
                />
            </CFormGrid>

            <CFormGrid size={{ xs: 12, sm: 4 }}>
                <CTextField
                    label="Last name"
                    id="last_name"
                    name="last_name"
                    value={form.last_name}
                    onChange={handleChange("last_name")}
                    error={!!errors.last_name}
                    helperText={errors.last_name}
                />
            </CFormGrid>

            <CFormGrid size={{ xs: 12, sm: 4 }}>
                <CTextField
                    label="Nickname"
                    id="nickname"
                    name="nickname"
                    value={form.nickname}
                    onChange={handleChange("nickname")}
                    error={!!errors.nickname}
                    helperText={errors.nickname}
                />
            </CFormGrid>

            <CFormGrid size={{ xs: 12, sm: 4 }}>
                <CSelect
                    label="Account Type"
                    id="type"
                    name="type"
                    value={form.type}
                    onChange={handleChange("type")}
                    error={!!errors.type}
                    helperText={errors.type}
                    options={accountTypes.map((type) => ({
                        value: type,
                        label: type,
                    }))}
                />
            </CFormGrid>

            <CFormGrid size={{ xs: 12, sm: 4 }}>
                <CTextField
                    label="Position"
                    id="position"
                    name="position"
                    value={form.position}
                    onChange={handleChange("position")}
                    error={!!errors.position}
                    helperText={errors.position}
                />
            </CFormGrid>
        </CFormRow>
    );
};

export default FormUser;
