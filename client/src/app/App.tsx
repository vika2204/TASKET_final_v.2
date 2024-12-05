
export function App(): JSX.Element {
  return (
      <div className="container is-fluid">
          <div className="columns">
              <div className="column mt-4 is-narrow">
                  <aside className="menu">
                      <div style={{textAlign:"left",fontWeight: "bold",fontSize:"36px",borderBottom:"1px solid #ccc",paddingBottom: "20px;"}}>
                          TASKET
                      </div>
                      <p className="menu-label">Вы авторизованы</p>
                      <ul className="menu-list">
                          <li>
                              <a>
                <span className="icon-text">
                  <span className="icon">
                    <i className="fas fa-user"></i>
                  </span>
                  <span>Личный кабинет @vika</span>
                </span>
                              </a>
                          </li>
                          <li>
                              <a>
                <span className="icon-text">
                  <span className="icon">
                    <i className="fas fa-right-to-bracket"></i>
                  </span>
                  <span>Выход</span>
                </span>
                              </a>
                          </li>
                      </ul>
                      <p className="menu-label">Задачи</p>
                      <div className="field has-addons">
                          <p className="control">
                              <input className="input" type="text" placeholder="Поиск" value="ELBRUS-"/>
                          </p>
                          <p className="control">
                              <button className="button"><span className="icon"><i className="fas fa-magnifying-glass"></i></span></button>
                          </p>
                      </div>
                      <ul className="menu-list">
                          <li><a>Мои открытые задачи</a></li>
                          <li>
                              <a>Все задачи</a>
                              <ul>
                                  <li><a className="is-active"><span className="tag is-link is-light has-text-weight-bold is-uppercase">Ожидает разработки</span></a></li>
                                  <li><a><span className="tag is-info is-light has-text-weight-bold is-uppercase">В работе</span></a></li>
                                  <li><a><span className="tag has-text-weight-bold is-uppercase">На уточнении</span></a></li>
                                  <li><a><span className="tag is-success is-light has-text-weight-bold is-uppercase">Завершённые</span></a></li>
                              </ul>
                          </li>
                      </ul>
                  </aside>

              </div>
              <div className="column mt-4 is-expanded">
                  <div className="level">
                      <div className="level-left">
                      </div>
                      <div className="level-right">
                          <button className="button is-info">Создать задачу</button>
                      </div>
                  </div>



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
                                              <span>Статус: <span className="tag is-info is-light has-text-weight-bold is-uppercase">В работе</span></span>
                                              <span className="icon is-small">
                      <i className="fas fa-angle-down" aria-hidden="true"></i>
                    </span>
                                          </button>
                                      </div>
                                      <div className="dropdown-menu" id="dropdown-menu" role="menu">
                                          <div className="dropdown-content">
                                              <a className="dropdown-item"><span className="tag is-link is-light has-text-weight-bold is-uppercase">Ожидает разработки</span></a>
                                              <a className="dropdown-item"><span className="tag is-info is-light has-text-weight-bold is-uppercase">В работе</span></a>
                                              <a className="dropdown-item"><span className="tag has-text-weight-bold is-uppercase">На уточнении</span></a>
                                              <a className="dropdown-item"><span className="tag is-success is-light has-text-weight-bold is-uppercase">Завершено</span></a>
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

                                                      <input className="input" type="text" placeholder="Поиск" />

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
                                  Необходимо придумать концепцию и разработать финальный проект, который ярко завершит обучение в Elbrus Bootcamp.<br/><br/>
                                  Требования:
                                  <ul>
                                      <li>Проект должен быть достаточно сложный</li>
                                      <li>Проект должен быть групповым</li>
                                  </ul>
                              </p>
                              <br />
                              <strong>Оценка: 36 ч</strong>
                          </div>
                      </div>
                  </div>
                  <div className="card">
                      <div className="card-content">
                          <div className="media">
                              <div className="media-content">
                                  <h1 className="title">ELBRUS-265</h1>
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
                                              <span>Статус: <span className="tag has-text-weight-bold is-uppercase">На уточнении</span></span>
                                              <span className="icon is-small">
                      <i className="fas fa-angle-down" aria-hidden="true"></i>
                    </span>
                                          </button>
                                      </div>
                                      <div className="dropdown-menu" id="dropdown-menu" role="menu">
                                          <div className="dropdown-content">
                                              <a className="dropdown-item"><span className="tag is-link is-light has-text-weight-bold is-uppercase">Ожидает разработки</span></a>
                                              <a className="dropdown-item"><span className="tag is-info is-light has-text-weight-bold is-uppercase">В работе</span></a>
                                              <a className="dropdown-item"><span className="tag has-text-weight-bold is-uppercase">На уточнении</span></a>
                                              <a className="dropdown-item"><span className="tag is-success is-light has-text-weight-bold is-uppercase">Завершено</span></a>
                                          </div>
                                      </div>
                                  </div>
                                  <div className="dropdown is-hoverable">
                                      <div className="dropdown-trigger">
                                          <button className="button" aria-haspopup="true" aria-controls="dropdown-menu">
                                              <span>Ответственный: @petya</span>
                                              <span className="icon is-small">
                      <i className="fas fa-angle-down" aria-hidden="true"></i>
                    </span>
                                          </button>
                                      </div>
                                      <div className="dropdown-menu" id="dropdown-menu" role="menu">
                                          <div className="dropdown-content">
                                              <div className="dropdown-item">
                                                  <div className="field">

                                                      <input className="input" type="text" placeholder="Поиск" />

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
                                  Почините уже логу и регу!!!<br/><br/>
                              </p>
                              <br />
                              <strong>Оценка: 999 ч</strong>
                          </div>
                      </div>
                  </div>
              </div>
          </div>
      </div>
)
}
