/** @type {import("next").NextConfig} */
module.exports = {
  reactStrictMode: true,
  pageExtensions: ["js", "jsx", "ts", "tsx"],
  images: {
    domains: [
      "0.gravatar.com",
      "avatars.githubusercontent.com" // github avatar
    ]
  }
};
