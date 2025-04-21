import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { getRSSFeed } from "./getRSSFeed";
import { FeedData } from "../ui/utils/buildFeed";

const mockFeedData: FeedData = {
	title: "Sample Feed",
	url: "https://test.com/rss",
	items: [
		{
			title: "Article 1",
			link: "https://example.com/article1",
			contentSnippet: "This is a example description",
			pubDate: "Sun, 20 Apr 2025 02:57:55 +0000",
			enclosure: { url: "https://example.com/image1.jpg" },
		},
		{
			title: "Article 2",
			link: "https://example.com/article2",
			contentSnippet: "This is a example description 2",
			pubDate: "Mon, 21 Apr 2025 05:16:45 +0000",
			"media:thumbnail": { $: { url: "https://example.com/thumb.jpg" } },
		},
	],
};

describe("getRSSFeed", () => {
	beforeEach(() => {
		vi.resetAllMocks();
	});

	afterEach(() => {
		vi.clearAllMocks();
	});

	it("should return parsed feed data when response is ok", async () => {
		global.fetch = vi.fn(() =>
			Promise.resolve({
				ok: true,
				json: () => Promise.resolve(mockFeedData),
			} as Response)
		);

		const url = "https://test.com/rss";
		const result = await getRSSFeed(url);

		expect(result).toEqual(mockFeedData);
		expect(fetch).toHaveBeenCalledTimes(1);
		expect(fetch).toHaveBeenCalledWith(
			"http://localhost:5000/api/parse?url=https%3A%2F%2Ftest.com%2Frss"
		);
	});

	it("should throw an error when response is not ok", async () => {
		global.fetch = vi.fn(() =>
			Promise.resolve({
				ok: false,
				json: () => Promise.resolve({}),
			} as Response)
		);

		const url = "https://bad-url.com";
		await expect(getRSSFeed(url)).rejects.toThrow("Invalid RSS link");

		expect(fetch).toHaveBeenCalledTimes(1);
		expect(fetch).toHaveBeenCalledWith(
			"http://localhost:5000/api/parse?url=https%3A%2F%2Fbad-url.com"
		);
	});
});
