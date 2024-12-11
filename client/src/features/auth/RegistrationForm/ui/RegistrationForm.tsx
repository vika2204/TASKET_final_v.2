import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "@/shared/hooks/rtkHooks";
import { registration } from "@/entities/user/model/userThunk";
import { CLIENT_ROUTES } from "@/app/router";
import ReCAPTCHA from "react-google-recaptcha";

type FormValues = {
  email: string;
  password: string;
  confirmPassword: string;
  username: string;
  role: string;
};

export const RegistrationForm: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [captchaValue, setCaptchaValue] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setError,
    clearErrors,
  } = useForm<FormValues>();

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    if (!captchaValue) {
      setErrorMessage("Пожалуйста, пройдите проверку CAPTCHA.");
      return;
    }

    try {
      await dispatch(
        registration({
          email: data.email,
          username: data.username,
          password: data.password,
          role: data.role,
          captcha: captchaValue, // Передаём токен reCAPTCHA
        })
      ).unwrap();
      navigate(CLIENT_ROUTES.HOME);
    } catch (error: unknown) {
      if (typeof error === "object" && error !== null && "message" in error) {
        const errorMessage = (error as { message: string }).message;
        if (errorMessage.includes("This email already in use")) {
          setError("email", {
            type: "manual",
            message: "Email уже занят",
          });
        } else {
          setErrorMessage("Ошибка регистрации. Пожалуйста, попробуйте снова.");
        }
      }
    }
  };

  const handleEmailChange = () => {
    clearErrors("email");
  };

  return (
    <div className="container is-max-desktop">
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
          <div className="control has-icons-left">
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
              onChange={handleEmailChange}
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
          <label className="label has-text-black">Имя пользователя</label>
          <div className="control">
            <input
              className={`input has-background-white has-text-black ${
                errors.username ? "is-danger" : ""
              }`}
              type="text"
              placeholder="Введите имя пользователя"
              {...register("username", {
                required: "Имя пользователя обязательно",
              })}
            />
            {errors.username && (
              <p className="help is-danger">{errors.username.message}</p>
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
                minLength: {
                  value: 6,
                  message: "Пароль должен быть не менее 6 символов",
                },
              })}
            />
            {errors.password && (
              <p className="help is-danger">{errors.password.message}</p>
            )}
          </div>
        </div>

        <div className="field">
          <label className="label has-text-black">Подтвердите пароль</label>
          <div className="control">
            <input
              className={`input has-background-white has-text-black ${
                errors.confirmPassword ? "is-danger" : ""
              }`}
              type="password"
              placeholder="Подтвердите пароль"
              {...register("confirmPassword", {
                required: "Подтверждение пароля обязательно",
                validate: (value) =>
                  value === watch("password") || "Пароли не совпадают",
              })}
            />
            {errors.confirmPassword && (
              <p className="help is-danger">{errors.confirmPassword.message}</p>
            )}
          </div>
        </div>

        <div className="field">
          <label className="label has-text-black">Роль</label>
          <div className="control">
            <div className="select">
              <select
                className="has-background-white has-text-black"
                {...register("role", { required: "Роль обязательна" })}
              >
                <option value="developer">Разработчик</option>
                <option value="lead">Ведущий разработчик</option>
              </select>
            </div>
          </div>
        </div>

        <div className="field">
          <ReCAPTCHA
            sitekey="6LecopgqAAAAAK_f7p6vgsEhEs0Vm5Csh-1rnTAu" // Вставьте ваш Site Key
            onChange={(value) => setCaptchaValue(value)}
          />
          {!captchaValue && (
            <p className="help is-danger">Пожалуйста, пройдите CAPTCHA.</p>
          )}
        </div>

        <div className="field">
          <div className="control">
            <button type="submit" className="button is-link">
              Зарегистрироваться
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};