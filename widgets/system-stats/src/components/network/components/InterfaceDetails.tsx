import { Card, CardTitle } from "@overline-zebar/ui";
import { ArrowDown, Globe, Rss } from "lucide-react";
import * as zebar from "zebar";
import List from "./List";

const formatSpeed = (bytesPerSecond: number | null | undefined): string => {
  if (!bytesPerSecond || bytesPerSecond < 0) return "N/A";
  if (bytesPerSecond === 0) return "0 Mbps";
  const bps = bytesPerSecond * 8;
  if (bps >= 1_000_000) return `${(bps / 1_000_000).toFixed(2)} Mbps`;
  if (bps >= 1_000) return `${(bps / 1_000).toFixed(2)} Kbps`;
  return `${bps.toFixed(2)} bps`;
};

interface Props {
  iface: zebar.NetworkInterface;
}

export default function InterfaceDetails({ iface }: Props) {
  return (
    <div className="space-y-6">
      <h3 className="font-medium">
        {iface.friendlyName || iface.name} ({iface.type})
      </h3>
      <p className="">{iface.description}</p>
      <section className="space-y-1.5">
        <h3
          className="font-medium flex items-center text-text-muted gap-2"
        >
          <Rss className="h-5 w-5" aria-hidden="true" />
          Connection Speed
        </h3>
        <div className="grid grid-cols-2 gap-2">
          <Card className="space-y-1.5">
            <CardTitle icon={<ArrowDown />}>Receive</CardTitle>
            {formatSpeed(iface.receiveSpeed)}
          </Card>
          <Card className="space-y-1.5">
            <div className="text-text-muted">Transmit</div>
            <div
              className="text-text"
            >
              {iface.transmitSeed}
            </div>
          </Card>
        </div>
      </section>

      <section className="space-y-1.5">
        <h3
          className="font-medium flex items-center text-text-muted gap-2"
        >
          <Globe className="h-5 w-5" aria-hidden="true" />
          Network Addresses
        </h3>

        <Card className="space-y-1.5">
          <div>
            <p className="text-text-muted">MAC Address</p>
            <p>{iface.macAddress || "N/A"}</p>
          </div>
          <div>
            <p className="text-text-muted">IPv4 Addresses</p>
            <List ips={iface.ipv4Addresses} />
          </div>
          <div>
            <p className="text-text-muted">IPv6 Addresses</p>
            <List ips={iface.ipv6Addresses} />
          </div>
          <div>
            <p className="text-text-muted">DNS Servers</p>
            <List ips={iface.dnsServers} />
          </div>
        </Card>
      </section>
    </div>
  );
}
