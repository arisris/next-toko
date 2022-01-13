/**
 * Make A random string
 * @returns {String}
 */
export const random = function () {
  return Math.floor(Math.random() * Date.now()).toString(36);
};

/**
 * Make a GUID String
 * @param {number} [max=40]
 * @returns {String}
 */
export const GUID = function (max = 40) {
  var str = '';
  for (var i = 0; i < max / 3 + 1; i++) str += random();
  return str.substring(0, max);
};

/**
 * Async Handle For REST Request
 * @typedef {(req: import("next").NextApiRequest, res: import("next").NextApiResponse) => Promise} ApiCallbacks
 * @param {ApiCallbacks} handler
 * @returns {ApiCallbacks}
 */
export const restAsyncHandler = (handler) => (req, res) =>
  handler(req, res).catch((e) => res.json({ success: false, msg: e.message }));

/**
 * wp.com Image Loader for next/image
 * @param {{src: string, width: number | string, quality: number | string }} param0
 * @returns {String}
 */
export function wpcomImageLoader({ src, width, quality }) {
  if (src.startsWith('https://')) {
    src = src.split('https://')[1];
  } else if (src.startsWith('http://')) {
    src = src.split('http://')[1];
  }
  return `https://i1.wp.com/${src}?w=${width}&quality=${quality || 70}`;
}

/**
 * Cleaning up html string
 * @param {string} str
 * @returns {String}
 */
export function cleanHtml(str) {
  return str.replace(/<[^>]*>/gi, '');
}

/**
 * Identity if is on serverless architecture
 * @returns {boolean}
 */
export function isServerless() {
  return !!(process.env.VERCEL || false) || !!(process.env.SERVERLESS || false);
}

/**
 *
 * @param {string} str
 * @returns {String}
 */
export function friendlyDate(str) {
  const date = new Date(Date.parse(str));
  const months = [
    '',
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec'
  ];
  const day = date.getDay() === 0 ? 1 : date.getDay();
  return `${day} ${months[date.getMonth()]} ${date.getFullYear()}`;
}

// https://stackoverflow.com/a/6274398
/**
 * Randomize Array Index
 * @param {array} arr
 * @returns {array}
 */
export const randomizeArrayIndex = (arr) =>
  arr.filter((i) => i)[Math.floor(Math.random() * arr.length)];

/**
 * Paginate the array
 * @param {array} collection
 * @param {number=} page
 * @param {number=} perPage
 * @returns {{currentPage: number, perPage: number, total: number, totalPages: number, data: array}}
 */
export function paginateArray(collection, page = 1, perPage = 10) {
  const currentPage = page;
  const offset = (page - 1) * perPage;
  const paginatedItems = collection.slice(offset, offset + perPage);

  return {
    currentPage,
    perPage,
    total: collection.length,
    totalPages: Math.ceil(collection.length / perPage),
    data: paginatedItems
  };
}

/**
 * Chunked The Array
 * @param {array} arr
 * @param {number} chunkSize
 * @returns {array}
 */
export function chunkedArray(arr, chunkSize) {
  const res = [];
  for (let i = 0; i < arr.length; i += chunkSize) {
    const chunk = arr.slice(i, i + chunkSize);
    res.push(chunk);
  }
  return res;
}

/** @type {string[]} */
export const letters =
  'a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t,u,v,w,x,y,z'.split(',');

/**
 *
 * @param {string} str
 * @returns {string}
 */
export const ucFirst = (str) =>
  str
    .split('')
    .map((v, i) => (i === 0 ? v.toUpperCase() : v))
    .join('');

/**
 *
 * @param {string} str
 * @returns {string}
 */
export const ucWords = (str) =>
  str
    .split(' ')
    .map((i) => ucFirst(i))
    .join(' ');

/**
 * Format date to time ago string
 * @param {Date | number} timestamp
 * @param {{ format: "medium" | "short" | "long" }} options
 * @returns {string}
 */
export function timeAgo(timestamp, options = { format: 'medium' }) {
  const ranges = [
    { min: 1, max: 60, name: { short: 's', medium: 'sec', long: 'second' } },
    { max: 3600, name: { short: 'm', medium: 'min', long: 'minute' } },
    { max: 86400, name: { short: 'h', medium: 'hr', long: 'hour' } },
    { max: 86400 * 7, name: { short: 'd', medium: 'day', long: 'day' } },
    { max: 86400 * 28, name: { short: 'w', medium: 'wk', long: 'week' } },
    {
      min: 86400 * 31,
      max: 86400 * 365,
      name: { short: 'm', medium: 'mon', long: 'month' }
    },
    { max: 86400 * 365 * 100, name: { short: 'y', medium: 'yr', long: 'year' } }
  ];

  /** @type {number} */
  let ts_diff;
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
      'The time difference is negative. The provided timestamp is in the future.'
    );

  const plural = diff > 1 && options.format !== 'short' ? 's' : '';

  return `${diff}${options.format === 'short' ? '' : ' '}${
    range.name[options.format]
  }${plural} ago`;
}

export const noop = () => {}