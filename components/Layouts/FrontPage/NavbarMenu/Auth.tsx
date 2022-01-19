import Link from "next/link";
import { signIn } from "next-auth/react";
import { Button } from "konsta/react";
import { useRouter } from "next/router";

export default function FrontPageNavbarMenuAuth() {
  const router = useRouter();
  return (
    <div className="flex gap-2">
      <Link href={`/auth/register?callbackUrl=${router.asPath}`}>
        <Button component="a" className="px-6" small>
          Register
        </Button>
      </Link>
      <Link href={`/auth/login?callbackUrl=${router.asPath}`}>
        <Button
          component="a"
          className="px-6"
          colors={{
            text: "text-red-500",
            border: "border-red-500",
            bg: "bg-red-500",
            activeBg: "active:bg-red-500",
            activeBgDark: "active:bg-red-600"
          }}
          small
        >
          Login
        </Button>
      </Link>
    </div>
  );
}
