import "../styles/global.css";
import { Provider as ReduxProvider } from "react-redux";
import { SessionProvider } from "next-auth/react";
import { App as KonstaApp } from "konsta/react";
import store from "../redux/store";
import { AppProps } from "next/app";

function App({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    <SessionProvider session={session}>
      <ReduxProvider store={store}>
        <KonstaApp theme="material" safeAreas={true}>
          <Component {...pageProps} />
        </KonstaApp>
      </ReduxProvider>
    </SessionProvider>
  );
}
export default App;
