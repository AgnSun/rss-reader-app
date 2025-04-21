import { Box, Typography, Divider } from "@mui/material";
import { ArticleFilterMenu } from "../articles/ArticlesFilterMenu";

interface SectionHeaderProps {
	title?: string;
	showFilters?: boolean;
}

export const SectionHeader = ({ title, showFilters }: SectionHeaderProps) => {
	return (
		<>
			<Box
				sx={{
					display: "flex",
					flexDirection: "row",
					justifyContent: "space-between",
					alignItems: "center",
				}}
			>
				<Typography variant="h5" sx={{ padding: 3 }}>
					{title}
				</Typography>
				{!showFilters && <ArticleFilterMenu />}
			</Box>
			<Divider />
		</>
	);
};
