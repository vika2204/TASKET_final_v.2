import { ChangeNameBtn, ChangePassBtn } from "@/features";
import { useAppSelector } from "@/shared/hooks/rtkHooks";

export function PersonalAccountCard() {
  const { user } = useAppSelector((state) => state.user);

  return (
    <div className="box">
      <h1 className="title">Личный кабинет @{user?.username}</h1>
      <h4 className="subtitle is-4">{user?.role}</h4>

      <div className="buttons">
        <ChangeNameBtn />
        <ChangePassBtn />
      </div>
    </div>
  );
}
