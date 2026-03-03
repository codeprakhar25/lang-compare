/// <reference path="./.sst/platform/config.d.ts" />

export default $config({
  app(input) {
    return {
      name: "language-overview",
      removal: input?.stage === "production" ? "retain" : "remove",
      protect: ["production"].includes(input?.stage),
      home: "aws",
    };
  },
  async run() {
    const stage = $app.stage;
    const isProd = stage === "production";
    const domain = isProd ? "langscompare.site" : "dev.langscompare.site";
    const baseUrl = isProd
      ? "https://langscompare.site"
      : "https://dev.langscompare.site";
  //   const refiSite = new sst.aws.Astro('RoamRefiAstro', {
  //     path: 'web-refi/',
  //     environment: {
  //         BASE_URL: refiBaseUrl,
  //         ...(isProduction
  //             ? { PUBLIC_GA_MEASUREMENT_ID: 'G-YJLN53ZC3N' }
  //             : {}),
  //     },
  //     domain: refiDomain,
  //     edge: {
  //         viewerRequest: {
  //             injection: isProduction
  //                 ? ''
  //                 : injectBasicAuth('roamdev', 'roamdev'),
  //         },
  //     },
  //     dev: {
  //         autostart: false,
  //     },
  // })
    new sst.aws.Astro("LangComparisonAstro", {
      path: ".",
      environment: {
        BASE_URL: baseUrl,
      },
      domain,
      dev: {
        autostart: false,
      },
    });
  },
});
