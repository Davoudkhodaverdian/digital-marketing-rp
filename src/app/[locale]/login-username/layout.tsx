import LoginLayout from "@/components/common/layout";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: "login - username",
  description: "login - username",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  return (<LoginLayout>{children}</LoginLayout>);
}