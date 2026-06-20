import { CTextField, CFormGrid, CFormRow } from "@/Components";
import { Grid } from "@mui/material";
import { useState } from "react";

const FormUserGroup = ({ form, setForm, errors = {} }) => {
    const handleChange = (field) => (e) => {
        setForm((prev) => ({
            ...prev,
            [field]: e.target.value,
        }));
    };

    return (
        <CFormRow>
            <CFormGrid size={{ xs: 12 }}>
                <CTextField
                    label="Name"
                    id="name"
                    name="name"
                    value={form.name}
                    onChange={handleChange("name")}
                    error={!!errors.name}
                    helperText={errors.name}
                />
            </CFormGrid>
            <CFormGrid size={{ xs: 12 }}>
                <CTextField
                    label="Code"
                    id="code"
                    name="code"
                    value={form.code}
                    onChange={handleChange("code")}
                    error={!!errors.code}
                    helperText={errors.code}
                />
            </CFormGrid>
            <CFormGrid size={{ xs: 12 }}>
                <CTextField
                    label="Description"
                    id="description"
                    name="description"
                    value={form.description}
                    onChange={handleChange("description")}
                    error={!!errors.description}
                    helperText={errors.description}
                    multiline
                    rows={4}
                />
            </CFormGrid>
        </CFormRow>
    );
};

export default FormUserGroup;
