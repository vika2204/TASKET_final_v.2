import { PersonalAccountCard } from "@/entities/user";
import { ActiveUserTasks } from "@/widgets/ActiveUserTasks";
import { ProgressBar } from "@/widgets/ProgressBar";
import { UserCommentsList } from "@/widgets/UserCommetsList";
import {useEffect, useState} from "react";
import {TicketList} from "@/entities/tickets/model";
import {TicketService} from "@/entities/tickets/api";

export function PersonalAccountPage() {
    const [userTicketList, setUserTicketList] = useState<TicketList>([])

    async function loadUserTickets() {
        setUserTicketList(await TicketService.getAllUserTickets());
    }
  useEffect(() => {
    document.title = "Личный кабинет – TASKET";
    loadUserTickets();
  }, []);


  return (
    <>
      <section className="section">
        <PersonalAccountCard />
      </section>

      {/* Ниже располагается просто HTML разметка (МАКЕТ) */}

      <ProgressBar userTickets={userTicketList}/>

      <section className="section">

        <div className="columns">
        <ActiveUserTasks/>
        <UserCommentsList/>
        </div>
      </section>
    </>
  );
}
