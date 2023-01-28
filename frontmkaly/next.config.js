/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	images: {
		domains: ['assets.example.com', 'res.cloudinary.com'],
	},
};

module.exports = nextConfig;
