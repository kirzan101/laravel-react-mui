import { useEffect, useMemo, useRef, useState } from "react";

import {
    Alert,
    Box,
    Checkbox,
    FormControlLabel,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography,
    Paper,
} from "@mui/material";

const permissionTypes = ["view", "create", "update", "delete"];

const TablePermissionList = ({
    selectedPermissions = [],
    onChange,
    permissions = [],
    moduleLists = [],
    errors = {},
    rolePermissions = [],
}) => {
    /*
    |--------------------------------------------------------------------------
    | Disabled permissions
    |--------------------------------------------------------------------------
    */
    const disabledPermissions = useMemo(() => {
        return permissions
            .filter((item) => item.is_active === false || item.is_active === 0)
            .map((item) => item.id);
    }, [permissions]);

    /*
    |--------------------------------------------------------------------------
    | Initialize selected permissions
    |--------------------------------------------------------------------------
    */
    const hasInitialized = useRef(false);

    useEffect(() => {
        if (!hasInitialized.current && rolePermissions?.length > 0) {
            const activePermissions = rolePermissions
                .filter((p) => p.is_active === true || p.is_active === 1)
                .map((p) => p.permission_id);

            onChange(activePermissions);

            hasInitialized.current = true;
        }
    }, [rolePermissions]);

    /*
    |--------------------------------------------------------------------------
    | Get permission item
    |--------------------------------------------------------------------------
    */
    const permissionItem = (module, type) => {
        return permissions.find(
            (item) => item.module === module && item.type === type,
        );
    };

    /*
    |--------------------------------------------------------------------------
    | Get active permissions by module
    |--------------------------------------------------------------------------
    */
    const activeModulePermissions = (module) => {
        return permissionTypes
            .map((type) => permissionItem(module, type))
            .filter(
                (permission) =>
                    permission &&
                    (permission.is_active === true ||
                        permission.is_active === 1),
            );
    };

    /*
    |--------------------------------------------------------------------------
    | Check if all active permissions selected
    |--------------------------------------------------------------------------
    */
    const isChecked = (module) => {
        const activePermissions = activeModulePermissions(module);

        if (activePermissions.length === 0) {
            return false;
        }

        return activePermissions.every((permission) =>
            selectedPermissions.includes(permission.id),
        );
    };

    /*
    |--------------------------------------------------------------------------
    | Check if partially selected
    |--------------------------------------------------------------------------
    */
    const isIndeterminate = (module) => {
        const activePermissions = activeModulePermissions(module);

        const selectedCount = activePermissions.filter((permission) =>
            selectedPermissions.includes(permission.id),
        ).length;

        return selectedCount > 0 && selectedCount < activePermissions.length;
    };

    /*
    |--------------------------------------------------------------------------
    | Toggle all permissions
    |--------------------------------------------------------------------------
    */
    const toggleAllPermissions = (module) => {
        const activePermissions = activeModulePermissions(module).map(
            (p) => p.id,
        );

        const allSelected = activePermissions.every((id) =>
            selectedPermissions.includes(id),
        );

        if (allSelected) {
            onChange(
                selectedPermissions.filter(
                    (id) => !activePermissions.includes(id),
                ),
            );
        } else {
            onChange([
                ...new Set([...selectedPermissions, ...activePermissions]),
            ]);
        }
    };

    /*
    |--------------------------------------------------------------------------
    | Toggle single permission
    |--------------------------------------------------------------------------
    */
    const togglePermission = (permissionId) => {
        if (selectedPermissions.includes(permissionId)) {
            onChange(selectedPermissions.filter((id) => id !== permissionId));
        } else {
            onChange([...selectedPermissions, permissionId]);
        }
    };

    return (
        <Box>
            {errors?.permissions && (
                <Alert severity="error" sx={{ mb: 2 }}>
                    {errors.permissions}
                </Alert>
            )}

            <Typography variant="h6" sx={{ mb: 2 }}>
                Permissions
            </Typography>

            <TableContainer component={Paper}>
                <Table size="small">
                    <TableHead>
                        <TableRow>
                            <TableCell>Module</TableCell>

                            <TableCell>All</TableCell>

                            {permissionTypes.map((type) => (
                                <TableCell key={type}>
                                    {type.charAt(0).toUpperCase() +
                                        type.slice(1)}
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>

                    <TableBody>
                        {moduleLists.map((module) => (
                            <TableRow key={module.id || module}>
                                <TableCell>{module.name || module}</TableCell>

                                <TableCell>
                                    <Checkbox
                                        color="primary"
                                        checked={isChecked(module)}
                                        indeterminate={isIndeterminate(module)}
                                        onChange={() =>
                                            toggleAllPermissions(module)
                                        }
                                    />
                                </TableCell>

                                {permissionTypes.map((type) => {
                                    const permission = permissionItem(
                                        module,
                                        type,
                                    );

                                    return (
                                        <TableCell key={type}>
                                            <Checkbox
                                                color="primary"
                                                disabled={
                                                    !permission?.is_active
                                                }
                                                checked={selectedPermissions.includes(
                                                    permission?.id,
                                                )}
                                                onChange={() =>
                                                    togglePermission(
                                                        permission.id,
                                                    )
                                                }
                                            />
                                        </TableCell>
                                    );
                                })}
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    );
};

export default TablePermissionList;
