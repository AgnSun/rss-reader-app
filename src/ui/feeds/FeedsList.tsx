import { List, IconButton } from "@mui/material";
import {
	deleteFeed,
	setSelectedFeed,
	setShowFavourites,
} from "../../store/slices/feeds/feedsSlice";
import DeleteIcon from "@mui/icons-material/Delete";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import StarIcon from "@mui/icons-material/Star";
import { CustomListItem } from "../layout/CustomListItem";
import { setDrawerOpen } from "../../store/slices/app/appSlice";
import { useAppDispatch, useAppSelector } from "../../store/hooks";

export const FeedsList = () => {
	const dispatch = useAppDispatch();
	const feeds = useAppSelector((state) => state.feeds.items);
	const favouriteArticles = useAppSelector(
		(state) => state.feeds.favouriteArticles
	);

	const handleDeleteFeed = (event: React.MouseEvent, url: string) => {
		event.stopPropagation();
		dispatch(deleteFeed(url));
	};

	return (
		<List>
			<CustomListItem
				onClick={() => {
					dispatch(setShowFavourites(true));
					dispatch(setDrawerOpen(false));
				}}
				title={"Favourite articles"}
				icon={
					<IconButton>
						{favouriteArticles.length === 0 ? <StarBorderIcon /> : <StarIcon />}
					</IconButton>
				}
			/>
			{feeds.map((feed) => (
				<CustomListItem
					key={feed.url}
					onClick={() => {
						dispatch(setSelectedFeed(feed.url));
						dispatch(setDrawerOpen(false));
					}}
					title={feed.title}
					icon={
						<IconButton onClick={(event) => handleDeleteFeed(event, feed.url)}>
							<DeleteIcon />
						</IconButton>
					}
				/>
			))}
		</List>
	);
};
