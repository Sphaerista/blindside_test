import { useRef } from "react";

const CommentForm=(props)=>{
    const commentTextRef = useRef();

    const submitFormHandler = (event) => {
        event.preventDefault();
        const enteredText = commentTextRef.current.value;
        props.onComments(enteredText)
        commentTextRef.current.value=''
      };

    return(
        <>
        <form className="form" onSubmit={submitFormHandler}>
      <div>
        <label htmlFor="comment">Leave your comment:</label>
        <textarea id="comment" ref={commentTextRef} ></textarea>
      </div>
      <div >
        <button className="btn">Add Comment</button>
      </div>
    </form>
        </>
    )
}

export default CommentForm;