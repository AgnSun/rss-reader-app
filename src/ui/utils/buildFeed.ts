import { v4 as uuidv4 } from "uuid";
import { getImageFromHTML } from "./getImageFromHtml";
import { Article, Feed } from "../../store/slices/feeds/feedsSlice";

type CustomFeedItem = {
	title?: string;
	link?: string;
	content?: string;
	contentSnippet?: string;
	pubDate?: string;
	isoDate?: string;
	enclosure?: {
		url?: string;
	};
	"media:thumbnail"?: {
		$?: {
			url?: string;
		};
	};
	"media:content"?: {
		$?: {
			url?: string;
		};
	};
	"content:encoded"?: string;
};

export type FeedData = {
	title?: string;
	url: string;
	items: CustomFeedItem[];
};

export const buildFeed = (feeds: FeedData, url: string): Feed => {
	const articles: Article[] = feeds.items.map((item) => ({
		id: uuidv4(),
		title: item.title ?? "",
		link: item.link ?? "",
		description: item.contentSnippet ?? item.content ?? "",
		pubDate: item.pubDate ?? "",
		image:
			item.enclosure?.url ??
			item["media:thumbnail"]?.$?.url ??
			item["media:content"]?.$?.url ??
			getImageFromHTML(item["content:encoded"]) ??
			"",
		sourceUrl: url,
	}));

	return {
		title: feeds.title ?? "No title",
		url,
		items: articles,
	};
};
