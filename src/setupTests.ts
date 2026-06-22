import "@testing-library/jest-dom";
import { vi } from "vitest";

vi.mock("@/i18n/navigation", () => ({
  Link: "a",
  useRouter: () => ({ refresh: vi.fn(), replace: vi.fn() }),
  usePathname: () => "/",
}));

vi.mock("next-intl", () => ({
  NextIntlClientProvider: ({ children }: { children: React.ReactNode }) =>
    children,
  useTranslations: () => (key: string) => {
    const translations: Record<string, string> = {
      title: "About This Application",
      authorTitle: "Author Information",
      developerLabel: "Developer:",
      projectGoalLabel: "Project Goal:",
      courseCreditsTitle: "Course Credits",
      builtAsPart: "built as part of",
    };
    return translations[key] || key;
  },
}));
