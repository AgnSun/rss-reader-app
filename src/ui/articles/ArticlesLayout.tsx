import { Box, Button } from "@mui/material";
import { Article } from "../../store/slices/feeds/feedsSlice";

import { SectionHeader } from "../sections/SectionHeader";
import { ArticleList } from "./ArticlesList";

interface ArticlesLayoutProps {
	title?: string;
	onBackClick?: VoidFunction;
	articles: Article[];
	showFilters?: boolean;
}

export const ArticlesLayout = ({
	title,
	onBackClick,
	articles,
	showFilters,
}: ArticlesLayoutProps) => {
	return (
		<>
			<SectionHeader title={title} showFilters={showFilters} />
			<Box sx={{ pt: 3 }}>
				{!showFilters && onBackClick && (
					<Box
						sx={{
							display: "flex",
							justifyContent: "right",
						}}
					>
						<Button
							variant="text"
							onClick={() => {
								onBackClick?.();
							}}
						>
							BACK TO ALL ARTICLES
						</Button>
					</Box>
				)}
				<ArticleList articles={articles} />
			</Box>
		</>
	);
};
