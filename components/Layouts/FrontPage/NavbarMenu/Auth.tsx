import Link from "next/link";
import { signIn } from "next-auth/react";
import { Button } from "konsta/react";
import { useRouter } from "next/router";

export default function FrontPageNavbarMenuAuth() {
  const router = useRouter();
  return (
    <div className="flex gap-2">
      <Button component="a" className="px-6" colors={{
          text: "text-bars-material-dark dark:text-bars-material-light"
        }} small onClick={() => signIn()}>
        Login
      </Button>
    </div>
  );
}
