import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "User Dashboard",
  description:
    "Discover, share, and explore travel stories, tips, and guides from a community of travel enthusiasts. Plan your next adventure with expert advice and unique insights into destinations around the world.",
};

export default function UserDashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <div className="flex min-h-screen">
      <main className="flex-1 p-2 md:p-6">{children}</main>
    </div>
  );
}