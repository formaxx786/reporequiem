import "./globals.css";
import Header from "@/components/Header";

export const metadata = {
  title: "RepoRequiem",
  description: "Not shipped. Not wasted.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Header />
        {children}
        <footer className="border-t border-[var(--color-border)] mt-24">
          <div className="max-w-6xl mx-auto px-6 py-10 text-center text-[var(--color-muted)]">
            RepoRequiem — Not shipped. Not wasted.
          </div>
        </footer>
      </body>
    </html>
  );
}
