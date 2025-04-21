export const getImageFromHTML = (content?: string) => {
	if (!content) return null;
	const parser = new DOMParser();
	const doc = parser.parseFromString(content, "text/html");
	const img = doc.querySelector("img");
	return img?.getAttribute("src") || null;
};
