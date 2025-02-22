import { Feature } from "@/types/feature";
import { FaBuilding, FaFilm, FaCalendarAlt } from "react-icons/fa";

const featuresData = [
  {
    id: 1,
    icon: <FaBuilding size={37} color="white" />, 
    title: "Construction & Infrastructure",
    paragraph: "Residential, commercial, and industrial projects. We provide high-quality construction and engineering solutions."
  },
  {
    id: 2,
    icon: <FaFilm size={37} color="white" />, 
    title: "Media & Entertainment",
    paragraph: "TV, radio, documentaries, and advertising. We provide high-quality media and entertainment solutions."
  },
  {
    id: 3,
    icon: <FaCalendarAlt size={37} color="white" />, 
    title: "Event Management",
    paragraph: "Corporate, cultural, and social events. We provide high-quality event management solutions."
  }
];

export default featuresData;
