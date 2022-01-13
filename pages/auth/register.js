import FormInput from "@/components/Form/Input";
import AuthLayout from "@/components/Layouts/Auth";
import { Button, Card } from "konsta/react";
import Link from "next/link";

export default function PageRegister() {
  return (
    <AuthLayout>
      <Card className="min-w-[320px] sm:min-w-[480px] p-2">
        <FormInput type="username" name="username" label="Name" className="my-4" autoComplete="new-username" />
        <FormInput type="email" name="email" label="Email" className="mb-4" autoComplete="new-email" />
        <FormInput type="password" name="password" label="Password" className="mb-4" autoComplete="new-password" />
        <FormInput type="password" name="password_confirm" label="Confirm Password" className="mb-4" autoComplete="new-password" />
        <div className="grid grid-cols-2 items-center mb-4 text-sm">
          <div>
            <Link href="/auth/login">
              <a className="text-green-500 hover:underline font-bold">Sign In</a>
            </Link>
          </div>
          <Button raised type="button" className="bg-green-500 text-white text-center p-2">Sign Up</Button>
        </div>
      </Card>
    </AuthLayout>
  );
}
