const TICKET_STATUS = {
    OPEN: "OPEN",
    IN_PROGRESS: "IN_PROGRESS",
    NEED_INFO: "NEED_INFO",
    DONE: "DONE",
    CANCELED: "CANCELED"
}

function validateStatus(status) {
    return TICKET_STATUS[status] !== undefined;
}

module.exports = {validateStatus, ticketStatus: TICKET_STATUS}
