const { description } = require("../../package");

module.exports = {
  /**
   * Ref：https://v1.vuepress.vuejs.org/config/#title
   */
  title: "chitchat.js",
  /**
   * Ref：https://v1.vuepress.vuejs.org/config/#description
   */
  description: "An open-source framework for building voice interfaces for Alexa Skills easily.",

  /**
   * Extra tags to be injected to the page HTML `<head>`
   *
   * ref：https://v1.vuepress.vuejs.org/config/#head
   */
  head: [
    ["meta", { name: "theme-color", content: "#3eaf7c" }],
    ["meta", { name: "apple-mobile-web-app-capable", content: "yes" }],
    ["meta", { name: "apple-mobile-web-app-status-bar-style", content: "black" }],
    ["link", { rel: "icon", href: "/logo/64x64.png" }],
  ],

  /**
   * Theme configuration, here is the default theme configuration for VuePress.
   *
   * ref：https://v1.vuepress.vuejs.org/theme/default-theme-config.html
   */
  themeConfig: {
    repo: "chitchatjs/chitchatjs",
    editLinks: false,
    docsDir: "",
    editLinkText: "",
    logo: "/logo/logo-puzzle.png",
    lastUpdated: false,
    nav: [
      {
        text: "Start Here",
        link: "/guide/getting-started",
      },
      {
        text: "Alexa",
        link: "/alexa/components",
      },
      {
        text: "Slack",
        link:
          "https://join.slack.com/t/chitchatjs/shared_invite/zt-i7l6vm0j-F0QPg0DsRSs4NYIEkwJHPA",
      },
    ],
    sidebar: [
      {
        title: "Basics",
        collapsable: true,
        sidebarDepth: 2,
        children: ["/guide/getting-started", "/guide/concepts", "/guide/directory-structure"],
      },
      {
        title: "Alexa Building Blocks",
        collapsable: true,
        sidebarDepth: 2,
        children: [
          "/alexa/overview",
          "/alexa/building-blocks/core",
          "/alexa/building-blocks/presentation",
          "/alexa/building-blocks/conditionality",
          "/alexa/building-blocks/artifacts",
          "/alexa/building-blocks/localization",
          "/alexa/building-blocks/state-management",
          "/alexa/building-blocks/miscellaneous",
          "/alexa/templates",
          "/alexa/testing",
          "/alexa/ax-kit",
        ],
      },
      {
        title: "Advanced",
        collapsable: true,
        children: ["/advanced/dialog-manager", "/advanced/dialog-engine"],
      },
    ],
  },

  /**
   * Apply plugins，ref：https://v1.vuepress.vuejs.org/zh/plugin/
   */
  plugins: [
    "@vuepress/plugin-back-to-top",
    "@vuepress/plugin-medium-zoom",
    ["@vuepress/google-analytics", { ga: "UA-180195687-1" }],
    [
      "robots",
      {
        /**
         * @host
         * Mandatory, You have to provide the host URL
         */
        host: "https://chitchat.js.org",
        /**
         * @disallowAll
         * Optional: if it's true, all others options are ignored and exclude all robots from the entire server
         */
        disallowAll: false,
        /**
         * @allowAll
         * Optional: if it's true and @disallowAll is false, all others options are ignored and allow all robots complete access
         */
        allowAll: true,
        /**
         * @sitemap
         * Optional, by default: sitemap.xml
         */
        // sitemap: "/sitemap.xml",
      },
    ],
    [
      "sitemap",
      {
        hostname: "https://chitchat.js.org",
      },
    ],
  ],
};
