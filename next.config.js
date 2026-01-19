/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ["three"],
  output: 'export', // هذا السطر هو السر لتحويل الموقع لملفات ثابتة
  images: {
    unoptimized: true, // ضروري لأن GitHub Pages لا يدعم معالجة الصور
  },
};

module.exports = nextConfig;
