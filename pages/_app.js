import '../styles/global.css';
import { Provider as ReduxProvider } from 'react-redux';
import store from '../redux/store';

/** @param { import("next/app").AppProps } param0 */
function App({ Component, pageProps }) {
  return (
    <ReduxProvider store={store}>
      <Component {...pageProps} />
    </ReduxProvider>
  );
}
export default App;
