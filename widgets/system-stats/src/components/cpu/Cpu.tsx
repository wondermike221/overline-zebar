import { Card, CardTitle } from "@overline-zebar/ui";
import { BarChart3, Brain, Zap } from "lucide-react";
import { CpuOutput } from "zebar";
import PanelLayout from "../common/PanelLayout";

interface CpuPanelProps {
  cpu: CpuOutput | null;
}

export default function Cpu({ cpu }: CpuPanelProps) {
  if (!cpu) {
    return (
      <PanelLayout title="CPU">
        <div className="flex flex-col justify-center items-center select-text w-full text-text-muted h-full">
          <p>CPU information not available.</p>
        </div>
      </PanelLayout>
    );
  }

  return (
    <PanelLayout title="CPU">
      {cpu.vendor && <h1 className="font-medium mb-1.5">{cpu.vendor}</h1>}
      <div className="flex gap-2 mb-1.5">
        <Card>
          <CardTitle Icon={BarChart3}>Usage</CardTitle>
          {`${cpu.usage.toFixed(1)}%`}
        </Card>
        <Card>
          <CardTitle Icon={Zap}>Usage</CardTitle>
          {`${cpu.frequency} GHz`}
        </Card>
      </div>
      <div className="flex gap-2">
        <Card>
          <CardTitle Icon={Brain}>Logical Cores</CardTitle>
          {`${cpu.logicalCoreCount}`}
        </Card>
        <Card>
          <CardTitle Icon={Brain}>Physical Cores</CardTitle>
          {`${cpu.physicalCoreCount}`}
        </Card>
      </div>
    </PanelLayout>
  );
}
