import { Box } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { setSelectedArticle } from "../store/slices/feeds/feedsSlice";
import { useEffect } from "react";
import { ArticlePageButtons } from "../ui/articles/ArticlePageButtons";
import { ArticlePreview } from "../ui/articles/ArticlePreview";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { selectArticleById } from "../store/slices/feeds/feedsSelectors";

export const ArticlePage = () => {
	const { id } = useParams();
	const dispatch = useAppDispatch();
	const navigate = useNavigate();

	const article = useAppSelector(selectArticleById(id as string));

	useEffect(() => {
		if (article) dispatch(setSelectedArticle(article.id));
	}, [article, dispatch]);

	return (
		<Box sx={{ gap: 3, display: "flex", flexDirection: "column" }}>
			<ArticlePageButtons
				goBack={() => {
					navigate("/");
				}}
				link={article?.link}
			/>
			<ArticlePreview article={article} />
		</Box>
	);
};
