import { redirect } from "next/navigation";

/** Sends the admin entry route to the property management table. */
export default function AdminPage() {
  redirect("/admin/properties");
}
