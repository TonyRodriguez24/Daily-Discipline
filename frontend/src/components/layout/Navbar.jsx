import { Link } from "react-router-dom";

export default function Navbar({ token, setToken }) {
  return (
    <nav>
      <ul className="flex justify-center gap-20">
        {token && (
          <>
            <li>
              <Link to="/daily-log">Create Log</Link>
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
          </>
        )}
        <li>
          <Link to="/">Home</Link>
        </li>

        {token ? (
          <li>
            <button
              className="cursor-pointer bg-green-300 px-2 py-2 text-black"
              onClick={() => {
                localStorage.removeItem("token");
                setToken(null);
              }}>
              Logout
            </button>
          </li>
        ) : (
          <>
            <li>
              <Link to="/register">Register</Link>
            </li>
            <li>
              <Link to="/login">Login</Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
}

