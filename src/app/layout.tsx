import { PrismicPreview } from "@prismicio/next";
import { repositoryName } from "@/prismicio";
import "@/app/globals.css";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </head>
      <body className="">
        <div className="p-4">{children}</div>
      </body>
      <PrismicPreview repositoryName={repositoryName} />
    </html>
  );
}
