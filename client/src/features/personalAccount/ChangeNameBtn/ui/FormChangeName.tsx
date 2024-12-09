import React, { useState } from "react";
import { useAppDispatch, useAppSelector } from "@/shared/hooks/rtkHooks";
import { updateUser } from "@/entities/user/model/userThunk";

type FormChangeNameProps = {
  onClose: () => void;
};

export function FormChangeName({ onClose }: FormChangeNameProps) {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.user);
  const [newName, setNewName] = useState<string>("");
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user?.id) {
      setError("Пользователь не найден");
      return;
    }

    try {
      await dispatch(
        updateUser({ username: newName, password: "" })
      ).unwrap();
      onClose();
    } catch (err) {
      setError("Ошибка при обновлении имени пользователя");
    }
  };

  return (
    <div className="modal is-active">
      <div className="modal-background" onClick={onClose}></div>
      <div className="modal-card">
        <section className="modal-card-body">
          <form onSubmit={handleSubmit}>
            <div className="field">
              <label className="label">Новое имя</label>
              <div className="control">
                <input
                  className="input"
                  type="text"
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  placeholder="Введите новое имя"
                />
              </div>
            </div>
            {error && <div className="notification is-danger">{error}</div>}
            <div className="field">
              <div className="control">
                <button className="button is-primary" type="submit">
                  Сохранить
                </button>
              </div>
            </div>
          </form>
        </section>
      </div>
    </div>
  );
}
