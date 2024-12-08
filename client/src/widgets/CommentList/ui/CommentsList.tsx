import {useEffect, useState} from 'react';
import {useAppDispatch} from "@/shared/hooks/rtkHooks.ts";
import {CommentType, getComments, Comment} from "@/entities/comment";
import {CommentAddForm} from "@/widgets/CommentList";


type propsCommentList = {
    breedId: number;
}

export function CommentsList({breedId}: propsCommentList): JSX.Element {
    const[comments, setComments] = useState<CommentType[]>([]);
    const dispatch = useAppDispatch();

    function loadComments(): void {
        dispatch(getComments(breedId))
            .then((action) => {
                if (getComments.fulfilled.match(action)) {
                    setComments(action.payload);
                }
        })
    }

    useEffect((): void => {
        loadComments()
    }, [])

    return (
        <>
            {comments.map((comment: CommentType): JSX.Element => <Comment data={comment} key={comment.id}/> )}

            <CommentAddForm breedId={breedId} onCommentAdd={loadComments} />
        </>
    );
}

