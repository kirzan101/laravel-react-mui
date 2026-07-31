import { useMemo } from "react";
import {
    Alert,
    Box,
    Checkbox,
    Divider,
    FormControlLabel,
    FormGroup,
    Grid,
    Typography,
} from "@mui/material";
import { CCard, CCardContent } from "@/Components";

const PERMISSION_TYPE_ORDER = ["view", "create", "update", "delete"];

const formatLabel = (value = "") =>
    value
        .toString()
        .replace(/_/g, " ")
        .replace(/\b\w/g, (char) => char.toUpperCase());

/**
 * Field used to assign permissions to a role.
 *
 * Permissions are grouped by their module (e.g. "User Group", "User") so
 * every permission type (Create, Edit, View, Delete) belonging to that
 * module is displayed together as checkboxes. Selecting/deselecting a
 * permission simply adds/removes its id from the `permissionIds` array,
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
    const groupedPermissions = useMemo(() => {
        const modules = moduleLists.map((module) => module.name || module);

        const activePermissions = permissions
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
            });

        const groups = new Map();

        activePermissions.forEach((permission) => {
            const moduleKey = permission.module;

            if (!groups.has(moduleKey)) {
                groups.set(moduleKey, []);
            }

            groups.get(moduleKey).push(permission);
        });

        return Array.from(groups.entries()).map(([module, modulePermissions]) => ({
            module,
            label: formatLabel(module),
            permissions: modulePermissions,
        }));
    }, [permissions, moduleLists]);

    const handleTogglePermission = (permissionId) => (event) => {
        const { checked } = event.target;

        if (checked) {
            onChange([...selectedPermissions, permissionId]);
        } else {
            onChange(
                selectedPermissions.filter((id) => id !== permissionId),
            );
        }
    };

    const handleToggleGroup = (modulePermissions) => (event) => {
        const { checked } = event.target;
        const modulePermissionIds = modulePermissions.map(
            (permission) => permission.id,
        );

        if (checked) {
            onChange([
                ...selectedPermissions,
                ...modulePermissionIds.filter(
                    (id) => !selectedPermissions.includes(id),
                ),
            ]);
        } else {
            onChange(
                selectedPermissions.filter(
                    (id) => !modulePermissionIds.includes(id),
                ),
            );
        }
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

            <Grid container spacing={2}>
                {groupedPermissions.map(({ module, label, permissions: modulePermissions }) => {
                    const modulePermissionIds = modulePermissions.map(
                        (permission) => permission.id,
                    );
                    const selectedCount = modulePermissionIds.filter((id) =>
                        selectedPermissions.includes(id),
                    ).length;
                    const allSelected =
                        modulePermissionIds.length > 0 &&
                        selectedCount === modulePermissionIds.length;
                    const someSelected =
                        selectedCount > 0 && !allSelected;

                    return (
                    <Grid key={module} size={{ xs: 12, sm: 4 }}>
                        <CCard>
                            <CCardContent>
                                <Box
                                    sx={{
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "space-between",
                                        mb: 1,
                                    }}
                                >
                                    <Typography
                                        variant="subtitle1"
                                        sx={{ fontWeight: "bold" }}
                                    >
                                        {label}
                                    </Typography>

                                    <FormControlLabel
                                        sx={{ mr: 0 }}
                                        control={
                                            <Checkbox
                                                size="small"
                                                checked={allSelected}
                                                indeterminate={someSelected}
                                                onChange={handleToggleGroup(
                                                    modulePermissions,
                                                )}
                                            />
                                        }
                                        label="Select All"
                                    />
                                </Box>

                                <Divider sx={{ mb: 1 }} />

                                <FormGroup>
                                    {modulePermissions.map((permission) => (
                                        <FormControlLabel
                                            key={permission.id}
                                            control={
                                                <Checkbox
                                                    size="small"
                                                    checked={selectedPermissions.includes(
                                                        permission.id,
                                                    )}
                                                    onChange={handleTogglePermission(
                                                        permission.id,
                                                    )}
                                                />
                                            }
                                            label={`${label} - ${formatLabel(
                                                permission.type,
                                            )}`}
                                        />
                                    ))}
                                </FormGroup>
                            </CCardContent>
                        </CCard>
                    </Grid>
                    );
                })}
            </Grid>

            {!errors?.permissionIds && (
                <Typography
                    variant="caption"
                    color="text.secondary"
                    sx={{ mt: 1, display: "block" }}
                >
                    Select the permissions to grant to this role.
                </Typography>
            )}
        </Box>
    );
};

export default SelectRolePermissions;
