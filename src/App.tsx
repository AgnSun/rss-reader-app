import { ThemeProvider } from "@emotion/react";
import { CssBaseline } from "@mui/material";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { PersistGate } from "redux-persist/integration/react";
import { RootLayout } from "./layout/RootLayout";
import { store, persistor } from "./store/store";
import { theme } from "./ui/utils/theme";

export const App = () => (
	<Provider store={store}>
		<PersistGate loading={null} persistor={persistor}>
			<BrowserRouter>
				<ThemeProvider theme={theme}>
					<CssBaseline />
					<RootLayout />
				</ThemeProvider>
			</BrowserRouter>
		</PersistGate>
	</Provider>
);
