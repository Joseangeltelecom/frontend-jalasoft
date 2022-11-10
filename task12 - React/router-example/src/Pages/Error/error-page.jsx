import { useNavigate, useRouteError } from "react-router-dom";
import "./error-page.css";

export default function ErrorPage() {
  const error = useRouteError();
  const navigate = useNavigate();
  return (
    <div id="error-page">
      <h1>Oops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      <p>
        <i>{error.statusText || error.message}</i>
      </p>
      <button onClick={() => navigate("/")}>Go to Welcome</button>
    </div>
  );
}
