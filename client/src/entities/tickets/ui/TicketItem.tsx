

export function TicketItem() {
    return (
        <>
            <div className="card">
                <div className="card-content">
                    <div className="media">
                        <div className="media-content">
                            <h1 className="title">ELBRUS-264</h1>
                        </div>
                    </div>

                    <div className="content">
                        <div className="buttons">
                            <button className="button" aria-haspopup="true" aria-controls="dropdown-menu">
                    <span className="icon is-small">
                      <i className="fas fa-pen" aria-hidden="true"></i>
                    </span>
                                <span>Редактировать</span>
                            </button>
                            <div className="dropdown is-hoverable">
                                <div className="dropdown-trigger">
                                    <button className="button" aria-haspopup="true" aria-controls="dropdown-menu">
                                        <span>Статус: <span
                                            className="tag is-info is-light has-text-weight-bold is-uppercase">В работе</span></span>
                                        <span className="icon is-small">
                      <i className="fas fa-angle-down" aria-hidden="true"></i>
                    </span>
                                    </button>
                                </div>
                                <div className="dropdown-menu" id="dropdown-menu" role="menu">
                                    <div className="dropdown-content">
                                        <a className="dropdown-item"><span
                                            className="tag is-link is-light has-text-weight-bold is-uppercase">Ожидает разработки</span></a>
                                        <a className="dropdown-item"><span
                                            className="tag is-info is-light has-text-weight-bold is-uppercase">В работе</span></a>
                                        <a className="dropdown-item"><span
                                            className="tag has-text-weight-bold is-uppercase">На уточнении</span></a>
                                        <a className="dropdown-item"><span
                                            className="tag is-success is-light has-text-weight-bold is-uppercase">Завершено</span></a>
                                    </div>
                                </div>
                            </div>
                            <div className="dropdown is-hoverable">
                                <div className="dropdown-trigger">
                                    <button className="button" aria-haspopup="true" aria-controls="dropdown-menu">
                                        <span>Ответственный: @vika</span>
                                        <span className="icon is-small">
                      <i className="fas fa-angle-down" aria-hidden="true"></i>
                    </span>
                                    </button>
                                </div>
                                <div className="dropdown-menu" id="dropdown-menu" role="menu">
                                    <div className="dropdown-content">
                                        <div className="dropdown-item">
                                            <div className="field">

                                                <input className="input" type="text" placeholder="Поиск"/>

                                            </div>
                                        </div>
                                        <a className="dropdown-item"><b>@petya</b> - ведущий разработчик</a>
                                        <a className="dropdown-item"><b>@maksik</b> - разработчик</a>
                                        <a className="dropdown-item"><b>@egor1995</b> - разработчик</a>
                                        <a className="dropdown-item"><b>@hr</b> - менеджер по персоналу</a>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <p>
                            Необходимо придумать концепцию и разработать финальный проект, который ярко завершит
                            обучение в Elbrus Bootcamp.<br/><br/>
                            Требования:
                            <ul>
                                <li>Проект должен быть достаточно сложный</li>
                                <li>Проект должен быть групповым</li>
                            </ul>
                        </p>
                        <br/>
                        <strong>Оценка: 36 ч</strong>
                    </div>
                </div>
            </div>
        </>
    );
}

