/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
        {
            protocol: 'https',
            hostname: 'res.cloudinary.com',
            pathname: '/dv934lt48/**',
        },
        ],
    },
}

module.exports = nextConfig
