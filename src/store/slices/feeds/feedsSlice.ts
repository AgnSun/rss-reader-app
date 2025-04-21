import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Article {
	id: string;
	title: string;
	link: string;
	description: string;
	pubDate: string;
	image: string;
	sourceUrl: string;
}

export interface Feed {
	title: string;
	url: string;
	items: Article[];
}

export interface FeedsState {
	items: Feed[];
	selectedFeed: Feed | null;
	favouriteArticles: string[];
	showFavourites: boolean;
	selectedArticle: string | null;
	readArticles: string[];
	articleFilter: "all" | "read" | "unread";
}

const initialState: FeedsState = {
	items: [],
	selectedFeed: null,
	favouriteArticles: [],
	showFavourites: false,
	selectedArticle: null,
	readArticles: [],
	articleFilter: "all",
};

const feedsSlice = createSlice({
	name: "feeds",
	initialState,
	reducers: {
		addFeed: (state, action: PayloadAction<Feed>) => {
			state.items.push(action.payload);
		},
		deleteFeed: (state, action: PayloadAction<string>) => {
			const feedUrlToDelete = action.payload;

			const articlesToRemove =
				state.items
					.find((feed) => feed.url === feedUrlToDelete)
					?.items.map((a) => a.id) || [];

			state.items = state.items.filter((feed) => feed.url !== feedUrlToDelete);

			state.favouriteArticles = state.favouriteArticles.filter(
				(id) => !articlesToRemove.includes(id)
			);

			state.readArticles = state.readArticles.filter(
				(id) => !articlesToRemove.includes(id)
			);

			if (state.selectedFeed?.url === feedUrlToDelete) {
				state.selectedFeed = null;
			}
		},
		setSelectedFeed: (state, action: PayloadAction<string>) => {
			state.selectedFeed =
				state.items.find((feed) => feed.url === action.payload) || null;
			state.showFavourites = false;
		},
		toggleFavouriteArticle: (state, action: PayloadAction<string>) => {
			const id = action.payload;
			if (state.favouriteArticles.includes(id)) {
				state.favouriteArticles = state.favouriteArticles.filter(
					(articleId) => articleId !== id
				);
			} else {
				state.favouriteArticles.push(id);
			}
		},
		setShowFavourites: (state, action: PayloadAction<boolean>) => {
			state.showFavourites = action.payload;
			state.selectedFeed = null;
		},
		setSelectedArticle: (state, action: PayloadAction<string | null>) => {
			state.selectedArticle = action.payload;
		},
		toggleReadArticle: (state, action: PayloadAction<string>) => {
			const id = action.payload;
			if (state.readArticles.includes(id)) {
				state.readArticles = state.readArticles.filter(
					(articleId) => articleId !== id
				);
			} else {
				state.readArticles.push(id);
			}
		},
		setArticleFilter: (
			state,
			action: PayloadAction<"all" | "read" | "unread">
		) => {
			state.articleFilter = action.payload;
		},
	},
});

export const {
	addFeed,
	deleteFeed,
	setSelectedFeed,
	toggleFavouriteArticle,
	setShowFavourites,
	setSelectedArticle,
	toggleReadArticle,
	setArticleFilter,
} = feedsSlice.actions;
export default feedsSlice.reducer;
