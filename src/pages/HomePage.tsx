import { useEffect } from "react";
import { ArticlesSection } from "../ui/sections/ArticlesSection";
import { setSelectedArticle } from "../store/slices/feeds/feedsSlice";
import { useAppDispatch } from "../store/hooks";

export const HomePage = () => {
	const dispatch = useAppDispatch();

	useEffect(() => {
		dispatch(setSelectedArticle(null));
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return <ArticlesSection />;
};
