import { logout } from "@/entities/user/model/userThunk";
import { useAppDispatch } from "@/shared/hooks/rtkHooks";

export function Logout() {
  const dispatch = useAppDispatch();
  const logoutHandler = async () => {
    dispatch(logout());
  };

  return (
    <li>
      <a>
        <span className="icon-text">
          <span className="icon">
            <i className="fas fa-right-to-bracket"></i>
          </span>
          <span onClick={logoutHandler}>Выход</span>
        </span>
      </a>
    </li>
  );
}
