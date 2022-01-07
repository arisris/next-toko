import "../styles/global.css";
import { Provider as ReduxProvider } from "react-redux";
import { SessionProvider } from "next-auth/react";
import store from "../redux/store";

/** @param { import("next/app").AppProps } param0 */
function App({ Component, pageProps: { session, ...pageProps } }) {
  return (
    <SessionProvider session={session}>
      <ReduxProvider store={store}>
        <Component {...pageProps} />
      </ReduxProvider>
    </SessionProvider>
  );
}
export default App;
