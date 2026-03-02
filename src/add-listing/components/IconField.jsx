import { Icon } from "lucide-react";
import React from "react";
import {
  FaClipboardList,
  FaTag,
  FaDollarSign,
  FaMoneyBillAlt,
  FaCar,
  FaCheckCircle,
  FaIndustry,
  FaCarSide,
  FaCalendarAlt,
  FaRoad,
  FaCogs,
  FaGasPump,
  FaTachometerAlt,
  FaWrench,
  FaCircle,
  FaPalette,
  FaDoorClosed,
  FaIdCard,
  FaTags,
  FaFileAlt,
} from "react-icons/fa";




// 🔥 Icon Map (ALL icons from your JSON)
const iconMap = {
  FaClipboardList: <FaClipboardList />,
  FaTag: <FaTag />,
  FaDollarSign: <FaDollarSign />,
  FaMoneyBillAlt: <FaMoneyBillAlt />,
  FaCar: <FaCar />,
  FaCheckCircle: <FaCheckCircle />,
  FaIndustry: <FaIndustry />,
  FaCarSide: <FaCarSide />,
  FaCalendarAlt: <FaCalendarAlt />,
  FaRoad: <FaRoad />,
  FaCogs: <FaCogs />,
  FaGasPump: <FaGasPump />,
  FaTachometerAlt: <FaTachometerAlt />,
  FaWrench: <FaWrench />,
  FaCircle: <FaCircle />,
  FaPalette: <FaPalette />,
  FaDoorClosed: <FaDoorClosed />,
  FaIdCard: <FaIdCard />,
  FaTags: <FaTags />,
  FaFileAlt: <FaFileAlt />,
};

export default function IconField({icon}) {
  return (
    <div className="text-primary bg-blue-200 p-1.5 rounded-full">{iconMap[icon]}</div>
  )
}