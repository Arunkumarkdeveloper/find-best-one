import authOptions from "@/backend/authOptions";
import LoginForm from "@/components/authentication/LoginForm";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { Metadata } from "next";
import { API_URL } from "@/frontend/Path";

export const metadata: Metadata = {
  title: "Login",
  description: "This is the login page for findbestone.com",
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
    "login",
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
    canonical: `${API_URL}/login`,
    languages: {
      "en-US": `${API_URL}/login`,
      "de-DE": `${API_URL}/login`,
    },
  },
  openGraph: {
    title: "Login",
    description: "This is the login page for findbestone.com",
    url: `${API_URL}/login`,
    siteName: "findbestone.com",
    locale: "en_US",
    type: "article",
    authors: ["Arunkumarkdeveloper"],
  },
  twitter: {
    card: "summary_large_image",
    site: "findbestone.com",
    title: "Login",
    description: "This is the login page for findbestone.com",
    creator: "Arunkumarkdeveloper",
  },
};

export default async function page() {
  const session = await getServerSession(authOptions);

  if (session) {
    redirect("/");
  }
  return (
    <div>
      <LoginForm />
    </div>
  );
}
