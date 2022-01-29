import "@/styles/global.css";
import { StoreContext } from "storeon/react";
import { SessionProvider } from "next-auth/react";
import { App as KonstaApp } from "konsta/react";
import store from "@/store/index";
import { AppProps } from "next/app";
import { useMemo } from "react";
import { createQueryClient, createTrpcClient, trpc } from "@/lib/trpc";
import { QueryClientProvider } from "react-query";

function App({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  const queryClient = useMemo(() => createQueryClient(), [session]);
  const trpcClient = useMemo(() => createTrpcClient(), [session]);
  return (
    <SessionProvider session={session}>
      <StoreContext.Provider value={store}>
        <trpc.Provider client={trpcClient} queryClient={queryClient}>
          <QueryClientProvider client={queryClient}>
            <KonstaApp theme="material" safeAreas={true}>
              <Component {...pageProps} />
            </KonstaApp>
          </QueryClientProvider>
        </trpc.Provider>
      </StoreContext.Provider>
    </SessionProvider>
  );
}
export default App;
