import {
	AppBar,
	IconButton,
	Toolbar,
	Typography,
	useMediaQuery,
} from "@mui/material";
import LibraryBooksIcon from "@mui/icons-material/LibraryBooks";
import { theme } from "../utils/theme";
import MenuIcon from "@mui/icons-material/Menu";
import { drawerWidth } from "./Sidebar";

interface NavBarProps {
	onMenuClick?: VoidFunction;
}

export const NavBar = ({ onMenuClick }: NavBarProps) => {
	const isMobile = useMediaQuery(theme.breakpoints.down("md"));

	return (
		<AppBar
			position="fixed"
			sx={{
				width: { md: `calc(100% - ${drawerWidth}px)` },
				ml: { md: `${drawerWidth}px` },
			}}
		>
			<Toolbar variant="dense" sx={{ gap: 2 }}>
				{isMobile && onMenuClick && (
					<IconButton color="inherit" edge="start" onClick={onMenuClick}>
						<MenuIcon />
					</IconButton>
				)}
				<LibraryBooksIcon />
				<Typography variant="h6">RSS Reader</Typography>
			</Toolbar>
		</AppBar>
	);
};
