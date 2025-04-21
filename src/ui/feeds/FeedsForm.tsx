import {
	Box,
	TextField,
	Button,
	CircularProgress,
	Typography,
} from "@mui/material";
import { useFeedsForm } from "./hooks/useFeedsForm";

export const FeedsForm = () => {
	const { handleSubmit, isLoading, url, setUrl, errors, setErrors } =
		useFeedsForm();

	return (
		<form onSubmit={handleSubmit}>
			<Box
				sx={{
					display: "flex",
					flexDirection: { xs: "column", sm: "row" },
					alignItems: { xs: "center", sm: "flex-start" },
					justifyContent: "center",
					gap: 2,
					flex: 1,
				}}
			>
				<TextField
					placeholder="Add url"
					variant="outlined"
					fullWidth
					sx={{
						maxWidth: "600px",
						minWidth: { xs: "300px", sm: "400px" },
						flexGrow: 1,
					}}
					value={url}
					onChange={(e) => {
						setUrl(e.target.value);
						setErrors({ invalidUrl: "", duplicate: "", parse: "" });
					}}
					error={!!errors.invalidUrl || !!errors.duplicate || !!errors.parse}
					helperText={errors.invalidUrl || errors.duplicate || errors.parse}
				/>

				<Button
					variant="contained"
					color="primary"
					type="submit"
					fullWidth
					size="large"
					disabled={
						!url ||
						!!errors.duplicate ||
						!!errors.parse ||
						isLoading ||
						!!errors.invalidUrl
					}
					sx={{
						width: "100px",
						height: "56px",
					}}
				>
					{isLoading ? (
						<CircularProgress color="warning" />
					) : (
						<Typography>ADD!</Typography>
					)}
				</Button>
			</Box>
		</form>
	);
};
