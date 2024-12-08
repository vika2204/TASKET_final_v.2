// перечисление всех статусов (на бекенде есть такой же енум(
export enum TICKET_STATUS {
    OPEN = "OPEN",
    IN_PROGRESS = "IN_PROGRESS",
    NEED_INFO = "NEED_INFO",
    DONE = "DONE",
    CANCELED = "CANCELED"
}

export function getTicketStatusEnumFromString(status: string): TICKET_STATUS {
    return TICKET_STATUS[status as keyof typeof TICKET_STATUS];
}

// название статуса
export function getTicketStatusName(status: TICKET_STATUS | string | null): string {
    switch (status) {
        case TICKET_STATUS.OPEN:
            return 'Ожидает разработки';
        case TICKET_STATUS.IN_PROGRESS:
            return 'В работе';
        case TICKET_STATUS.NEED_INFO:
            return 'На уточнении';
        case TICKET_STATUS.DONE:
            return 'Завершено';
        case TICKET_STATUS.CANCELED:
            return 'Отменено';
    }

    return '';
}

// класс (цвет) статуса
export function getTicketStatusClass(status: TICKET_STATUS | string | null): string {
    switch (status) {
        case TICKET_STATUS.OPEN:
            return "is-link";
        case TICKET_STATUS.IN_PROGRESS:
            return "is-info";
        case TICKET_STATUS.NEED_INFO:
            return "is-warning";
        case TICKET_STATUS.DONE:
            return "is-success";
        case TICKET_STATUS.CANCELED:
            return "is-danger";
    }

    return '';
}

