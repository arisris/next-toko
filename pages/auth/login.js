import FormInput from "@/components/Form/Input";
import AuthLayout from "@/components/Layouts/Auth";
import Link from "next/link";
import { Button, Card } from "konsta/react";

export default function PageLogin() {
  return (
    <AuthLayout>
      <Card className="min-w-[320px] sm:min-w-[480px] p-2">
        <FormInput
          type="text"
          name="email"
          label="Email"
          className="mb-4"
          autoComplete="new-email"
        />
        <FormInput
          type="password"
          name="password"
          label="Password"
          className="mb-4"
          autoComplete="new-password"
        />
        <div className="grid grid-cols-2 items-center mb-4 text-sm">
          <div>
            <Link href="/auth/register">
              <a className="text-green-500 hover:underline font-bold">
                Sign Up
              </a>
            </Link>
          </div>
          <Button
            raised
            type="button"
            className="bg-green-500 text-white text-center p-2"
          >
            Sign In
          </Button>
        </div>
      </Card>
    </AuthLayout>
  );
}
