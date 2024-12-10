import { PersonalAccountCard } from "@/entities/user";
import { ActiveUserTasks } from "@/widgets/ActiveUserTasks";
import { ProgressBar } from "@/widgets/ProgressBar";
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

      <ProgressBar/>

      <section className="section">

        <div className="columns">
        <ActiveUserTasks/>

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
