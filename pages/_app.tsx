import "@/styles/global.css";
import { StoreContext } from "storeon/react";
import { SessionProvider, useSession } from "next-auth/react";
import { App as KonstaApp, Card, Page, Preloader } from "konsta/react";
import store from "@/store/index";
import { AppProps, NextComponentTypeWithProps } from "next/app";
import { ReactElement, useEffect, useMemo, useState } from "react";
import { createQueryClient, createTrpcClient, trpc } from "@/lib/trpc";
import { QueryClientProvider } from "react-query";
import { configResponsive } from "ahooks";
import screenSize from "@/lib/screen-size";
import { UseHeadlessuiDialogContextProvider } from "@/lib/hooks/useHeadlessuiDialog";
import { ToastContextProvider } from "@/lib/hooks/useToast";
import Overlays from "@/components/Layouts/Overlays";

configResponsive(screenSize);
function App({ Component, ...props }: AppProps) {
  // force required authentication for /admin path
  if (props.router.asPath.startsWith("/admin")) {
    if (!Component.protected) {
      Component.protected = true;
    }
  }
  const pageProps = props?.pageProps ?? {};
  const queryClient = useMemo(() => createQueryClient(), [pageProps?.session]);
  const trpcClient = useMemo(() => createTrpcClient(), [pageProps?.session]);
  return (
    <SessionProvider session={pageProps?.session}>
      <StoreContext.Provider value={store}>
        <trpc.Provider client={trpcClient} queryClient={queryClient}>
          <QueryClientProvider client={queryClient}>
            <KonstaApp theme="material" safeAreas={true} dark={true}>
              <UseHeadlessuiDialogContextProvider config={{ useRoot: true }}>
                <ToastContextProvider>
                  {Component.protected ? (
                    <AuthorizePage Component={Component} {...pageProps}>
                      <Component {...pageProps} />
                    </AuthorizePage>
                  ) : (
                    <Component {...pageProps} />
                  )}
                </ToastContextProvider>
              </UseHeadlessuiDialogContextProvider>
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
}: AppProps & {
  children: ReactElement;
  Component: NextComponentTypeWithProps;
}) {
  const isFn = typeof Component.protected === "function";
  const session = useSession({
    required: !isFn
  });

  if (!!session?.data?.user) return children;

  return isFn ? (
    Component.protected(children, props)
  ) : (
    <Page className="flex justify-center items-center">
      <Overlays show={true} className={"absolute z-10"} />
      <Card className="z-20 text-center px-8 shadow-none">
        <Preloader size="w-10" />
        <p className="mt-4 font-black text-primary">Loading...</p>
      </Card>
    </Page>
  );
}

export default App;
