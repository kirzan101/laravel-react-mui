import { CTextField, CFormGrid, CFormRow, CSwitchLabeled } from "@/Components";
import { Grid } from "@mui/material";
import { useState } from "react";

const FormRole = ({ form, setForm, errors = {}, permissions, moduleLists }) => {
    const handleChange = (field) => (e) => {
        setForm((prev) => ({
            ...prev,
            [field]: e.target.value,
        }));
    };

    return (
        <CFormRow>
            <CFormGrid size={{ xs: 12, md: 6 }}>
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
            <CFormGrid size={{ xs: 12, md: 6 }}>
                <CSwitchLabeled
                    label="Active"
                    checked={form.is_active}
                    onChange={(e) =>
                        setForm((prev) => ({
                            ...prev,
                            is_active: e.target.checked,
                        }))
                    }
                />
            </CFormGrid>
            <CFormGrid>
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

export default FormRole;
