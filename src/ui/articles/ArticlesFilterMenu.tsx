import {
	Menu,
	MenuItem,
	ListItemIcon,
	ListItemText,
	Button,
} from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import DoneIcon from "@mui/icons-material/Done";
import { useState } from "react";
import {
	FeedsState,
	setArticleFilter,
} from "../../store/slices/feeds/feedsSlice";
import { useAppDispatch, useAppSelector } from "../../store/hooks";

const options: { label: string; value: FeedsState["articleFilter"] }[] = [
	{ label: "All articles", value: "all" },
	{ label: "Read articles", value: "read" },
	{ label: "Unread articles", value: "unread" },
];

export const ArticleFilterMenu = () => {
	const dispatch = useAppDispatch();
	const currentFilter = useAppSelector((state) => state.feeds.articleFilter);
	const selectedOption = options.find(
		(option) => option.value === currentFilter
	);
	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
	const open = Boolean(anchorEl);

	const handleClick = (event: React.MouseEvent<HTMLElement>) => {
		setAnchorEl(event.currentTarget);
	};

	const handleClose = () => {
		setAnchorEl(null);
	};

	const handleSelect = (value: FeedsState["articleFilter"]) => {
		dispatch(setArticleFilter(value));
		handleClose();
	};

	return (
		<>
			<Button
				variant="contained"
				disableElevation
				onClick={handleClick}
				endIcon={<KeyboardArrowDownIcon />}
			>
				{selectedOption?.label}
			</Button>
			<Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
				{options.map((option) => (
					<MenuItem
						key={option.value}
						onClick={() => handleSelect(option.value)}
					>
						<ListItemIcon>
							{currentFilter === option.value ? <DoneIcon /> : <span />}
						</ListItemIcon>
						<ListItemText>{option.label}</ListItemText>
					</MenuItem>
				))}
			</Menu>
		</>
	);
};
