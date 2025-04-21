export const getRSSFeed = async (url: string) => {
	const res = await fetch(
		`http://localhost:5000/api/parse?url=${encodeURIComponent(url)}`
	);
	if (!res.ok) throw new Error("Invalid RSS link");
	const data = await res.json();
	return data;
};
