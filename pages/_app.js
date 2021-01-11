import "tailwindcss/tailwind.css";
import Link from "next/link";

function MyApp({ Component, pageProps }) {
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
