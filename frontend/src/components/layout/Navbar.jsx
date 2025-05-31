import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav>
      <ul className="flex justify-center gap-20">
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/daily-log">Log</Link>
        </li>
        <li>
          <Link to="/history">History</Link>
        </li>
        <li>
          <Link to="/stats">Stats</Link>
        </li>
        <li>
          <Link to="/account">Account</Link>
        </li>
        <li>
          <Link to="/login">Login</Link>
        </li>
        <li>
          <Link to="/register">Register</Link>
        </li>
      </ul>
    </nav>
  );
}
