import { useSession } from "next-auth/react";
import Head from "next/head";
import Router from "next/router";
import { useEffect } from "react";
import CopyrightFooter from "../CopyrightFooter";

export default function AuthLayout({ title, header, children, redirectIfauthenticated = false }: {
  title?: string;
  header?: JSX.Element | JSX.Element[];
  children: JSX.Element | JSX.Element[];
  redirectIfauthenticated?: boolean
}) {
  const session = useSession();
  useEffect(() => {
    if (redirectIfauthenticated && session?.status === "authenticated") {
      Router.push("/");
    }
  }, [redirectIfauthenticated, session.status])
  return (
    <>
      <Head>
        <title>{title || "Authentication"}</title>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=1.0"
        />
      </Head>
      <section className="absolute flex flex-col gap-8 justify-between items-center w-full h-full py-8">
        <div>{header}</div>
        <div>{children}</div>
        <CopyrightFooter className="text-sm" />
      </section>
    </>
  );
}
