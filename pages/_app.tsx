import "../styles/globals.css";
import { NextUIProvider, createTheme } from "@nextui-org/react";
import type { AppProps } from "next/app";
import { FC } from "react";

const darkTheme = createTheme({
	type: "dark",
});

const App: FC<AppProps> = ({ Component, pageProps }) => {
	return (
		<NextUIProvider theme={darkTheme}>
			<Component {...pageProps} />
		</NextUIProvider>
	);
};

export default App;
