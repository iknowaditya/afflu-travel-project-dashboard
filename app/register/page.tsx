import AuthForm from "@/components/AuthForm";

export default function RegisterPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-2xl font-bold mb-4">Register</h1>
      <AuthForm mode="register" />
    </div>
  );
}
