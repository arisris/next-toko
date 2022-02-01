import "@/styles/global.css";
import { StoreContext } from "storeon/react";
import { SessionProvider, useSession } from "next-auth/react";
import { App as KonstaApp, Card, Page, Preloader } from "konsta/react";
import store from "@/store/index";
import { AppProps } from "next/app";
import { ReactElement, useEffect, useMemo } from "react";
import { createQueryClient, createTrpcClient, trpc } from "@/lib/trpc";
import { QueryClientProvider } from "react-query";
import { NextComponentType, NextPageContext } from "next";
import { configResponsive } from "ahooks";
import screenSize from "@/lib/screen-size";
import Overlays from "@/components/Overlays";

type NextComponentTypeWithProps = NextComponentType & {
  protected?: any;
};
configResponsive(screenSize);
function App({
  Component,
  ...props
}: AppProps & {
  Component: NextComponentTypeWithProps;
}) {
  const pageProps = props?.pageProps ?? {};
  const queryClient = useMemo(() => createQueryClient(), [pageProps?.session]);
  const trpcClient = useMemo(() => createTrpcClient(), [pageProps?.session]);
  return (
    <SessionProvider session={pageProps?.session}>
      <StoreContext.Provider value={store}>
        <trpc.Provider client={trpcClient} queryClient={queryClient}>
          <QueryClientProvider client={queryClient}>
            <KonstaApp theme="material" safeAreas={true} dark={true}>
              {Component.protected ? (
                <AuthorizePage Component={Component} {...pageProps}>
                  <Component {...pageProps} />
                </AuthorizePage>
              ) : (
                <Component {...pageProps} />
              )}
            </KonstaApp>
          </QueryClientProvider>
        </trpc.Provider>
      </StoreContext.Provider>
    </SessionProvider>
  );
}

function AuthorizePage({
  children,
  Component,
  ...props
}: {
  children: ReactElement;
  Component: NextComponentTypeWithProps;
}) {
  const session = useSession({
    required: typeof Component.protected === "boolean" ? true : false
  });

  if (!!session?.data?.user) return children;

  return typeof Component.protected === "function" ? (
    Component.protected(children, props)
  ) : (
    <Page className="flex justify-center items-center">
      <Overlays show={true} className={"absolute z-10"} />
      <Card className="z-20 text-center px-8">
        <Preloader size="w-10" />
        <p className="mt-4 font-black text-primary">Loading...</p>
      </Card>
    </Page>
  );
}

export default App;
