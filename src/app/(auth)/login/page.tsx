import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import LoginForm from "@/components/authentication/LoginForm";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function page() {
  const session = await getServerSession(authOptions);

  if (session) {
    redirect("/dashboard");
  }
  return (
    <div>
      <LoginForm />
    </div>
  );
}