import { Box, IconButton, List, ListItemText, Typography } from "@mui/material";
import { Article } from "../../store/slices/feeds/feedsSlice";
import { isValid, compareAsc, format } from "date-fns";

import { useNavigate } from "react-router-dom";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import StarIcon from "@mui/icons-material/Star";

import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { useAppDispatch } from "../../store/hooks";
import { setDrawerOpen } from "../../store/slices/app/appSlice";
import { CustomListItem } from "../layout/CustomListItem";
import { parseRssDate } from "../utils/parseRssDate";
import { useRenderArticles } from "./hooks/useRenderArticles";

interface ArticleListProps {
	articles: Article[];
}

export const ArticleList = ({ articles }: ArticleListProps) => {
	const dispatch = useAppDispatch();
	const navigate = useNavigate();
	const { isArticleFavourite, isArticleRead, handleAddToFavourities } =
		useRenderArticles();

	if (articles.length === 0) {
		return (
			<Typography variant="body1" sx={{ padding: 3 }}>
				No articles to display.
			</Typography>
		);
	}

	return (
		<List sx={{ padding: 0 }}>
			{[...articles]
				.sort((a, b) => {
					const dateA = isValid(new Date(a.pubDate))
						? new Date(a.pubDate)
						: parseRssDate(a.pubDate);
					const dateB = isValid(new Date(b.pubDate))
						? new Date(b.pubDate)
						: parseRssDate(b.pubDate);

					return compareAsc(dateB, dateA);
				})
				.map((article) => {
					const isFav = isArticleFavourite(article.id);
					const isRead = isArticleRead(article.id);
					return (
						<CustomListItem
							key={article.id}
							onClick={() => {
								navigate(`/article/${article.id}`);
								dispatch(setDrawerOpen(false));
							}}
							title={
								<Box sx={{ flex: 1 }}>
									<ListItemText
										primary={article.title}
										secondary={format(article.pubDate, "EEE, dd MMM yyyy")}
									/>
								</Box>
							}
							icon={
								<Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
									{isRead && <CheckCircleIcon color="success" />}
									<IconButton
										onClick={(event) =>
											handleAddToFavourities(event, article.id)
										}
									>
										{isFav ? <StarIcon /> : <StarBorderIcon />}
									</IconButton>
								</Box>
							}
						/>
					);
				})}
		</List>
	);
};
