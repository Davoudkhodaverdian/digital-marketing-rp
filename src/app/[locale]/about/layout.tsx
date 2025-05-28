import { Metadata } from "next";
export const metadata: Metadata = {
  title: "About us",
  description: "About us",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  return (<>{children}</>);
}