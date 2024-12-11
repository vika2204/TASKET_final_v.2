import React, { useState } from "react";
import { useAppDispatch, useAppSelector } from "@/shared/hooks/rtkHooks";
import {
  refreshAccessToken,
  updateUser,
} from "@/entities/user/model/userThunk";

type FormChangePassProps = {
  onClose: () => void;
};

export function FormChangePass({ onClose }: FormChangePassProps) {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.user);
  const [curPass, setCurPass] = useState<string>("");
  const [newPass, setNewPass] = useState<string>("");
  const [rNewPass, setRNewPass] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!user?.id) {
      setError("Пользователь не найден");
      return;
    }

    if (newPass !== rNewPass) {
      setError("Новый пароль и его подтверждение не совпадают");
      return;
    }

    try {
      await dispatch(
        updateUser({
          email: user.email,
          curPass: curPass,
          username: user.username,
          role: user.role,
          newPass: newPass,
        })
      ).unwrap();

      await dispatch(refreshAccessToken()).unwrap();

      setSuccess("Пароль успешно изменен");
    } catch (err) {
      alert("Неверный текущий пароль");
      console.error("Ошибка:", err);
      setError("Неудачная попытка. Пожалуйста, проверьте введенные данные.");
    }
  };

  return (
    <div className="modal is-active">
      <div className="modal-background" onClick={onClose}></div>
      <div className="modal-card">
        <header className="modal-card-head">
          <p className="modal-card-title">Изменение пароля</p>
          <button className="delete" aria-label="close" onClick={onClose}></button>
        </header>
        <section className="modal-card-body">
          <form onSubmit={handleSubmit}>
            <div className="field">
              <label className="label">Текущий пароль</label>
              <div className="control">
                <input
                    required
                    className="input"
                    type="password"
                    value={curPass}
                    onChange={(e) => setCurPass(e.target.value)}
                    placeholder="Введите текущий пароль"
                />
              </div>
            </div>
            <div className="field">
              <label className="label">Новый пароль</label>
              <div className="control">
                <input
                    required
                    className="input"
                    type="password"
                    value={newPass}
                    onChange={(e) => setNewPass(e.target.value)}
                    placeholder="Введите новый пароль"
                />
              </div>
            </div>
            <div className="field">
              <label className="label">Повторите новый пароль</label>
              <div className="control">
                <input
                    required
                    className="input"
                    type="password"
                    value={rNewPass}
                    onChange={(e) => setRNewPass(e.target.value)}
                    placeholder="Повторите новый пароль"
                />
              </div>
            </div>
            {error && <div className="notification is-danger">{error}</div>}
            {success && (
                <div className="notification is-success">{success}</div>
            )}
            <div className="field">
              <div className="control">
                <button className="button is-info" type="submit">
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
