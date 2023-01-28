/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  i18n:{
    locales: ['en', 'es'],
    defaultLocale: 'en'
  }
	images: {
		domains: ['assets.example.com', 'res.cloudinary.com'],
	},
};


module.exports = nextConfig;
