import { Button } from "@overline-zebar/ui";
import { Cloud, Cpu, Globe, HardDrive, LucideIcon, MemoryStick, Network, Server } from "lucide-react";
import { Link, useLocation } from "wouter";
import { cn } from "../../utils/cn";

export default function Navbar() {
	return (
		<div className="h-full border-r border-border rounded-tl rounded-bl flex flex-col overflow-clip">
			<IconNavbarItem Icon={Server} href="/" />
			<IconNavbarItem Icon={HardDrive} href="" />
			<IconNavbarItem Icon={Cpu} href="" />
			<IconNavbarItem Icon={Globe} href="" />
			<IconNavbarItem Icon={MemoryStick} href="" />
			<IconNavbarItem Icon={Network} href="" />
			<IconNavbarItem Icon={Cloud} href="" />
		</div>
	)
}

// if navbar reaches bottom of widget: 
//last:rounded-b last:rounded-br-none"
function IconNavbarItem({ Icon, href }: { Icon: LucideIcon, href: string }) {
	const [location, navigate] = useLocation();
	const handleClick = () => {
		navigate(href)
	}
	return (
		<Button
			onClick={handleClick}
			className={
				cn(
					"w-fit h-full px-2 bg-button/60 border-border border-b border-t-0 border-x-0 rounded-none last:border-b-0",
					location === href && "bg-background hover:bg-background text-text"
				)
			}
		>
			<Icon className="h-4 w-4" />
		</Button>
	)
}

