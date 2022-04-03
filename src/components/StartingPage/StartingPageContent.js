import { useContext,useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getAllItems } from "../../store/api";
import  useHttp  from "../../store/use-http";
import AuthContext from '../../store/auth-context';

const StartingPageContent = () => {
  const [videos, setVideos] = useState([]);
  const [isFetched, setIsFetched] = useState(false);
  const authCtx = useContext(AuthContext);
  const isLoggedIn = authCtx.isLoggedIn;


  const {
    sendRequest,
    status,
    data: data,
    error,
  } = useHttp(getAllItems, true);

  useEffect(() => {
    sendRequest();
    setVideos(data);
    setIsFetched(true)
  }, [sendRequest]);

    let showCat=[];
    let catVideos=[]

    if(status==='completed'){
      //get categories
      const propertyValues = Object.values(data);
      let propValMap = propertyValues.map(v=>(v.category))
      let unique = propValMap.filter((v, i, a) => a.indexOf(v) === i);
      showCat.push(...unique)
      //get videos per category
      const propertysValues = Object.values(data);
      catVideos.push(...propertysValues)
    }

    let renderen=showCat.map((m)=><ul key={Math.random()}>{m}
    {catVideos.filter((f)=>f.category===m)
              .map((ma)=><li key={Math.random()}><Link to={`/videos/${ma.category}/${ma.title}`}>{ma.title}</Link></li>)}
    </ul>)
  
    if (error) {
      return <div>{error}</div>;
    }
  
  return (
    <section className='container'>
      {isLoggedIn && <h1>{renderen}</h1>}
      {!isLoggedIn && <h1>Please login to see the content.</h1>}
    </section>
  );
};

export default StartingPageContent;
