import { useAppDispatch } from "../../store/hooks";
import {
	setShowFavourites,
	setSelectedFeed,
} from "../../store/slices/feeds/feedsSlice";
import { ArticlesLayout } from "../articles/ArticlesLayout";
import { useArticlesSectionData } from "./hooks/useArticlesSectionData";

interface ArticlesSectionProps {
	showFilters?: boolean;
}

export const ArticlesSection = ({ showFilters }: ArticlesSectionProps) => {
	const dispatch = useAppDispatch();
	const { view, filteredArticles, selectedFeed } = useArticlesSectionData();

	switch (view) {
		case "favourites":
			return (
				<ArticlesLayout
					showFilters={showFilters}
					title="Favourite articles"
					onBackClick={() => dispatch(setShowFavourites(false))}
					articles={filteredArticles.favourites}
				/>
			);

		case "selectedFeed":
			return (
				<ArticlesLayout
					showFilters={showFilters}
					title={selectedFeed?.title}
					onBackClick={() => dispatch(setSelectedFeed(""))}
					articles={filteredArticles.selectedFeed}
				/>
			);

		case "all":
		default:
			return (
				<ArticlesLayout
					showFilters={showFilters}
					title={"All Articles"}
					articles={filteredArticles.all}
				/>
			);
	}
};
