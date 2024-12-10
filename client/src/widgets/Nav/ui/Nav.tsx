import { useAppSelector } from "@/shared/hooks/rtkHooks.ts";
import { Logout } from "./Logout";
import { Filters } from "@/widgets/Filters";
import { Link } from "react-router-dom";

export function Nav() {
  const { user } = useAppSelector((state) => state.user);

  return (
    <>
      <aside
        className="menu"
        style={{
          position: "sticky",
          top: 0,
        }}
      >
        <div
          style={{
            textAlign: "left",
            fontWeight: "bold",
            fontSize: "36px",
            borderBottom: "1px solid #ccc",
            paddingBottom: "20px",
          }}
        >
          <Link to={"/"}>
            <h1 className="title is-1">TASKET</h1>
          </Link>
        </div>
        <p className="menu-label">Вы авторизованы</p>
        <ul className="menu-list">
          <Link to={`/profile/${user?.id}`}>
            <li>
              <span className="icon-text">
                <span className="icon">
                  <i className="fas fa-user"></i>
                </span>
                <span>Личный кабинет @{user?.username}</span>
              </span>
            </li>
          </Link>
          <Logout />
        </ul>
        <Filters />
      </aside>
    </>
  );
}
