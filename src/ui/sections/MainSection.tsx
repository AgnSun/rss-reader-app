import { Box, Typography } from "@mui/material";
import { FeedsForm } from "../feeds/FeedsForm";
import { useLocation } from "react-router-dom";
import { useAppSelector } from "../../store/hooks";
import { selectArticleById } from "../../store/slices/feeds/feedsSelectors";
import { theme } from "../utils/theme";

export const MainSection = () => {
	const location = useLocation();
	const isHomePage = location.pathname === "/";

	const selectedArticleId = useAppSelector(
		(state) => state.feeds.selectedArticle
	);

	const selectedArticle = useAppSelector(
		selectArticleById(selectedArticleId as string)
	);

	return (
		<Box
			sx={{
				background: `linear-gradient(135deg, ${theme.palette.primary.light}, ${theme.palette.secondary.light})`,
				paddingX: 5,
				marginTop: 6,
				minHeight: "250px",
				display: "flex",
				alignItems: "center",
				justifyContent: "center",
			}}
		>
			{isHomePage ? (
				<FeedsForm />
			) : (
				<Typography variant="h5" color="white" sx={{ textAlign: "center" }}>
					{selectedArticle?.title}
				</Typography>
			)}
		</Box>
	);
};
