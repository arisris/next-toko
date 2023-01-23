import "@/styles/global.css";
import { StoreContext } from "storeon/react";
import { SessionProvider, useSession } from "next-auth/react";
import { App as KonstaApp, Card, Page, Preloader } from "konsta/react";
import store from "@/store/index";
import { AppProps, NextComponentTypeWithProps } from "next/app";
import { ReactElement } from "react";
import { trpc } from "@/lib/trpc";
import { configResponsive } from "ahooks";
import screenSize from "@/lib/screen-size";
import { UseHeadlessuiDialogContextProvider } from "@/lib/hooks/useHeadlessuiDialog";
import { ToastContextProvider } from "@/lib/hooks/useToast";
import Overlays from "@/components/Layouts/Overlays";
import { MdAppRegistration } from "react-icons/md";

configResponsive(screenSize);
function App({ Component, ...props }: AppProps) {
	// force required authentication for /admin path
	if (props.router.asPath.startsWith("/admin")) {
		if (!Component.protected) {
			Component.protected = true;
		}
	}
	const pageProps = props?.pageProps ?? {};
	return (
		<SessionProvider session={pageProps?.session}>
			<StoreContext.Provider value={store}>
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
		required: !isFn,
	});

	// rome-ignore lint/complexity/noExtraBooleanCast: <explanation>
	if (!!session?.data?.user) return children;

	return isFn ? (
		// @ts-ignore
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

export default trpc.withTRPC(App);
