import type { AppProps } from "next/app";
import "tailwindcss/tailwind.css";
import Link from "next/link";
import { usePanelbear } from "../lib/panelbear";

function MyApp({ Component, pageProps }: AppProps) {
  usePanelbear(process.env.PANELBEAR_SITE_ID);
  return (
    <div className="mt-10 max-w-4xl mx-auto">
      <div className="font-sans text-3xl">
        <Link href="/">
          <a>Alan Harper</a>
        </Link>
      </div>
      <main>
        <div className="mt-10 max-w-4xl mx-auto">
          <Component {...pageProps} />
        </div>
      </main>
    </div>
  );
}

export default MyApp;
