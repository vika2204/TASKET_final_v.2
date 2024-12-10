import { AuthorizationForm } from "@/features/auth/AuthorizationForm";
import { RegistrationForm } from "@/features/auth/RegistrationForm";
import { useEffect, useState } from "react";
import {useAppSelector} from "@/shared/hooks/rtkHooks.ts";
import {Navigate} from "react-router-dom";
import {CLIENT_ROUTES} from "@/app/router";

export function LandingPage() {
  const { user } = useAppSelector(state => state.user)

  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isRegModalOpen, setIsRegModalOpen] = useState(false);

  useEffect(() => {
    document.title = "TASKET-Вход";
  }, []);

  const openAuthModal = () => setIsAuthModalOpen(true);
  const closeAuthModal = () => setIsAuthModalOpen(false);

  const openRegModal = () => setIsRegModalOpen(true);
  const closeRegModal = () => setIsRegModalOpen(false);

  if (user) {
    return <Navigate to={CLIENT_ROUTES.HOME} />
  }

  return (
    <section
      className="hero is-fullheight"
      style={{ backgroundColor: "#ADD8E6", backgroundSize: "cover" }}
    >
      <div className="hero-body">
        <div
          className="box"
          style={{ backgroundColor: "white", color: "black" }}
        >
          <p
            className="title"
            style={{ backgroundColor: "white", color: "black" }}
          >
            Tasket - это корпоративный менеджер задач с возможностями AI
          </p>
          <p
            className="subtitle"
            style={{ backgroundColor: "white", color: "black" }}
          >
            У вас больше не будет плохо сформулированных задач, ведь
            искусственный интеллект обратит ваше внимание, если такие появятся
          </p>

          <div className="buttons">
            <button
              className="button js-modal-trigger is-info"
              onClick={openAuthModal}
            >
              Войти
            </button>{" "}
            <button className="button js-modal-trigger" onClick={openRegModal}>
              Зарегистрироваться
            </button>
          </div>
        </div>
      </div>

      {/* Модальное окно для авторизации */}
      {isAuthModalOpen && (
        <div className="modal is-active">
          <div className="modal-background" onClick={closeAuthModal}></div>
          <div className="modal-content">
            <AuthorizationForm />
          </div>
          <button
            className="modal-close is-large"
            aria-label="close"
            onClick={closeAuthModal}
          ></button>
        </div>
      )}

      {/* Модальное окно для регистрации */}
      {isRegModalOpen && (
        <div className="modal is-active">
          <div className="modal-background" onClick={closeRegModal}></div>
          <div className="modal-content">
            <RegistrationForm />
          </div>
          <button
            className="modal-close is-large"
            aria-label="close"
            onClick={closeRegModal}
          ></button>
        </div>
      )}
    </section>
  );
}
