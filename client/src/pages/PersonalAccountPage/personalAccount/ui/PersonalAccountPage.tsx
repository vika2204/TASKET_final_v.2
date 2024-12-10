import { PersonalAccountCard } from "@/entities/user";
import { ActiveUserTasks } from "@/widgets/ActiveUserTasks";
import { ProgressBar } from "@/widgets/ProgressBar";
import { UserCommentsList } from "@/widgets/UserCommetsList";
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
        <UserCommentsList/>
        </div>
      </section>
    </>
  );
}
