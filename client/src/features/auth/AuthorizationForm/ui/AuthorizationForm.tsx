import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "@/shared/hooks/rtkHooks";
import { authorization } from "@/entities/user/model/userThunk";
import { CLIENT_ROUTES } from "@/app/router";

type FormValues = {
  email: string;
  password: string;
};

export const AuthorizationForm: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    try {
      await dispatch(
        authorization({
          email: data.email,
          password: data.password,
        })
      ).unwrap();
      navigate(CLIENT_ROUTES.HOME);
    } catch  {
      setErrorMessage("Введите корректные данные");
    }
  };

  return (
    <div className="container is-max-desktop ">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="p-5"
        style={{
          maxWidth: "500px",
          margin: "auto",
          borderRadius: "10px",
          background: "white",
          padding: "20px",
          boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
        }}
      >
        <style>
          {`
            .input::placeholder {
              color: black;
            }
          `}
        </style>
        {errorMessage && (
          <div className="notification is-danger">{errorMessage}</div>
        )}
        <div className="field">
          <label className="label has-text-black">Email</label>
          <div className="control has-icons-right">
            <input
              className={`input has-background-white has-text-black ${
                errors.email ? "is-danger" : ""
              }`}
              type="email"
              placeholder="Введите email"
              {...register("email", {
                required: "Email обязателен",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "Введите корректный email",
                },
              })}
            />
            <span className="icon is-small is-left">
              <i className="fas fa-envelope"></i>
            </span>
            {errors.email && (
              <p className="help is-danger">{errors.email.message}</p>
            )}
          </div>
        </div>

        <div className="field">
          <label className="label has-text-black">Пароль</label>
          <div className="control">
            <input
              className={`input has-background-white has-text-black ${
                errors.password ? "is-danger" : ""
              }`}
              type="password"
              placeholder="Введите пароль"
              {...register("password", {
                required: "Пароль обязателен",
              })}
            />
            {errors.password && (
              <p className="help is-danger">{errors.password.message}</p>
            )}
          </div>
        </div>

        <div className="field">
          <div className="control">
            <button type="submit" className="button is-link">
              Войти
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};
