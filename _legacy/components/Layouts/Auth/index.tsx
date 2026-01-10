import { Preloader } from "konsta/react";
import { useSession } from "next-auth/react";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect } from "react";
import CopyrightFooter from "../CopyrightFooter";

const Spinner = ({ text }: { text?: string }) => (
  <div className="text-center">
    <Preloader color="primary" />
    <div>{text || "Loading"}</div>
  </div>
);

export default function AuthLayout({
  title,
  header,
  children,
  redirectIfauthenticated = false
}: {
  title?: string;
  header?: JSX.Element | JSX.Element[];
  children: JSX.Element | JSX.Element[];
  redirectIfauthenticated?: boolean;
}) {
  const router = useRouter();
  const { status } = useSession();
  let component: JSX.Element | JSX.Element[] = <Spinner />;
  if (status === "unauthenticated") {
    component = children;
  } else if (status === "authenticated") {
    component = redirectIfauthenticated ? (
      <Spinner text="Redirecting..." />
    ) : (
      children
    );
  }
  useEffect(() => {
    if (redirectIfauthenticated && status === "authenticated") {
      const callbackUrl =
        (Array.isArray(router.query?.callbackUrl)
          ? router.query?.callbackUrl[0]
          : router.query?.callbackUrl) || "/";
      router.push(callbackUrl);
    }
  }, [status, router.query?.callbackUrl]);

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
        <div>{component}</div>
        <CopyrightFooter className="text-sm" />
      </section>
    </>
  );
}
