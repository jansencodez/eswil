import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Header from "./components/Header";
import '@fortawesome/fontawesome-free/css/all.min.css';

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Eswil Preparatory School",
  description: "One of the best preparatory schools in kenya",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta name="google-site-verification" content="NX1kZYUGK2EopVmXMixt1jGMnWTCVDMfnrRlCHL9bQQ" />
        <meta name="description" content="Welcome to Eswil Preparatory School(TEPS)" />
        <meta name="keywords" content="eswil, eswil munami, eswil school, eswil preparatory school, preparatory schools kenyan schools, schools" />
        <meta property="og:Eswil" content="Home - Eswil" />
        <meta property="og:description" content="Join us today!" />
        <meta property="og:url" content="https://eswil.vercel.app/" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Header/>
        {children}
        
      </body>
    </html>
  );
}
