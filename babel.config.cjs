// eslint-diable-next-line no-undef
module.exports = {
  presets: [
    [
      "@babel/preset-env",
      {
        targets: {
          esmodules: "true",
        },
      },
    ],
    "@babel/preset-typescript",
    ["@babel/preset-react", { runtime: "automatic" }],
  ],
};
