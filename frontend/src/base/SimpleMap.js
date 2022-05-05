import { MapContainer, TileLayer, useMap, Popup, Marker } from "react-leaflet";

import "leaflet/dist/leaflet.css";
import L from "leaflet";
import iconMarker from "leaflet/dist/images/marker-icon.png";
import iconRetina from "leaflet/dist/images/marker-icon-2x.png";
import iconShadow from "leaflet/dist/images/marker-shadow.png";

import LocationOffIcon from "@mui/icons-material/LocationOff";
import Empty from "./Empty";

const icon = L.icon({
  iconRetinaUrl: iconRetina,
  iconUrl: iconMarker,
  shadowUrl: iconShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

const SimpleMap = ({ position, title, ...props }) => {
  if (!position.length) {
    return <Empty title="No position provided" Icon={LocationOffIcon} />;
  }

  return (
    <MapContainer
      style={{ minHeight: "500px", width: "100%" }}
      center={position.split(",").map((e) => Number(e))}
      zoom={13}
      scrollWheelZoom={false}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={position.split(",").map((e) => Number(e))} icon={icon}>
        <Popup>{title}</Popup>
      </Marker>
    </MapContainer>
  );
};

export default SimpleMap;
