const { getDefaultConfig } = require("metro-config");

// Changes required to make i18n-js work with React Native
// https://github.com/fnando/i18n#troubleshooting

module.exports = (async () => {
  const {
    resolver: { assetExts, sourceExts },
  } = await getDefaultConfig();

  return {
    resolver: {
      sourceExts: [...sourceExts, "mjs"],
    },
  };
})();
