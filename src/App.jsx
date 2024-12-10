import { useRef, useEffect } from "react";
import { useAuth } from "./context/auth";
import mapboxgl from "mapbox-gl";

import MenuIcon from "./assets/icons/menuIcon";

import "mapbox-gl/dist/mapbox-gl.css";

import "./App.css";

function App() {
  const mapRef = useRef();
  const mapContainerRef = useRef();
  const { user } = useAuth();
  // const { logout } = useAuth();

  // const handleLogout = () => {
  //   logout(); // Remove o token
  // };
  console.log(user);
  useEffect(() => {
    mapboxgl.accessToken =
      "pk.eyJ1IjoibWFyY2lvc2FyYWl2YSIsImEiOiJjbTQ0eXB5ZTMwc2VnMmxvbmlkdzJ3NHExIn0.8VWTQqv3IOUYORp1cuoZsg";
    mapRef.current = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: "mapbox://styles/marciosaraiva/cm41yyp8m00m001qrdc6xav6x",
      center: [-45.45552, -12.0127],
      zoom: 15,
    });

    return () => {
      mapRef.current.remove();
    };
  }, []);

  return (
    <div className="h-screen">
      <div className="absolute top-[59px] z-10 flex w-full justify-between bg-transparent pl-[20px] pr-[20px]">
        <button className="h-[50px] w-[50px] rounded-full border-[1px] border-[#EAC00F] bg-blue-500 shadow-md"></button>
        <button className="flex h-[60px] w-[60px] items-center justify-center bg-[#181A18CC]">
          <MenuIcon />
        </button>
      </div>
      <div
        className="absolute w-full"
        id="map-container"
        ref={mapContainerRef}
      />
    </div>
  );
}

export default App;
