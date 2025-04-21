import { Box } from "@mui/material";
import { NavBar } from "../ui/layout/NavBar";
import { Routes, Route, useLocation } from "react-router-dom";
import { ArticlePage } from "../pages/ArticlePage";
import { HomePage } from "../pages/HomePage";
import { MainSection } from "../ui/sections/MainSection";
import { FeedsSection } from "../ui/sections/FeedsSection";
import { drawerWidth, Sidebar } from "../ui/layout/Sidebar";
import { ArticlesSection } from "../ui/sections/ArticlesSection";
import { setDrawerOpen } from "../store/slices/app/appSlice";
import { useAppDispatch, useAppSelector } from "../store/hooks";

export const RootLayout = () => {
	const dispatch = useAppDispatch();
	const isDrawerOpen = useAppSelector((state) => state.app.isDrawerOpen);
	const location = useLocation();
	const isHomePage = location.pathname === "/";

	return (
		<Box
			sx={{
				display: "flex",
				flexDirection: "column",
				minHeight: "100vh",
			}}
		>
			<NavBar
				onMenuClick={() => {
					dispatch(setDrawerOpen(true));
				}}
			/>
			<Box sx={{ display: "flex", flexGrow: 1 }}>
				<Box
					component="nav"
					sx={{ width: { md: drawerWidth }, flexShrink: { md: 0 } }}
				>
					<Sidebar
						isOpen={isDrawerOpen}
						onClose={() => dispatch(setDrawerOpen(false))}
					>
						{isHomePage ? (
							<FeedsSection showFilters />
						) : (
							<ArticlesSection showFilters />
						)}
					</Sidebar>
				</Box>
				<Box
					component="main"
					sx={{
						flexGrow: 1,
						width: { md: `calc(100% - ${drawerWidth}px)` },
						display: "flex",
						flexDirection: "column",
					}}
				>
					<MainSection />
					<Box
						sx={{
							flex: 1,
							backgroundColor: (theme) => theme.palette.grey[50],
							paddingX: 7,
							pt: 3,
						}}
					>
						<Routes>
							<Route path="/" element={<HomePage />} />
							<Route path="/article/:id" element={<ArticlePage />} />
						</Routes>
					</Box>
				</Box>
			</Box>
		</Box>
	);
};
