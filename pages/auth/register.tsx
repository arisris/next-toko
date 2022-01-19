import TextInput from "@/components/Form/Input";
import AuthLayout from "@/components/Layouts/Auth";
import { Button, Card } from "konsta/react";
import Link from "next/link";
import { FieldValue, FieldValues, SubmitHandler, useForm } from "react-hook-form";

type formInputValues = {
  name: string;
  email: string;
  password: string;
  password_confirmation: string
}
export default function PageRegister() {
  const { register, handleSubmit } = useForm<formInputValues>();
  const onSubmit : SubmitHandler<formInputValues> = (data) => {
    console.log(data);
  };
  return (
    <AuthLayout title={"Register"} redirectIfauthenticated={true}>
      <Card
        component="form"
        className="min-w-[320px] sm:min-w-[480px] p-2"
        onSubmit={handleSubmit(onSubmit)}
        // @ts-expect-error
        method="POST"
      >
        <TextInput
          type="username"
          label="Name"
          className="my-4"
          autoComplete="new-username"
          {...register("name", { required: true })}
        />
        <TextInput
          type="email"
          label="Email"
          className="mb-4"
          autoComplete="new-email"
          {...register("email", { required: true })}
        />
        <TextInput
          type="password"
          label="Password"
          className="mb-4"
          autoComplete="new-password"
          {...register("password", { required: true })}
        />
        <TextInput
          type="password"
          label="Confirm Password"
          className="mb-4"
          autoComplete="new-password"
          {...register("password_confirmation", { required: true })}
        />
        <div className="grid grid-cols-2 items-center mb-4 text-sm">
          <div>
            <Link href="/auth/login">
              <a className="text-primary hover:underline font-bold">Sign In</a>
            </Link>
          </div>
          <Button raised className="bg-primary text-white text-center p-2">
            Sign Up
          </Button>
        </div>
      </Card>
    </AuthLayout>
  );
}
