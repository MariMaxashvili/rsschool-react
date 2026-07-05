import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import "./About.css";

export default function AboutPage() {
  const t = useTranslations("AboutPage");

  return (
    <div className="about-page-container">
      <Link href="/" className="about-back-link">
        &larr; {t("backToDashboard") || "Back to Dashboard"}
      </Link>

      <div className="about-card">
        <h2>{t("title") || "About This Application"}</h2>
        <p>
          {t("description") ||
            "This is a responsive, reactive Pokémon dashboard designed to seamlessly view and manage item entries using the PokéAPI."}
        </p>

        <hr className="about-divider" />

        <h3>{t("authorTitle") || "Author Information"}</h3>
        <p>
          <strong>{t("developerLabel") || "Developer:"}</strong> Mari
          Makhashvili
        </p>
        <p>
          <strong>{t("projectGoalLabel") || "Project Goal:"}</strong>{" "}
          {t("projectGoalText") ||
            "Implementing robust routing, state persistence, and layout constraints."}
        </p>

        <hr className="about-divider" />

        <h3>{t("courseCreditsTitle") || "Course Credits"}</h3>
        <p>
          {t("builtAsPart") || "Built as part of the"}{" "}
          <a
            href="https://rs.school/courses/reactjs"
            target="_blank"
            rel="noopener noreferrer"
            className="about-course-link"
          >
            RS School React Course
          </a>
          .
        </p>
      </div>
    </div>
  );
}
