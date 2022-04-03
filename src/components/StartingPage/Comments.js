import { useState } from "react"

const Comments=(props)=>{
    const [showComms,setShowComms] = useState(false);

    const showHandler=(e)=>{
        e.preventDefault()
        setShowComms(prevStatus=>!prevStatus)
    }
    
    const showComments = props.showComment.map((comm)=><li key={Math.random()}>{comm}</li>)
    let content = props.showComment.length < 1 ? <h3>There are not any comments yet.</h3> :
    props.showComment.length > 0 && <h4>{showComments}</h4>
    return(
        <>
        {showComms && content}
        <button className="btn comms" onClick={showHandler}>{!showComms ? 'Show comments' : 'Hide comments'}</button>
        </>
    )
}

export default Comments