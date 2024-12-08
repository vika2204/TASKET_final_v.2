import { useAppSelector } from "@/shared/hooks/rtkHooks.ts";
import { Logout } from "./Logout";
import {Filters} from "@/widgets/Filters";

export function Nav() {
  const { user } = useAppSelector((state) => state.user);

  return (
    <>
      <aside className="menu">
        <div
          style={{
            textAlign: "left",
            fontWeight: "bold",
            fontSize: "36px",
            borderBottom: "1px solid #ccc",
            paddingBottom: "20px",
          }}
        >
          TASKET
        </div>
        <p className="menu-label">Вы авторизованы</p>
        <ul className="menu-list">
          <li>
            <a>
              <span className="icon-text">
                <span className="icon">
                  <i className="fas fa-user"></i>
                </span>
                <span>Личный кабинет @{user?.username}</span>
              </span>
            </a>
          </li>
          <Logout />
        </ul>
        <Filters/>
      </aside>
    </>
  );
}
