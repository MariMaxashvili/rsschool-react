import { Link } from "react-router-dom";
import "./About.css";

export const About = () => {
  return (
    <div className="about-page-container">
      <Link to="/" className="about-back-link">
        &larr; Back to Dashboard
      </Link>

      <div className="about-card">
        <h2>About This Application</h2>
        <p>
          This is a responsive, reactive Pokémon dashboard designed to
          seamlessly view and manage item entries using the PokéAPI.
        </p>

        <hr className="about-divider" />

        <h3>Author Information</h3>
        <p>
          <strong>Developer:</strong> Mari Makhashvili / NariMaxashvili
        </p>
        <p>
          <strong>Project Goal:</strong> Implementing robust single-page
          routing, state persistence, and layout constraints.
        </p>

        <hr className="about-divider" />

        <h3>Course Credits</h3>
        <p>
          Built as part of the{" "}
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
};
