import { Article } from "../../../store/slices/feeds/feedsSlice";
import { useAppSelector } from "../../../store/hooks";
import { selectAllArticles } from "../../../store/slices/feeds/feedsSelectors";

type ViewMode = "favourites" | "selectedFeed" | "all";

export const useArticlesSectionData = () => {
	const favouriteArticlesId = useAppSelector(
		(state) => state.feeds.favouriteArticles
	);
	const allArticles = useAppSelector(selectAllArticles);
	const selectedFeed = useAppSelector((state) => state.feeds.selectedFeed);
	const articleFilter = useAppSelector((state) => state.feeds.articleFilter);
	const showFavourites = useAppSelector((state) => state.feeds.showFavourites);
	const readArticleIds = useAppSelector((state) => state.feeds.readArticles);
	const favouriteArticles = allArticles.filter((article) =>
		favouriteArticlesId.includes(article.id)
	);

	const filterArticles = (articles: Article[]) => {
		switch (articleFilter) {
			case "read":
				return articles.filter((article) =>
					readArticleIds.includes(article.id)
				);
			case "unread":
				return articles.filter(
					(article) => !readArticleIds.includes(article.id)
				);
			default:
				return articles;
		}
	};

	let view: ViewMode = "all";

	if (showFavourites) {
		view = "favourites";
	} else if (selectedFeed) {
		view = "selectedFeed";
	}

	return {
		view,
		selectedFeed,
		filteredArticles: {
			favourites: filterArticles(favouriteArticles),
			selectedFeed: filterArticles(selectedFeed?.items ?? []),
			all: filterArticles(selectedFeed?.url ? selectedFeed.items : allArticles),
		},
	};
};
