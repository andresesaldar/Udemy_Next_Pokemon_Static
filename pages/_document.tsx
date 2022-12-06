import Document, {
	DocumentContext,
	DocumentInitialProps,
	Head,
	Html,
	Main,
	NextScript,
} from "next/document";
import { Children } from "react";
import { CssBaseline } from "@nextui-org/react";

class AppDocument extends Document {
	static async getInitialProps(
		ctx: DocumentContext,
	): Promise<DocumentInitialProps> {
		const initialProps = await Document.getInitialProps(ctx);
		return {
			...initialProps,
			styles: Children.toArray([initialProps.styles]),
		};
	}

	render(): JSX.Element {
		return (
			<Html lang="en">
				<Head>{CssBaseline.flush()}</Head>
				<body>
					<Main />
					<NextScript />
				</body>
			</Html>
		);
	}
}

export default AppDocument;
