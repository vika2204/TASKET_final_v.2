import { PersonalAccountCard } from "@/entities/user";
import { useEffect } from "react";

export function PersonalAccountPage() {

  useEffect(() => {
    document.title = "TASKET-Личный кабинет";
  }, []);
  return (
    <>
      <section className="section">
        <PersonalAccountCard />
      </section>

      {/* Ниже располагается просто HTML разметка (МАКЕТ) */}
      <section className="section">
        <div className="box">
          <h3 className="title">Задач выполнено: 6 из 10</h3>
          <progress
            className="progress is-success is-large"
            value="60"
            max="100"
          >
            60%
          </progress>
        </div>
      </section>

      <section className="section">
        <div className="columns">
          <div className="column is-half">
            <h5 className="title">Ваши задачи</h5>
            <div className="box">
              <div className="level">
                <div className="level-left">
                  <a>
                    <strong>ELBRUS-235 Отработать движения на брусе</strong>
                  </a>
                </div>
                <div className="level-right">
                  <span className="tag is-success is-light has-text-weight-bold is-uppercase">
                    Завершённые
                  </span>
                </div>
              </div>
            </div>
            <div className="box">
              <div className="level">
                <div className="level-left">
                  <a>
                    <strong>
                      ELBRUS-234 Сделать переворот, разворот и поворот
                    </strong>
                  </a>
                </div>
                <div className="level-right">
                  <span className="tag is-info is-light has-text-weight-bold is-uppercase">
                    В работе
                  </span>
                </div>
              </div>
            </div>
            <div className="box">
              <div className="level">
                <div className="level-left">
                  <a>
                    <strong>ELBRUS-236 Удариться брусьями об рот</strong>
                  </a>
                </div>
                <div className="level-right">
                  <span className="tag is-link is-light has-text-weight-bold is-uppercase">
                    Ожидает разработки
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className="column is-half">
            <h5 className="title">Ваши последние комментарии</h5>
            <div className="box">
              <div className="level">
                <div className="level-left">
                  Коллеги, поясните, что именно имелось ввиду?
                </div>
                <div className="level-right">
                  <a>
                    <strong>ELBRUS-235</strong>
                  </a>
                </div>
              </div>
            </div>
            <div className="box">
              <div className="level">
                <div className="level-left">
                  ещё одна такая задача и я уволюсь
                </div>
                <div className="level-right">
                  <a>
                    <strong>ELBRUS-236</strong>
                  </a>
                </div>
              </div>
            </div>
            <div className="box">
              <div className="level">
                <div className="level-left">(((((</div>
                <div className="level-right">
                  <a>
                    <strong>ELBRUS-234</strong>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
