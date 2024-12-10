import { logout } from "@/entities/user/model/userThunk";
import { useAppDispatch } from "@/shared/hooks/rtkHooks";

export function Logout() {
  const dispatch = useAppDispatch();
  const logoutHandler = async () => {
    dispatch(logout());
  };

  return (
    <li onClick={logoutHandler}>
      <a>
        <span className="icon-text">
          <span className="icon">
            <i className="fas fa-right-to-bracket"></i>
          </span>
          <span>Выход</span>
        </span>
      </a>
    </li>
  );
}
