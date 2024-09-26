/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
        appDir: true,
        // Adjust swcPlugins to ensure it is properly formatted
        swcPlugins: [
            ['next-superjson-plugin', {}] // Wrap in an array
        ]
    },
    images: {
        domains: [
            'lh3.googleusercontent.com',
            'res.cloudinary.com',
            'avatars.githubusercontent.com'
        ]
    },
    reactStrictMode: true,
    debug: true, // Move this outside experimental if it should remain
};

export default nextConfig;
