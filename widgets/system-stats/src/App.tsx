import { useEffect, useState } from "react";
import { Route, Router, Switch } from "wouter";
import { useHashLocation } from "wouter/use-hash-location";
import * as zebar from "zebar";
import Navbar from "./components/navbar";
import Host from "./components/host";

const providers = zebar.createProviderGroup({
  cpu: { type: "cpu" },
  memory: { type: "memory" },
  weather: { type: "weather" },
  host: { type: "host" },
  battery: { type: "battery" },
});

function App() {
  const [output, setOutput] = useState(providers.outputMap);

  useEffect(() => {
    providers.onOutput(() => setOutput(providers.outputMap));

    // zebar.currentWidget().tauriWindow.listen("tauri://blur", () => {
    //   zebar.currentWidget().close();
    // });
  }, []);

  const sampleBattery = {
    chargePercent: 76,
    healthPercent: 92,
    cycleCount: 483,
    state: "discharging", // can also be: 'charging', 'full', 'empty', 'unknown'
    isCharging: true,
    timeTillEmpty: 7200000, // 2 hours in ms
    timeTillFull: 7200000, // since not charging
    powerConsumption: 12.5, // in watts
    voltage: 11.4 // in volts
  } satisfies zebar.BatteryOutput;

  return (
    <Router hook={useHashLocation}>
      <div className="relative flex justify-between shadow-sm items-center bg-background/95 border border-button-border/80 backdrop-blur-3xl text-text h-full antialiased select-none rounded-lg font-mono">
        <div className="flex w-full h-full">
          <div className="flex flex-col">
            <Navbar />
          </div>

          <Switch>
            <Route path="/" component={() => <Host host={output.host} battery={sampleBattery} />} />
          </Switch>
        </div>
      </div>
    </Router>
  );
}

export default App;
