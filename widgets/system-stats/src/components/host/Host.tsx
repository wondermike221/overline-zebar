import { BatteryOutput, HostOutput } from "zebar";
import { BatterySection } from "./components/BatterySection";
import { formatMsToHumanDuration } from "../../utils/time";
import { Button } from "@overline-zebar/ui";

export default function Host({ host, battery }: { host: HostOutput | null, battery: BatteryOutput | null }) {
	if (!host) return null;

	const bootedAt = new Date(Number(host.bootTime));
	const uptimeDisplay = formatMsToHumanDuration(Number(host.uptime));

	return (
		<div className="px-3 py-2 flex flex-col justify-between select-text w-full text-text-muted">
			<div className="space-y-1.5">

				<div className="flex items-start">
					<div className="text-text border-text-muted/40 w-full">
						<div className="w-full overflow-hidden">
							<p className="font-medium truncate whitespace-nowrap overflow-hidden">
								{host.osName} - {host.friendlyOsVersion}
							</p>
						</div>
						<p>{host.hostname}</p>
					</div>
				</div>


				<div>
					<p>Booted at {bootedAt.toLocaleTimeString()}</p>
					<p>Up for {uptimeDisplay}</p>
				</div>
			</div>
			<div>
				{battery && <BatterySection battery={battery} />}
			</div>
		</div>
	);
}
