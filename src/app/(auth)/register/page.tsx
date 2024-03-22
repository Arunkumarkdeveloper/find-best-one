import authOptions from "@/backend/authOptions";
import RegisterForm from "@/components/authentication/RegisterForm";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { Metadata } from "next";
import { API_URL } from "@/frontend/Path";

export const metadata: Metadata = {
  title: "Register",
  description: "This is the register page for findbestone.com",
  keywords: [
    "findbestone",
    "findbestone.com",
    "find",
    "best",
    "one",
    "product",
    "offers",
    "good",
    "findbest",
    "findone",
    "bestone",
    "register",
  ],
  robots: {
    index: true,
    follow: true,
    nocache: true,
    googleBot: {
      index: true,
      follow: false,
      noimageindex: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: `${API_URL}/register`,
    languages: {
      "en-US": `${API_URL}/register`,
      "de-DE": `${API_URL}/register`,
    },
  },
  openGraph: {
    title: "Register",
    description: "This is the register page for findbestone.com",
    url: `${API_URL}/register`,
    siteName: "findbestone.com",
    locale: "en_US",
    type: "article",
    authors: ["Arunkumarkdeveloper"],
  },
  twitter: {
    card: "summary_large_image",
    site: "findbestone.com",
    title: "Register",
    description: "This is the register page for findbestone.com",
    creator: "Arunkumarkdeveloper",
  },
};

export default async function page() {
  const session = await getServerSession(authOptions);

  if (session) redirect("/login");

  return <RegisterForm />;
}
