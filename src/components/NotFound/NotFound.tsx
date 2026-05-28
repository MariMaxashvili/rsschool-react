import { Link } from "react-router-dom";
import "./NotFound.css";

export const NotFound = () => {
  return (
    <div className="not-found-container">
      <h1>404</h1>
      <h2>Page Not Found</h2>
      <p>Oops! The page you are looking for doesn't exist.</p>

      <Link to="/" className="not-found-home-btn">
        Return to Dashboard
      </Link>
    </div>
  );
};
