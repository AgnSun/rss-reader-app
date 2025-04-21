import { useState } from "react";
import {
	addFeed,
	setSelectedFeed,
} from "../../../store/slices/feeds/feedsSlice";
import { getRSSFeed } from "../../../api/getRSSFeed";
import { isValidUrl } from "../../utils/checkUrl";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { buildFeed } from "../../utils/buildFeed";

export const useFeedsForm = () => {
	const [url, setUrl] = useState("");
	const [errors, setErrors] = useState({
		invalidUrl: "",
		duplicate: "",
		parse: "",
	});
	const [isLoading, setIsLoading] = useState(false);
	const dispatch = useAppDispatch();
	const feeds = useAppSelector((state) => state.feeds.items);

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const isDuplicate = feeds.some((feed) => feed.url === url);

		if (!isValidUrl(url)) {
			setErrors((prev) => ({
				...prev,
				invalidUrl: "Please enter a proper URL",
			}));
			return;
		}

		if (isDuplicate) {
			setErrors((prev) => ({ ...prev, duplicate: "Feed already added" }));
			return;
		}
		setErrors({ invalidUrl: "", duplicate: "", parse: "" });

		try {
			setIsLoading(true);
			const feeds = await getRSSFeed(url);
			dispatch(addFeed(buildFeed(feeds, url)));
			setUrl("");
			setIsLoading(false);
			dispatch(setSelectedFeed(""));
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
		} catch (error: any) {
			setErrors((prev) => ({ ...prev, parse: error.message }));
			setIsLoading(false);
		}
	};

	return {
		handleSubmit,
		isLoading,
		url,
		setUrl,
		errors,
		setErrors,
	};
};
