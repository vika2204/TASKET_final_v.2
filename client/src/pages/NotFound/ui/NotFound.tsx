import {Link} from "react-router-dom";
import {CLIENT_ROUTES} from "@/app/router";

export function NotFound() {
    return (
        <div style={{textAlign: 'center'}}>
            <div>
                <img src="/404.jpg" style={{width: '600px'}}/>
            </div>
            <div>
                <Link className="button" to={ CLIENT_ROUTES.HOME}>Вернуться на главную</Link>
            </div>
        </div>
    );
}
