
import React from "react";

type ConnectionLightProps = {
  status: "online" | "offline" | "connecting";
};

const ConnectionLight: React.FC<ConnectionLightProps> = ({ status }) => {
  let colorClass = "";
  switch (status) {
    case "online":
      colorClass = "bg-green-500";
      break;
    case "offline":
      colorClass = "bg-red-500";
      break;
    case "connecting":
      colorClass = "bg-yellow-500 animate-pulse";
      break;
    default:
      colorClass = "bg-gray-500";
  }

  return (
    <div className="w-2 h-2 rounded-full shadow-lg">
      <div className={`w-full h-full rounded-full ${colorClass}`}></div>
    </div>
  );
};

export default ConnectionLight;

