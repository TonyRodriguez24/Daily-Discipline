import { Link } from "react-router-dom";

export default function Navbar({ token, setToken }) {
  return (
    <nav>
      <ul className="flex justify-center w-full mx-auto text-black text-xl items-center gap-15 bg-green-300 px-20 py-2  mb-2">
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


        {token ? (
          <li>
            <button
              className="cursor-pointer text-black rounded-2xl bg-yellow-200 px-3 py-2"
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

