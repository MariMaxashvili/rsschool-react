import type { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import {
  getMessages,
  getTranslations,
  setRequestLocale,
} from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { Link } from "@/i18n/navigation";
import { ROUTES } from "@/constants";
import { Providers } from "./providers";
import { ThemeToggle } from "@/components/ThemeToggle/ThemeToggle";
import { LanguageSwitcher } from "@/components/LanguageSwitcher/LanguageSwitcher";
import "./globals.css";
import "@/App.css";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export const metadata: Metadata = {
  title: "Pokemon Search",
  description: "Search and explore Pokemon using the PokeAPI",
};

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as "en" | "es")) {
    notFound();
  }

  setRequestLocale(locale);
  const t = await getTranslations("Layout");
  const messages = await getMessages();

  return (
    <html lang={locale} data-theme="light">
      <body>
        <NextIntlClientProvider locale={locale} messages={messages}>
          <Providers>
            <header className="header">
              <Link href={ROUTES.ABOUT} className="link">
                {t("aboutLink")}
              </Link>
              <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
                <LanguageSwitcher />
                <ThemeToggle />
              </div>
            </header>
            {children}
          </Providers>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
