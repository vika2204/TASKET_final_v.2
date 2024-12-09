import React, { useEffect, useState } from "react";
import {UserService, UserWithoutPasswordType} from "@/entities/user";
import { useAppDispatch, useAppSelector } from "@/shared/hooks/rtkHooks";
import { Ticket } from "@/entities/tickets/model";
import { updateTicket } from "@/entities/tickets/model/TicketThunks";

export function ResponsibleForm({ticket}:{ticket: Ticket}) {
  const [users, setUsers] = useState<UserWithoutPasswordType[]>([]);
  const [selectedUser, setSelectedUser] = useState<UserWithoutPasswordType | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const { user: authUser } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch()
  const loadUsers = async () => {
    const loadedUsers = await UserService.getAllUsers();
    setUsers(loadedUsers);
  };

  useEffect(() => {
    loadUsers();
  }, []);

  useEffect(() => {
    const currentAssignee = users.find(user => user.id === ticket.assignee_id);
    setSelectedUser(currentAssignee || null);
  }, [users, ticket.assignee_id]);

  const handleUserSelect = (user: UserWithoutPasswordType) => {
    setSelectedUser(user);
    updateUserHandler(user)
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const updateUserHandler = (user: UserWithoutPasswordType | null) => {
    if (user) {
      dispatch(updateTicket({
        id: ticket.id,
        title: ticket.title,
        assignee_id: user.id,
        description: ticket.description,
        status: ticket.status,
        estimate: ticket.estimate
      }));
    }
  };

  let filteredUsers = [
    ...users.filter((u) => u.id !== authUser?.id),
  ]

  if (authUser) {
    filteredUsers.unshift(authUser);
  }

  filteredUsers = filteredUsers.filter((u) => u?.username.toLowerCase().includes(searchTerm.toLowerCase()) || u?.role.toLowerCase().includes(searchTerm.toLowerCase()))
      .slice(0, 5);

  return (
    <div className="dropdown is-hoverable" >
      <div className="dropdown-trigger">
        <button
          className={users.length === 0 ? "button is-loading" : "button"}
          aria-haspopup="true"
          aria-controls="dropdown-menu"
        >
          <span>
            Исполнитель:&nbsp;
            {selectedUser ? " @" + selectedUser.username : "Выбрать"}
          </span>
          <span className="icon is-small">
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
