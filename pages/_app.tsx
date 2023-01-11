import "../styles/globals.css";
import { FC, ReactElement } from "react";
import { NextUIProvider, createTheme } from "@nextui-org/react";
import type { AppProps } from "next/app";
import { NextPage } from "next";

// eslint-disable-next-line @typescript-eslint/ban-types
export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
	getLayout?: (page: ReactElement, props: P) => ReactElement;
};

type AppPropsWithLayout = AppProps & {
	Component: NextPageWithLayout;
};

const darkTheme = createTheme({
	type: "dark",
});

const App: FC<AppPropsWithLayout> = ({ Component, pageProps }) => {
	const getLayout = Component.getLayout ?? ((page): ReactElement => page);
	return getLayout(
		<NextUIProvider theme={darkTheme}>
			<Component {...pageProps} />
		</NextUIProvider>,
		pageProps,
	);
};

export default App;
