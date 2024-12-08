import { CommentType } from "@/entities/comment/model";
import { UserService, UserWithoutPasswordType } from "@/entities/user";
import { useEffect, useState } from "react";

type propsComment = {
  data: CommentType;
};

export function Comment(props: propsComment): JSX.Element {
  const [users, setUsers] = useState<UserWithoutPasswordType[]>([]);

  const loadUsers = async () => {
    const loadedUsers = await UserService.getAllUsers();
    setUsers(loadedUsers);
  };

  useEffect(() => {
    loadUsers();
  }, []);

  const user = users.find((u) => u.id === props.data.user_id);

  return (
    <div className="box">
      <article className="media">
        <div className="media-content">
          <div className="content">
            <p>
              <strong>
                Имя пользователя - @{user ? user.username : "Loading..."}
              </strong>
              <br />
              {props.data.text}
              <br />
              <small>{new Date(props.data.createdAt).toLocaleString()}</small>
            </p>
          </div>
        </div>
      </article>
    </div>
  );
}
