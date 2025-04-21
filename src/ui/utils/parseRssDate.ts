import { parse } from "date-fns";

export const parseRssDate = (dateString: string): Date => {
	return parse(dateString, "EEE, dd MMM yyyy HH:mm:ss XXX", new Date());
};
