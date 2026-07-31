import { useMemo } from "react";
import { Alert, Box, Typography } from "@mui/material";
import { CSelectMultiple } from "@/Components";

const PERMISSION_TYPE_ORDER = ["view", "create", "update", "delete"];

const formatLabel = (value = "") =>
    value
        .toString()
        .replace(/_/g, " ")
        .replace(/\b\w/g, (char) => char.toUpperCase());

/**
 * Multi-select field used to assign permissions to a role.
 *
 * Replaces the previous tabular checkbox UI. Selecting/deselecting a
 * permission here simply adds/removes it from the `permissionIds` array,
 * which the backend then translates into creating/deleting the
 * corresponding role_permission record (no `is_active` flag involved).
 */
const SelectRolePermissions = ({
    selectedPermissions = [],
    onChange,
    permissions = [],
    moduleLists = [],
    errors = {},
}) => {
    const options = useMemo(() => {
        const modules = moduleLists.map((module) => module.name || module);

        return permissions
            .filter((permission) => permission.is_active)
            .slice()
            .sort((a, b) => {
                const moduleDiff =
                    modules.indexOf(a.module) - modules.indexOf(b.module);

                if (moduleDiff !== 0) return moduleDiff;

                return (
                    PERMISSION_TYPE_ORDER.indexOf(a.type) -
                    PERMISSION_TYPE_ORDER.indexOf(b.type)
                );
            })
            .map((permission) => ({
                value: permission.id,
                label: `${formatLabel(permission.module)} - ${formatLabel(
                    permission.type,
                )}`,
            }));
    }, [permissions, moduleLists]);

    const handleChange = (event) => {
        const { value } = event.target;

        onChange(typeof value === "string" ? value.split(",") : value);
    };

    return (
        <Box>
            <Typography variant="h6" sx={{ mb: 2 }}>
                Permissions
            </Typography>

            {errors?.permissionIds && (
                <Alert severity="error" sx={{ mb: 2 }}>
                    {errors.permissionIds}
                </Alert>
            )}

            <CSelectMultiple
                name="permissionIds"
                label="Permissions"
                options={options}
                value={selectedPermissions}
                onChange={handleChange}
                error={!!errors.permissionIds}
                helperText={
                    errors.permissionIds ||
                    "Select the permissions to grant to this role."
                }
            />
        </Box>
    );
};

export default SelectRolePermissions;
