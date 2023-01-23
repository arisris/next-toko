export const random = function () {
	return Math.floor(Math.random() * Date.now()).toString(36);
};

export const GUID = function (max: number = 40) {
	var str = "";
	for (var i = 0; i < max / 3 + 1; i++) str += random();
	return str.substring(0, max);
};

export function wpcomImageLoader({
	src,
	width,
	quality,
}: {
	src: string;
	width: string | number;
	quality: string | number;
}) {
	if (src.startsWith("https://")) {
		src = src.split("https://")[1];
	} else if (src.startsWith("http://")) {
		src = src.split("http://")[1];
	}
	return `https://i1.wp.com/${src}?w=${width}&quality=${quality || 70}`;
}

export function cleanHtml(str: string) {
	return str.replace(/<[^>]*>/gi, "");
}

export function isServerless() {
	// rome-ignore lint/complexity/useSimplifiedLogicExpression: <explanation>
	return !!(process.env.VERCEL || false) || !!(process.env.SERVERLESS || false);
}

export function friendlyDate(str: string) {
	const date = new Date(Date.parse(str));
	const months = [
		"",
		"Jan",
		"Feb",
		"Mar",
		"Apr",
		"May",
		"Jun",
		"Jul",
		"Aug",
		"Sep",
		"Oct",
		"Nov",
		"Dec",
	];
	const day = date.getDay() === 0 ? 1 : date.getDay();
	return `${day} ${months[date.getMonth()]} ${date.getFullYear()}`;
}

export const randomizeArrayIndex = (arr: unknown[]) =>
	arr.filter((i) => i)[Math.floor(Math.random() * arr.length)];

export function paginateArray(
	collection: [],
	page: number = 1,
	perPage: number = 10,
): {
	currentPage: number;
	perPage: number;
	total: number;
	totalPages: number;
	data: unknown[];
} {
	const currentPage = page;
	const offset = (page - 1) * perPage;
	const paginatedItems = collection.slice(offset, offset + perPage);

	return {
		currentPage,
		perPage,
		total: collection.length,
		totalPages: Math.ceil(collection.length / perPage),
		data: paginatedItems,
	};
}

export function chunkedArray(arr: [], chunkSize: number) {
	const res = [];
	for (let i = 0; i < arr.length; i += chunkSize) {
		const chunk = arr.slice(i, i + chunkSize);
		// @ts-expect-error
		res.push(chunk);
	}
	return res;
}

export const letters =
	"a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t,u,v,w,x,y,z".split(",");

export const ucFirst = (str: string) =>
	str
		.split("")
		.map((v, i) => (i === 0 ? v.toUpperCase() : v))
		.join("");
export const lcFirst = (str: string) =>
	str
		.split("")
		.map((v, i) => (i === 0 ? v.toLowerCase() : v))
		.join("");
export const ucWords = (str: string) =>
	str
		.split(" ")
		.map((i) => ucFirst(i))
		.join(" ");

export function timeAgo(
	timestamp: Date | number,
	options: {
		format: "medium" | "long" | "short";
	} = { format: "medium" },
) {
	const ranges = [
		{ min: 1, max: 60, name: { short: "s", medium: "sec", long: "second" } },
		{ max: 3600, name: { short: "m", medium: "min", long: "minute" } },
		{ max: 86400, name: { short: "h", medium: "hr", long: "hour" } },
		{ max: 86400 * 7, name: { short: "d", medium: "day", long: "day" } },
		{ max: 86400 * 28, name: { short: "w", medium: "wk", long: "week" } },
		{
			min: 86400 * 31,
			max: 86400 * 365,
			name: { short: "m", medium: "mon", long: "month" },
		},
		{
			max: 86400 * 365 * 100,
			name: { short: "y", medium: "yr", long: "year" },
		},
	];

	let ts_diff: number;
	const now_ms = new Date().getTime();

	if (timestamp instanceof Date) {
		ts_diff = (now_ms - timestamp.getTime()) / 1000;
	} else {
		ts_diff = now_ms / 1000 - timestamp;
	}

	const index = ranges.findIndex((item) => item.max > ts_diff);
	const range = ranges[index];
	const prevIndex = index - 1;
	const min = range.min || ranges[prevIndex].max;
	const diff = Math.ceil(ts_diff / min);

	if (diff < 0)
		throw new Error(
			"The time difference is negative. The provided timestamp is in the future.",
		);

	const plural = diff > 1 && options.format !== "short" ? "s" : "";

	return `${diff}${options.format === "short" ? "" : " "}${
		range.name[options.format]
	}${plural} ago`;
}

export const noop = () => {};

export function site_url(path: string) {
	if (process.title !== "node") {
		return path;
	}
	// reference for vercel.com
	if (process.env.VERCEL_URL) {
		return `https://${process.env.VERCEL_URL}${path}`;
	}
	// assume localhost
	return `http://localhost:${process.env.PORT ?? 3000}${path}`;
}

export const fakeArray = (size = 1) =>
	Array(size)
		.fill(null)
		.map((_, k) => k);
