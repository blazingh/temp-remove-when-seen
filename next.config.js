const routseLocaleDefinition = require("./configs/routesLocaleDefinition.json");
const imagesRemotePatterns = require("./configs/imagesRemotePatterns.json");
const createNextIntlPlugin = require("next-intl/plugin");

const generateAfterFileRewrites = () => {
  const routeseArray = [];
  Object.keys(routseLocaleDefinition).map((pageName) => {
    const page = routseLocaleDefinition[pageName];
    Object.keys(page.src).map((lang) => {
      routeseArray.push({
        source: page.src[lang],
        destination: `/${lang}${page.destination}`,
      });
      if (lang === "tr") {
        routeseArray.push({
          source: `/${lang}${page.src[lang]}`,
          destination: `/${lang}${page.destination}`,
        });
      }
    });
  });
  return routeseArray;
};

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",
  /*
  async rewrites() {
    return {
      afterFiles: generateAfterFileRewrites(),
      fallback: [{ source: '/:path*', destination: '/tr/404' }],
    }
  },
  */
  images: {
    remotePatterns: imagesRemotePatterns,
  },
  webpack: (
    config,
    { buildId, dev, isServer, defaultLoaders, nextRuntime, webpack },
  ) => {
    const path = require("path");
    config.resolve.alias = {
      ...config.resolve.alias,
      leaflet: path.resolve(__dirname, "node_modules/leaflet/dist/leaflet"),
      "leaflet.css": path.resolve(
        __dirname,
        "node_modules/leaflet/dist/leaflet.css",
      ),
    };
    return config;
  },
};

const withNextIntl = createNextIntlPlugin();

module.exports = withNextIntl(nextConfig);
