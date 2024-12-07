import { useAppSelector } from "@/shared/hooks/rtkHooks.ts";
import { Logout } from "./Logout";
import {getTicketStatusClass, getTicketStatusName, TICKET_STATUS} from "@/shared/types/statusEnum.ts";

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
        <p className="menu-label">Задачи</p>
        <div className="field has-addons">
          <p className="control">
            <input
              className="input"
              type="text"
              placeholder="Поиск"
            />
          </p>
          <p className="control">
            <button className="button">
              <span className="icon">
                <i className="fas fa-magnifying-glass"></i>
              </span>
            </button>
          </p>
        </div>
        <ul className="menu-list">
          <li>
            <a>Мои открытые задачи</a>
          </li>
          <li>
            <a>Все задачи</a>
            <ul>
              {Object.keys(TICKET_STATUS).map((status) =>
                <li key={status}>
                  <a>
                  <span className={`tag ${getTicketStatusClass(status)} is-light has-text-weight-bold is-uppercase`}>
                    {getTicketStatusName(status)}
                  </span>
                  </a>
                </li>
              )}
            </ul>
          </li>
        </ul>
      </aside>
    </>
  );
}
