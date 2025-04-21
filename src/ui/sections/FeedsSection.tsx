import { FeedsList } from "../feeds/FeedsList";
import { SectionHeader } from "./SectionHeader";

interface FeedsSectionProps {
	showFilters?: boolean;
}

export const FeedsSection = ({ showFilters }: FeedsSectionProps) => {
	return (
		<>
			<SectionHeader title={"Feeds"} showFilters={showFilters} />
			<FeedsList />
		</>
	);
};
