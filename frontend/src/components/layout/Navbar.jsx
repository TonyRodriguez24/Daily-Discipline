import { Link, useNavigate } from "react-router-dom";

export default function Navbar({ token, setToken }) {
  let navigate = useNavigate();
  return (
    <nav>
      <ul className="flex justify-center w-full mx-auto h-18 text-black lg:text-lg items-center gap-4 lg:gap-15 bg-emerald-500 lg:px-20 border-b-4 border-emerald-900">
        {token && (
          <>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/daily-log">Add Log</Link>
            </li>
            <li>
              <Link to="/history">History</Link>
            </li>
            <li>
              <Link to="/stats">Stats</Link>
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
                navigate('/login')
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

