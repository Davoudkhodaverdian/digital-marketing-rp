import LoginLayout from "@/components/common/layout";
import Login from "@/components/login";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: "login page",
  description: "login page",
};
export default function HomePage() {

  return (
    <LoginLayout>
      <Login />
    </LoginLayout>
  );
}