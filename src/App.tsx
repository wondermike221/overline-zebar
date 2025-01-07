import { LucideCpu, LucideMemoryStick } from "lucide-react";
import { useEffect, useState } from "react";
import * as zebar from "zebar";
import { Center } from "./components/Center";
import { TilingControl } from "./components/TilingControl";
import { WorkspaceControls } from "./components/WorkspaceControls";
import { Chip } from "./components/ui/Chip";
import Divider from "./components/ui/Divider";
import { LabelType, Stat, Thresholds } from "./components/ui/Stat";
import { useAutoTiling } from "./utils/useAutoTiling";
import { getWeatherIcon } from "./utils/weatherIcons";
import { WindowTitle } from "./components/WindowTitle";
import CurrentTrack from "./components/CurrentTrack";

const providers = zebar.createProviderGroup({
  media: { type: "media" },
  network: { type: "network" },
  glazewm: { type: "glazewm" },
  cpu: { type: "cpu" },
  date: { type: "date", formatting: "EEE d MMM t" },
  memory: { type: "memory" },
  weather: { type: "weather" },
});

const weatherThreshold: Thresholds = [
  { min: -10, max: 0, label: LabelType.DANGER }, // Extremely cold (dangerous conditions)
  { min: 1, max: 15, label: LabelType.DEFAULT }, // Typical cold to mild weather
  { min: 16, max: 25, label: LabelType.WARNING }, // Warmer than usual
  { min: 26, max: 35, label: LabelType.DANGER }, // Unusually hot (dangerous conditions)
];

function App() {
  const [output, setOutput] = useState(providers.outputMap);

  useEffect(() => {
    providers.onOutput(() => setOutput(providers.outputMap));
  }, []);

  useAutoTiling();

  const statIconClassnames = "h-3 w-3 text-icon";

  return (
    <div className="relative flex justify-between items-center bg-background/80 backdrop-blur-lg text-text h-full border border-app-border/80 px-2.5 antialiased py-2 rounded-md">
      <div className="flex items-center gap-2 h-full">
        <div className="flex items-center gap-2 h-full">
          <TilingControl glazewm={output.glazewm} />
        </div>
        <WorkspaceControls glazewm={output.glazewm} />
      </div>

      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 h-full py-1.5">
        <Center>
          <WindowTitle glazewm={output.glazewm} />
          <CurrentTrack {...output?.media?.session} />
        </Center>
      </div>

      <div className="flex gap-2.5 items-center h-full">
        <Chip className="flex items-center gap-2.5 h-full">
          {output.cpu && (
            <Stat
              Icon={
                <LucideCpu
                  className={statIconClassnames}
                  strokeWidth={3}
                  size={16}
                />
              }
              stat={`${Math.round(output.cpu.usage)}%`}
            />
          )}
          <Divider />
          {output.memory && (
            <Stat
              Icon={
                <LucideMemoryStick
                  className={statIconClassnames}
                  strokeWidth={3}
                  size={16}
                />
              }
              stat={`${Math.round(output.memory.usage)}%`}
            />
          )}
          <Divider />
          {output.weather && (
            <Stat
              Icon={getWeatherIcon(output.weather, statIconClassnames)}
              stat={`${Math.round(output.weather.celsiusTemp)}°C`}
              threshold={weatherThreshold}
            />
          )}
        </Chip>

        {output?.date?.formatted}
      </div>
    </div>
  );
}

export default App;
