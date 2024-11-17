import { Camera, LucideCpu, LucideMemoryStick } from "lucide-react";
import { useEffect, useState } from "react";
import * as zebar from "zebar";
import { Button } from "./components/Button";
import { Chip } from "./components/Chip";
import { TilingControl } from "./components/TilingControl";
import { WorkspaceControls } from "./components/WorkspaceControls";
import { getWeatherIcon } from "./utils/weatherIcons";
import { Center } from "./components/Center";

const providers = zebar.createProviderGroup({
  media: { type: "media" },
  network: { type: "network" },
  glazewm: { type: "glazewm" },
  cpu: { type: "cpu" },
  date: { type: "date", formatting: "EEE d MMM t" },
  memory: { type: "memory" },
  weather: { type: "weather" },
});

function App() {
  const [output, setOutput] = useState(providers.outputMap);

  useEffect(() => {
    providers.onOutput(() => setOutput(providers.outputMap));
  }, []);

  const statIconClassnames = "h-4 w-4 text-icon";

  return (
    <div className="relative flex justify-between items-center bg-background/60 backdrop-blur-lg text-text h-full border border-app-border px-3">
      <div className="flex items-center gap-8">
        <WorkspaceControls output={output} />
      </div>

      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 h-full py-1.5">
        <Center output={output} />
      </div>

      <div className="flex gap-4 items-center">
        <div className="flex items-center gap-2">
          <TilingControl output={output} />

          <Button
            className="h-full"
            onClick={() =>
              output.glazewm.runCommand("shell-exec explorer ms-screenclip:")
            }
          >
            <Camera className="h-4 w-4 text-text" />
          </Button>
        </div>

        <div className="flex items-center gap-3">
          {output.cpu && (
            <Chip
              Icon={
                <LucideCpu className={statIconClassnames} strokeWidth={2.15} />
              }
              stat={`${Math.round(output.cpu.usage)}%`}
            />
          )}
          {output.memory && (
            <Chip
              Icon={
                <LucideMemoryStick
                  className={statIconClassnames}
                  strokeWidth={2.15}
                />
              }
              stat={`${Math.round(output.memory.usage)}%`}
            />
          )}
          {output.weather && (
            <Chip
              Icon={getWeatherIcon(output.weather, statIconClassnames)}
              stat={`${Math.round(output.weather.celsiusTemp)}°C`}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
