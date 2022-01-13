import TextInput from "@/components/Form/Input";
import AuthLayout from "@/components/Layouts/Auth";
import Link from "next/link";
import { Button, Card, Preloader, Progressbar } from "konsta/react";
import { useForm } from "react-hook-form";
import { signIn, useSession } from "next-auth/react";
import { useEffect } from "react";
import { useRouter } from "next/router";

export default function PageLogin() {
  const { register, handleSubmit } = useForm({
    defaultValues: {
      email: "",
      password: ""
    }
  });
  const session = useSession();
  const router = useRouter();
  useEffect(() => {
    if (session.status === "authenticated") {
      const callbackUrl = router.query?.callbackUrl;
      if (callbackUrl) {
        router.push(callbackUrl);
      } else {
        router.push("/");
      }
    }
  }, [session]);
  const spinner = (
    <div className="text-center">
      <Preloader color="primary" />
      <div>Checking session</div>
    </div>
  );
  return (
    <AuthLayout title={"Login"}>
      <Card className="min-w-[320px] sm:min-w-[480px] p-2 relative">
        {session.status === "loading" && spinner}
        {session.status === "authenticated" && spinner}
        {session.status === "unauthenticated" && (
          <>
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
                <Link href="/auth/register">
                  <a className="text-primary hover:underline font-bold">
                    Sign Up
                  </a>
                </Link>
              </div>
              <Button raised type="button" onClick={handleSubmit(data => signIn("credentials", data))}>
                Sign In
              </Button>
            </div>
          </>
        )}
      </Card>
    </AuthLayout>
  );
}
