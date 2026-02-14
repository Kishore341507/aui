import StaffReportForm from "./staff-report-form";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Staff Report - AUI Forms",
  description: "Submit a formal report regarding staff member conduct at AUI Discord",
};

export default function Page() {
  return <StaffReportForm />;
}