import {useAppDispatch, useAppSelector} from "@/shared/hooks/rtkHooks.ts";
import { Logout } from "./Logout";
import { Filters } from "@/widgets/Filters";
import {Link, useNavigate} from "react-router-dom";
import {CLIENT_ROUTES} from "@/app/router";
import {ticketSlice} from "@/entities/tickets/model/TicketSlice.ts";

export function Nav() {
  const { user } = useAppSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  function resetFiltersAndGoHome(): void {
      dispatch(ticketSlice.actions.setSearchFilter(null))
      dispatch(ticketSlice.actions.setStatusFilter([]))
      dispatch(ticketSlice.actions.setAssigneeFilter(null));
      navigate(CLIENT_ROUTES.HOME)
  }

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
            onClick={resetFiltersAndGoHome}
          style={{
            textAlign: "left",
            fontWeight: "bold",
            fontSize: "36px",
            borderBottom: "1px solid #ccc",
            paddingBottom: "20px",
              cursor: "pointer"
          }}
        >
            <h1 className="title is-1">TASKET</h1>
        </div>
        <p className="menu-label">Вы авторизованы</p>
        <ul className="menu-list">
          <Link to={CLIENT_ROUTES.PROFILE}>
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
