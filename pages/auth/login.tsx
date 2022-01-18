import TextInput from "@/components/Form/Input";
import AuthLayout from "@/components/Layouts/Auth";
import Link from "next/link";
import { Button, Card } from "konsta/react";
import { useForm } from "react-hook-form";
import { signIn } from "next-auth/react";

type formInputValues = {
  email: string;
  password: string;
}
export default function PageLogin() {
  const { register, handleSubmit } = useForm<formInputValues>();
  return (
    <AuthLayout title={"Login"} redirectIfauthenticated={true}>
      <Card
        component="form"
        className="min-w-[320px] sm:min-w-[480px] p-2 relative"
        onSubmit={handleSubmit((data) => signIn("credentials", data))}
        // @ts-expect-error
        method="POST"
      >
        <TextInput
          type="email"
          label="Email"
          className="mb-4"
          {...register("email", { required: true })}
        />
        <TextInput
          type="password"
          label="Password"
          className="mb-4"
          {...register("password", { required: true })}
        />
        <div className="grid grid-cols-2 items-center mb-4 text-sm">
          <div>
            <Link href="/auth/forgot-password">
              <a className="text-primary hover:underline font-bold">
                Forgot Password
              </a>
            </Link>
          </div>
          <Button raised>Sign In</Button>
        </div>
      </Card>
    </AuthLayout>
  );
}
