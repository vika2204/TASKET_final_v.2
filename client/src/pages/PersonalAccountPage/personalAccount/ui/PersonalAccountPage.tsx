import { PersonalAccountCard } from "@/entities/user";
import { ActiveUserTasks } from "@/widgets/ActiveUserTasks";
import { ProgressBar } from "@/widgets/ProgressBar";
import { UserCommentsList } from "@/widgets/UserCommetsList";
import {useEffect, useState} from "react";
import {TicketList} from "@/entities/tickets/model";
import {TicketService} from "@/entities/tickets/api";

export function PersonalAccountPage() {
    const [userTicketList, setUserTicketList] = useState<TicketList>([])
    const [isLoading, setIsLoading] = useState<boolean>(true);

    async function loadUserTickets() {
        setUserTicketList(await TicketService.getAllUserTickets());
        setIsLoading(false);
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

      <ProgressBar userTickets={userTicketList} isLoading={isLoading}/>

      <section className="section">

        <div className="columns">
        <ActiveUserTasks userTicketList={userTicketList}/>
        <UserCommentsList/>
        </div>
      </section>
    </>
  );
}
