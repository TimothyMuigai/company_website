import { redirect } from "next/navigation";
/** Redirect legacy industry entry to the financial-services sector until an index page is introduced. */
export default function IndustriesPage() { redirect("/industries/financial-services"); }
