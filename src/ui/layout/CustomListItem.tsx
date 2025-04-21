import { ListItem, ListItemText, Box } from "@mui/material";

import { theme } from "../utils/theme";
import { ReactNode } from "react";

interface FeedListItemProps {
	onClick?: VoidFunction;
	icon?: ReactNode;
	title?: string | ReactNode;
}

export const CustomListItem = ({ title, onClick, icon }: FeedListItemProps) => {
	return (
		<ListItem
			sx={{
				padding: 2,
				cursor: "pointer",
				display: "flex",
				justifyContent: "space-between",
				alignItems: "center",
				"&:hover": {
					backgroundColor: theme.palette.action.hover,
				},
			}}
			onClick={onClick}
		>
			<Box sx={{ flex: 1 }}>
				<ListItemText primary={title} />
			</Box>
			{icon}
		</ListItem>
	);
};
