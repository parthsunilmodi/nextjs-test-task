/** @type {import('next').NextConfig} */
const nextConfig = {
	env: {
		REACT_APP_BASE_URL: process.env.REACT_APP_BASE_URL,
	},
	images: {
		remotePatterns: [
			{
				protocol: 'https',
				hostname: 'images-na.ssl-images-amazon.com',
			},
		],
	},
};

module.exports = nextConfig;
