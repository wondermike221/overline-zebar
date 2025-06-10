import type { Disk } from 'zebar';
import { StatRing, systemStatThresholds, Card } from '@overline-zebar/ui';
import { HardDrive } from 'lucide-react';

interface DiskItemProps {
  disk: Disk;
}

export default function DiskItem({ disk }: DiskItemProps) {
  const totalSpaceValue = disk.totalSpace.siValue;
  const totalSpaceUnit = disk.totalSpace.siUnit;
  const availableSpaceValue = disk.availableSpace.siValue;
  const availableSpaceUnit = disk.availableSpace.siUnit;

  const usedSpace = disk.totalSpace.bytes - disk.availableSpace.bytes;
  const usagePercentage =
    totalSpaceValue > 0 ? (usedSpace / disk.totalSpace.bytes) * 100 : 0;

  return (
    <Card>
      <div className="flex justify-between items-center">
        <div>
          <p className="font-medium text-text">
            {disk.name} ({disk.mountPoint})
          </p>
          <p className="text-muted-foreground mb-1.5">{disk.driveType}</p>
          <p className="text-muted-foreground">{`${availableSpaceValue.toFixed(
            2
          )} ${availableSpaceUnit} free of ${totalSpaceValue.toFixed(
            2
          )} ${totalSpaceUnit}`}</p>
        </div>
        <StatRing
          Icon={<HardDrive size={18} />}
          stat={`${usagePercentage.toFixed(0)}%`}
          threshold={systemStatThresholds}
        />
      </div>
    </Card>
  );
}
