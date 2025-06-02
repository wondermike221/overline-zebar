import { useEffect, useState } from "react";
import { Route, Router, Switch } from "wouter";
import { useHashLocation } from "wouter/use-hash-location";
import * as zebar from "zebar";
import Navbar from "./components/navbar/navbar";
import HostPanel from "./components/host-panel/HostPanel";

const providers = zebar.createProviderGroup({
  cpu: { type: "cpu" },
  memory: { type: "memory" },
  weather: { type: "weather" },
});

function App() {
  const [output, setOutput] = useState(providers.outputMap);

  useEffect(() => {
    providers.onOutput(() => setOutput(providers.outputMap));

    // zebar.currentWidget().tauriWindow.listen("tauri://blur", () => {
    //   zebar.currentWidget().close();
    // });
  }, []);

  return (
    <Router hook={useHashLocation}>
      <div className="relative flex justify-between items-center bg-background/80 border border-button-border/80 backdrop-blur-3xl text-text h-full antialiased select-none rounded-lg font-mono">
        <div className="flex w-full h-full">
          <div className="flex flex-col">
            <Navbar />
          </div>

          <Switch>
            <Route path="/" component={() => <HostPanel />} />
          </Switch>
        </div>
      </div>
    </Router>
  );
}

export default App;
