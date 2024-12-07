import React, { useEffect, useState } from "react";
import { UserService, UserType } from "@/entities/user";
import { useAppSelector } from "@/shared/hooks/rtkHooks";

export function ResponsibleForm() {
  const [users, setUsers] = useState<UserType[]>([]);
  const [selectedUser, setSelectedUser] = useState<UserType | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const { user: authUser } = useAppSelector((state) => state.user);

  const loadUsers = async () => {
    const loadedUsers = await UserService.getAllUsers();
    setUsers(loadedUsers);
  };

  useEffect(() => {
    loadUsers();
  }, []);

  const handleUserSelect = (user: UserType) => {
    setSelectedUser(user);
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const filteredUsers = [
    authUser,
    ...users.filter((u) => u.id !== authUser?.id),
  ]
    .filter((u) => u?.username.toLowerCase().includes(searchTerm.toLowerCase()))
    .slice(0, 5);

  return (
    <div className="dropdown is-hoverable" >
      <div className="dropdown-trigger">
        <button
          className="button"
          aria-haspopup="true"
          aria-controls="dropdown-menu"
        >
          <span>
            Ответственный:&nbsp;
            {selectedUser ? " @" + selectedUser.username : "Выбрать"}
          </span>
          <span className="icon is-small" style={{ color: "white" }}>
            <i className="fas fa-angle-down" aria-hidden="true"></i>
          </span>
        </button>
      </div>
      <div className="dropdown-menu" id="dropdown-menu" role="menu">
        <div className="dropdown-content">
          <div className="dropdown-item">
            <div className="field">
              <input
                className="input"
                type="text"
                placeholder="Поиск"
                value={searchTerm}
                onChange={handleSearchChange}
              />
            </div>
          </div>

          {filteredUsers.map((u) => (

            <a
              key={u?.id}
              className="dropdown-item"
              onClick={() => handleUserSelect(u)}
            >
              <b>@{u?.username}</b> - {u?.role}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
