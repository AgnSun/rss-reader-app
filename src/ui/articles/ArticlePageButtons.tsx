import { Box, Button } from "@mui/material";

interface ArticlePageButtonsProps {
	link?: string;
	goBack: VoidFunction;
}

export const ArticlePageButtons = ({
	link,
	goBack,
}: ArticlePageButtonsProps) => {
	return (
		<Box
			sx={{
				display: "flex",
				flexDirection: {
					xs: "column",
					sm: "row",
				},
				justifyContent: "space-between",
			}}
		>
			<Button onClick={() => window.open(link, "_blank")}>
				GO TO ARTICLE PAGE
			</Button>
			<Button onClick={goBack}>BACK TO HOME</Button>
		</Box>
	);
};
