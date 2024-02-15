import { ElectionsList } from "@/components/ui/elections-list";

export default function ElectionsBrowser() {
	return (
		<div className="election">
			<ElectionsList heading="All Elections" />
		</div>
	);
}
