import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "../../store";

export const selectAllArticles = createSelector(
	[(state: RootState) => state.feeds.items, (items) => items],
	(items) => items.flatMap((feed) => feed.items)
);

export const selectArticleById = (id: string) =>
	createSelector([selectAllArticles], (articles) =>
		articles.find((article) => article.id === id)
	);
