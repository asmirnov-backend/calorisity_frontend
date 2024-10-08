import clsx from "clsx";
import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <link href="/favicon.ico" rel="icon" />
      </Head>
      <body className={clsx("green text-foreground bg-background")}>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
