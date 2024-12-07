import {CommentType} from "@/entities/comment/model";

type propsComment = {
    data: CommentType;
}

export function Comment(props: propsComment ): JSX.Element {
    return (
        <>
            <div className="box">
                <b>@{props.data.author.username}</b> {props.data.text}
            </div>
        </>
    );
}

