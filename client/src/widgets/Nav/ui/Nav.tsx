import { useAppSelector } from "@/shared/hooks/rtkHooks.ts";
import { Logout } from "./Logout";

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
              value="ELBRUS-"
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
              <li>
                <a className="is-active">
                  <span className="tag is-link is-light has-text-weight-bold is-uppercase">
                    Ожидает разработки
                  </span>
                </a>
              </li>
              <li>
                <a>
                  <span className="tag is-info is-light has-text-weight-bold is-uppercase">
                    В работе
                  </span>
                </a>
              </li>
              <li>
                <a>
                  <span className="tag has-text-weight-bold is-uppercase">
                    На уточнении
                  </span>
                </a>
              </li>
              <li>
                <a>
                  <span className="tag is-success is-light has-text-weight-bold is-uppercase">
                    Завершённые
                  </span>
                </a>
              </li>
            </ul>
          </li>
        </ul>
      </aside>
    </>
  );
}
