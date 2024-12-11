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
    document.title = "Вход на сайт - TASKET";

    const script = document.createElement('script');

    script.src = "landing.js";
    script.async = true;

    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    }
  }, []);

  const openAuthModal = () => setIsAuthModalOpen(true);
  const closeAuthModal = () => setIsAuthModalOpen(false);

  const openRegModal = () => setIsRegModalOpen(true);
  const closeRegModal = () => setIsRegModalOpen(false);

  if (user) {
    return <Navigate to={CLIENT_ROUTES.HOME} />
  }

  return (
      <>
        <section
          className="hero is-fullheight"
      >
        <canvas id="background" style={{zIndex: -1,position: "absolute"}}></canvas>
        <div className="hero-body">
          <div
              className="box"
              style={{backgroundColor: "transparent", color: "white", backdropFilter: "blur(8px)", margin: "0px auto", boxShadow: "none"}}
          >
            <p
                className="title"
                style={{ color: "white", textAlign: "center", fontSize:"57px"}}
            >
              TASKET
            </p>
            <p
                className="subtitle"
                style={{ color: "white", textAlign: "center", fontSize: "28px"}}
            >
              проекты без промедлений: интеллектуальное управление с помощью AI
            </p>

            <div className="buttons" style={{justifyContent: "center"}}>
              <button
                  className="button js-modal-trigger is-info is-medium"
                  onClick={openAuthModal}
              >
                Войти
              </button>
              {" "}
              <button className="button js-modal-trigger is-medium" onClick={openRegModal}>
                Зарегистрироваться
              </button>
            </div>
          </div>
        </div>

        {/* Модальное окно для авторизации */}
        {isAuthModalOpen && (
            <div className="modal is-active">
              <div className="modal-background" onClick={closeAuthModal}></div>
              <div className="modal-card">
                <header className="modal-card-head">
                  <p className="modal-card-title">Авторизация</p>
                  <button className="delete" aria-label="close" onClick={closeAuthModal}></button>
                </header>
                <section className="modal-card-body"><AuthorizationForm/></section>
              </div>
            </div>
        )}

          {/* Модальное окно для регистрации */}
        {isRegModalOpen && (
            <div className="modal is-active">
              <div className="modal-background" onClick={closeRegModal}></div>
              <div className="modal-card">
                <header className="modal-card-head">
                  <p className="modal-card-title">Регистрация</p>
                  <button className="delete" aria-label="close" onClick={closeRegModal}></button>
                </header>
                <section className="modal-card-body"><RegistrationForm/></section>
              </div>
              <button
                  className="modal-close is-large"
                  aria-label="close"
                  onClick={closeRegModal}
              ></button>
            </div>
        )}
        </section>
        <script src="landing.js"></script>
    </>)
  ;
}
