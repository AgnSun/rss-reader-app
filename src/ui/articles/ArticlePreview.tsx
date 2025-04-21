import {
	Box,
	Typography,
	ImageListItem,
	IconButton,
	Tooltip,
} from "@mui/material";
import { format } from "date-fns";
import {
	Article,
	toggleReadArticle,
} from "../../store/slices/feeds/feedsSlice";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import { useAppDispatch, useAppSelector } from "../../store/hooks";

interface ArticlePreviewProps {
	article?: Article;
}

export const ArticlePreview = ({ article }: ArticlePreviewProps) => {
	const dispatch = useAppDispatch();
	const readArticles = useAppSelector((state) => state.feeds.readArticles);
	const isRead = article && readArticles.includes(article.id);

	return (
		<Box
			sx={{
				display: "flex",
				flexDirection: {
					xs: "column",
					sm: "row",
				},
				gap: 2,
			}}
		>
			<Box sx={{ flex: 1 }}>
				<ImageListItem sx={{ width: "100%", height: "100%" }}>
					<img src={article?.image} alt={`${article?.title} image`} />
				</ImageListItem>
			</Box>
			<Box sx={{ flex: 2 }}>
				<Box
					sx={{
						display: "flex",
						flexDirection: "row",
						alignItems: "center",
						justifyContent: "space-between",
						gap: 2,
					}}
				>
					<Typography variant="overline">
						{article && format(article?.pubDate, "EEE, dd MMM yyyy HH:mm")}
					</Typography>
					<Tooltip title={isRead ? "Mark as unread" : "Mark as read"}>
						<IconButton
							onClick={() => article && dispatch(toggleReadArticle(article.id))}
						>
							{isRead ? (
								<CheckCircleIcon color="success" />
							) : (
								<CheckCircleOutlineIcon />
							)}
						</IconButton>
					</Tooltip>
				</Box>
				<Typography variant="body1">{article?.description}</Typography>
			</Box>
		</Box>
	);
};
