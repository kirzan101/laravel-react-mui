// =============================================================================
// BARREL EXPORT FILE
// =============================================================================
//
// Purpose:
// This file acts as a central export hub ("barrel export") for reusable
// components and layouts.
//
// Instead of importing components using long paths like:
//
// import CButton from "@/Components/Customs/Buttons/CButton";
//
// we can simply do:
//
// import { CButton, AppLayout } from "@/Components";
//
// Benefits:
// - Cleaner and shorter imports
// - Easier refactoring (change paths in one place only)
// - Better organization for reusable UI components
// - Similar developer experience to Vue global components,
//   but follows React best practices
// =============================================================================

// Customs Components start

// Alerts
export { default as CAlert } from "./Customs/Alerts/CAlert";
export { default as CAlertError } from "./Customs/Alerts/CAlertError";

// Boxes
export { default as CBox } from "./Customs/Boxes/CBox";

// Buttons
export { default as CButton } from "./Customs/Buttons/CButton";

// TextFields
export { default as CTextField } from "./Customs/TextFields/CTextField";

// Customs Components end

// Layouts
export { default as AppLayout } from "../Layouts/AppLayout";
export { default as EmptyLayout } from "../Layouts/EmptyLayout";

// Utilities
export { default as ThemeButton } from "./Utilities/ThemeButton";
