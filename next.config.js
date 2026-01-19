/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ["three"],
  output: 'export',
  // إضافة basePath لأن الموقع على مسار فرعي في GitHub Pages
  basePath: '/dev-agency-landing',
  // إضافة assetPrefix لتحميل الملفات من المسار الصحيح
  assetPrefix: '/dev-agency-landing/',
  images: {
    unoptimized: true,
  },
  // تعطيل trailing slash لتجنب مشاكل التوجيه
  trailingSlash: true,
};

module.exports = nextConfig;
