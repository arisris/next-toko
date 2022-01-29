import Link from "next/link";
import { signIn } from "next-auth/react";
import { Button } from "konsta/react";
import { useRouter } from "next/router";

export default function FrontPageNavbarMenuAuth() {
  const router = useRouter();
  return (
    <div className="flex gap-2">
      <Button component="a" className="px-6" small onClick={() => signIn()}>
        Login
      </Button>
    </div>
  );
}
