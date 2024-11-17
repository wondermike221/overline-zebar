import {
  Cloud,
  CloudDrizzle,
  CloudLightning,
  CloudMoon,
  CloudRain,
  CloudSnow,
  CloudSun,
  Moon,
  Sun,
} from "lucide-react";

export const getWeatherIcon = (weatherOutput, iconClass) => {
  switch (weatherOutput.status) {
    case "clear_day":
      return <Sun strokeWidth={2.15} className={iconClass} />;
    case "clear_night":
      return <Moon strokeWidth={2.15} className={iconClass} />;
    case "cloudy_day":
      return <CloudSun strokeWidth={2.15} className={iconClass} />;
    case "cloudy_night":
      return <CloudMoon strokeWidth={2.15} className={iconClass} />;
    case "light_rain_day":
      return <CloudDrizzle strokeWidth={2.15} className={iconClass} />;
    case "light_rain_night":
      return <CloudDrizzle strokeWidth={2.15} className={iconClass} />; // Reuse CloudDrizzle for night
    case "heavy_rain_day":
      return <CloudRain strokeWidth={2.15} className={iconClass} />;
    case "heavy_rain_night":
      return <CloudRain strokeWidth={2.15} className={iconClass} />; // Reuse CloudRain for night
    case "snow_day":
      return <CloudSnow strokeWidth={2.15} className={iconClass} />;
    case "snow_night":
      return <CloudSnow strokeWidth={2.15} className={iconClass} />; // Reuse CloudSnow for night
    case "thunder_day":
      return <CloudLightning strokeWidth={2.15} className={iconClass} />;
    case "thunder_night":
      return <CloudLightning strokeWidth={2.15} className={iconClass} />; // Reuse CloudLightning for night
    default:
      return <Cloud strokeWidth={2.15} className={iconClass} />; // Return null or a default icon if needed
  }
};
