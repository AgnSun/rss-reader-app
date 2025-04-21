import { toggleFavouriteArticle } from "../../../store/slices/feeds/feedsSlice";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";

export const useRenderArticles = () => {
	const dispatch = useAppDispatch();
	const favouriteArticles = useAppSelector(
		(state) => state.feeds.favouriteArticles
	);
	const isArticleFavourite = (articleId: string) =>
		favouriteArticles.includes(articleId);
	const readArticles = useAppSelector((state) => state.feeds.readArticles);

	const isArticleRead = (articleId: string) => readArticles.includes(articleId);

	const handleAddToFavourities = (
		event: React.MouseEvent,
		articleId: string
	) => {
		event.stopPropagation();
		dispatch(toggleFavouriteArticle(articleId));
	};

	return { isArticleFavourite, isArticleRead, handleAddToFavourities };
};
