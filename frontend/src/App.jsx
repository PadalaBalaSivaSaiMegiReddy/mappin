import './App.css'
import Map,{Marker,Popup} from 'react-map-gl';
import { FaMapMarkerAlt } from "react-icons/fa";
import { FaStar } from "react-icons/fa";
import 'mapbox-gl/dist/mapbox-gl.css';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { format} from 'timeago.js'

export default function App() {
  const currentUser="Jane";
  const [pins,setPins]=useState([]);
  const[currentPlaceId,setCurrentPlaceId]=useState(null);
  const [newPlace,setNewPlace]=useState(null);
  const handleMarkerClick=(id)=>{
    setCurrentPlaceId(id);
  }
  const handleAddClick=(e)=>{
    const {lng,lat}=e.lngLat;
    setNewPlace({
      lat:lat,
      long:lng
    })
  }

  useEffect(() => {
    const getPins = async () => {
      try {
        const allPins = await axios.get("http://localhost:8800/api/pins");
        setPins(allPins.data);
      } catch (err) {
        console.log(err);
      }
    };
    getPins();
  }, []);
  const defaultLat=newPlace?newPlace.lat:27;
  const defaultLong=newPlace?newPlace.long:78;

  console.log(newPlace && newPlace.lat)
  return (
    <Map
      mapboxAccessToken={import.meta.env.VITE_APP_MAPBOX}
      initialViewState={{
        longitude: defaultLong,
        latitude: defaultLat,
        zoom: 4
      }}
      onDblClick={handleAddClick}
      style={{ width: "100vw", height: "100vh" }}
      mapStyle="mapbox://styles/mapbox/streets-v9"
    >

  {pins.map((p)=>
<>

  <Marker longitude={p.long} latitude={p.lat} anchor="bottom" >
    <FaMapMarkerAlt onClick={()=>handleMarkerClick(p._id)} style={{fontSize:20,color:p.username===currentUser?"tomato":"slateblue"}}/>
    {p._id===currentPlaceId &&
    
    (<Popup longitude={p.long} latitude={p.lat} closeButton={true} closeOnClick={false}
    anchor="left">
          <div className="card">
            <label>Place</label>
            <h4 className='place'>{p.title}</h4>
            <label>Review</label>
            <p className="desc">{p.desc}</p>
            <label>Rating</label>
            <div className="stars">
            <FaStar className='star'/>
            <FaStar className='star'/>
            <FaStar className='star'/>
            <FaStar className='star'/>
            <FaStar className='star'/>
            </div>
            <label>Information</label>
            <span className="username">Created by <b>{p.username}</b></span>
            <span className="date">{format(p.createdAt)}</span>
          </div>
        </Popup>)
          }
      </Marker>
</>
  )}

  {newPlace&&

<Popup longitude={newPlace.long} latitude={newPlace.lat} closeButton={true} closeOnClick={false}
          anchor="left">
            <div>
              <form className='form'>
                <label>Title</label>
                <input placeholder='Enter a title'></input>
                <label>Review</label>
                <textarea placeholder='Review this place'/>
                <label>Rating</label>
                <select>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                </select>
                <button className='submitButton' type="submit">Add Pin</button>
                
              </form>
            </div>
</Popup>
}
{/* <>
<Marker longitude={28} latitude={30} anchor="bottom" >
<FaMapMarkerAlt style={{fontSize:20,color:"slateblue"}}/>
</Marker>
<Popup longitude={78.042068} latitude={27.173891} closeButton={true} closeOnClick={false}
anchor="left">
<div className="card">
<label>Place</label>
<h4 className='place'>Taj Mahal</h4>
<label>Review</label>
<p className="desc">Beautiful place. I like it.</p>
<label>Rating</label>
            <div className="stars">
            <FaStar className='star'/>
            <FaStar className='star'/>
            <FaStar className='star'/>
            <FaStar className='star'/>
            <FaStar className='star'/>
            </div>
            <label>Information</label>
            <span className="username">Created by <b>Megi</b></span>
            <span className="date">1 hour ago</span>
          </div>
        </Popup>
        </> */}

</Map>)
}
