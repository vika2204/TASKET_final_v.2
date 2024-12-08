export function CommentAddForm(): JSX.Element {

  
  return (
    <>
      <article className="media">
        <div className="media-content">
          <div className="field">
            <p className="control">
              <textarea
                className="textarea"
                placeholder="Add a comment..."
              ></textarea>
            </p>
          </div>
          <div className="field">
            <p className="control">
              <button className="button">Оставить комментарий</button>
            </p>
          </div>
        </div>
      </article>
    </>
  );
}
