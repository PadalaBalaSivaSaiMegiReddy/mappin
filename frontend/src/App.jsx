import './App.css'
import Map,{Marker,Popup} from 'react-map-gl';
import { FaMapMarkerAlt } from "react-icons/fa";
import { FaStar } from "react-icons/fa";
import 'mapbox-gl/dist/mapbox-gl.css';


export default function App() {
  return <Map
  mapboxAccessToken={import.meta.env.VITE_APP_MAPBOX}
  initialViewState={{
    longitude: 77.216721,
    latitude: 28.644800,
    zoom: 4
  }}
  style={{width: "100vw", height: "100vh"}}
  mapStyle="mapbox://styles/mapbox/streets-v9"
>
<Marker longitude={78.042068} latitude={27.173891} anchor="bottom" >
  {/* <img src='./public/pin-icon'/> */}
  <FaMapMarkerAlt style={{fontSize:20,color:"slateblue"}}/>
    </Marker>
    {/* <Popup longitude={78.042068} latitude={27.173891} closeButton={true} closeOnClick={false}
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
      </Popup> */}
</Map>
}
