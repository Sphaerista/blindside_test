import { useParams } from "react-router-dom";
import { useEffect,useState } from "react";
import { Link } from "react-router-dom";
import useHttp from "../store/use-http";
import { getAllItems } from "../store/api";
import CommentForm from "../components/StartingPage/CommentForm";
import Comments from "../components/StartingPage/Comments";

const VideoPage=()=>{
    const params = useParams()
    const { idVideo,idCategory } = params;
    const [videos, setVideos] = useState([]);
    const [comments,setComments]=useState([]);
    const [isFetched, setIsFetched] = useState(false);

    const {
        sendRequest,
        status,
        data: data,
        error,
      } = useHttp(getAllItems, true);
      
      useEffect(() => {
        setComments([])
          sendRequest();
          setVideos(data);
          setIsFetched(true)
        }, [sendRequest,params]);
        
        
        let renderen=[]
        let showVideo =[]

        if(status==='completed'){
        let catVideos=[];
        const propertysValues = Object.values(data);
        catVideos.push(...propertysValues)
        showVideo=catVideos.filter((f)=>(f.category)===idCategory && (f.title)===idVideo);
        let relevantVideo= catVideos.filter((f)=>(f.category)===idCategory && (f.title)!==idVideo);
        renderen = relevantVideo.map((m)=><li key={Math.random()}><Link to={`/videos/${m.category}/${m.title}`}>{m.title}</Link></li>)
}

if (error) {
    return <div>{error}</div>;
  }

  let updatedComms=[]
  const commentsHnadler=(v)=>{
    setComments(prevComms=>{
        updatedComms = [...prevComms];
        updatedComms.push(v)
        return updatedComms;
    })
  }

    return(
        <>
        <section className="container">
        {status==='completed' ? <> <div className="flexy"><iframe width="420" height="315"
        src={`https://www.youtube.com/embed/${showVideo[0].link}`}>
        </iframe>
        <div><h2>Relative videos for {idCategory} category</h2>
        <h3>{renderen}</h3></div></div>
        
        <div className="comies"><CommentForm onComments={commentsHnadler}/>
        <Comments showComment={comments}/> </div>
        </> : <h1>LOADING...</h1>}
        </section>
        </>
    )
}

export default VideoPage;