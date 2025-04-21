import { Box, Drawer, useTheme, useMediaQuery } from "@mui/material";

import { ReactNode } from "react";

interface SidebarProps {
	isOpen?: boolean;
	onClose?: VoidFunction;
	children: ReactNode;
}

export const drawerWidth = 300;

export const Sidebar = ({ isOpen, onClose, children }: SidebarProps) => {
	const theme = useTheme();
	const mdDown = useMediaQuery(theme.breakpoints.down("md"));

	return (
		<Drawer
			variant={mdDown ? "temporary" : "permanent"}
			open={mdDown ? isOpen : true}
			onClose={mdDown ? onClose : undefined}
			slotProps={{
				root: {
					keepMounted: mdDown ? true : undefined,
					sx: {
						display: mdDown ? (isOpen ? "block" : "none") : "block",
					},
				},
				paper: {
					sx: {
						boxSizing: "border-box",
						width: drawerWidth,
					},
				},
			}}
		>
			<Box>{children}</Box>
		</Drawer>
	);
};
