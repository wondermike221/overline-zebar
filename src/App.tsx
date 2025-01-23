import { useEffect, useState } from "react";
import * as zebar from "zebar";
import { Center } from "./components/Center";
import { TilingControl } from "./components/TilingControl";
import { WindowTitle } from "./components/WindowTitle";
import { WorkspaceControls } from "./components/WorkspaceControls";
import CurrentTrack from "./components/currentTrack";
import { Chip } from "./components/ui/Chip";
import { LabelType, Stat, StatRing, Thresholds } from "./components/ui/Stat";
import { useAutoTiling } from "./utils/useAutoTiling";
import { getWeatherIcon } from "./utils/weatherIcons";
import VolumeControl from "./components/volumeControl";

const providers = zebar.createProviderGroup({
  media: { type: "media" },
  network: { type: "network" },
  glazewm: { type: "glazewm" },
  cpu: { type: "cpu" },
  date: { type: "date", formatting: "EEE d MMM t", locale: "en-GB" },
  memory: { type: "memory" },
  weather: { type: "weather" },
  audio: { type: "audio" },
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
    <div className="relative flex justify-between items-center bg-background-deeper/70 backdrop-blur-3xl text-text h-full antialiased">
      <div className="flex items-center gap-2 h-full z-10 pl-2.5">
        <div className="flex items-center gap-2 h-full py-2">
          <TilingControl glazewm={output.glazewm} />
        </div>
        <div className="flex items-center gap-2 h-full">
          <WorkspaceControls glazewm={output.glazewm} />
        </div>
        <div className="flex items-center justify-center gap-2 h-full">
          <CurrentTrack
            togglePlayPause={output.media?.togglePlayPause}
            next={output.media?.next}
            previous={output.media?.previous}
            allSessions={output?.media?.allSessions}
          />
        </div>
      </div>

      <div className="absolute w-full h-full flex items-center justify-center py-1.5 left-0">
        <Center>
          <WindowTitle glazewm={output.glazewm} />
        </Center>
      </div>

      <div className="flex gap-2 items-center h-full z-10">
        <div className="py-2.5 flex items-center h-full">
          <VolumeControl
            playbackDevice={output.audio?.defaultPlaybackDevice}
            setVolume={output.audio?.setVolume}
            statIconClassnames={statIconClassnames}
          />
        </div>

        <div className="py-1.5 h-full">
          <Chip className="flex items-center gap-3 h-full">
            {output.cpu && (
              <StatRing
                Icon={<p className="font-medium text-icon">CPU</p>}
                stat={`${Math.round(output.cpu.usage)}%`}
              />
            )}

            {output.memory && (
              <StatRing
                Icon={<p className="font-medium text-icon">RAM</p>}
                stat={`${Math.round(output.memory.usage)}%`}
              />
            )}

            {output.weather && (
              <Stat
                Icon={getWeatherIcon(output.weather, statIconClassnames)}
                stat={`${Math.round(output.weather.celsiusTemp)}°C`}
                threshold={weatherThreshold}
              />
            )}
          </Chip>
        </div>

        <div className="h-full flex items-center justify-center pr-2.5">
          {output?.date?.formatted ??
            new Intl.DateTimeFormat("en-GB", {
              weekday: "short", // EEE
              day: "numeric", // d
              month: "short", // MMM
              hour: "numeric", // t (hour part)
              minute: "numeric", // t (minute part)
            })
              .format(new Date())
              .replace(/,/g, "")}
        </div>
      </div>
    </div>
  );
}

export default App;
