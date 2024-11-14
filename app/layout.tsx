import type { Metadata } from "next";
import "./globals.css";
import Header from "../components/Common/Header";
import "@fortawesome/fontawesome-free/css/all.min.css";

export const metadata: Metadata = {
  title: "Eswil Preparatory School",
  description: "One of the best preparatory schools in Kenya",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta
          name="google-site-verification"
          content="NX1kZYUGK2EopVmXMixt1jGMnWTCVDMfnrRlCHL9bQQ"
        />
        <meta name="google-adsense-account" content="ca-pub-4394790876666238" />
        <meta
          name="description"
          content="Welcome to Eswil Preparatory School(TEPS)"
        />
        <meta
          name="keywords"
          content="eswil, eswil munami, eswil school, eswil preparatory school, preparatory schools kenyan schools, schools"
        />
        <meta property="og:Eswil" content="Home - Eswil" />
        <meta property="og:description" content="Join us today!" />
        <meta property="og:url" content="https://eswil.vercel.app/" />
      </head>
      <body>
        {/* Wrap with UpdatesProvider */}

        <Header />
        {children}
      </body>
    </html>
  );
}
