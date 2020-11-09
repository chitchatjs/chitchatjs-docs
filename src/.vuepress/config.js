const { description } = require("../../package");

module.exports = {
  /**
   * Ref：https://v1.vuepress.vuejs.org/config/#title
   */
  title: "chitchat.js",
  /**
   * Ref：https://v1.vuepress.vuejs.org/config/#description
   */
  description:
    "An open-source framework for building voice interfaces for Alexa Skills easily.",

  /**
   * Extra tags to be injected to the page HTML `<head>`
   *
   * ref：https://v1.vuepress.vuejs.org/config/#head
   */
  head: [
    ["meta", { name: "theme-color", content: "#3eaf7c" }],
    ["meta", { name: "apple-mobile-web-app-capable", content: "yes" }],
    ["meta", { name: "apple-mobile-web-app-status-bar-style", content: "black" }],
    [
      "meta",
      {
        name: "google-site-verification",
        content: "umF5IWhr5QTGTFX3oDDRKdX0_CvbXMhNOLsGL1z0OTI",
      },
    ],
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
        link: "/alexa/overview",
      },
      {
        text: "Plugins",
        link: "/plugins/overview",
      },
      {
        text: "Chat on Gitter",
        link:
          "https://gitter.im/chitchat-js/community?utm_source=share-link&utm_medium=link&utm_campaign=share-link",
      },
    ],
    sidebar: [
      {
        title: "Basics",
        collapsable: true,
        sidebarDepth: 1,
        children: ["/guide/getting-started", "/guide/concepts"],
      },
      {
        title: "Alexa",
        collapsable: true,
        sidebarDepth: 1,
        children: [
          "/alexa/overview",
          "/alexa/configuration",
          ["/alexa/building-blocks/core", "Core"],
          ["/alexa/building-blocks/presentation", "Presentation"],
          ["/alexa/building-blocks/conditionality", "Conditionality"],
          ["/alexa/building-blocks/artifacts", "Artifacts"],
          ["/alexa/building-blocks/localization", "Localization"],
          ["/alexa/building-blocks/state-management", "State Management"],
          ["/alexa/templates", "Sample Skills"],
          ["/alexa/testing", "Testing"],
        ],
      },
      {
        title: "Plugins",
        collapsable: true,
        sidebarDepth: 1,
        children: [
          "/plugins/overview",
          "/plugins/using",
          "/plugins/writing",
          "/plugins/publishing",
          "/plugins/community",
        ],
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
        sitemap: "/sitemap.xml",
      },
    ],
    [
      "sitemap",
      {
        hostname: "https://chitchat.js.org",
      },
    ],
    [
      "vuepress-plugin-seo",
      {
        siteTitle: (_, $site) => "Chitchat.js | Build Voice Apps for Alexa.",
        title: ($page) => $page.title + " | Build Voice Apps for Alexa.",
        description: ($page) => $page.frontmatter.description,
        author: (_, $site) => $site.themeConfig.author,
        tags: ($page) => $page.frontmatter.tags,
        twitterCard: (_) => "summary_large_image",
        type: ($page) =>
          ["articles", "posts", "blog"].some((folder) =>
            $page.regularPath.startsWith("/" + folder)
          )
            ? "article"
            : "website",
        url: (_, $site, path) => ($site.themeConfig.domain || "") + path,
        image: ($page, $site) =>
          $page.frontmatter.image &&
          (($site.themeConfig.domain && !$page.frontmatter.image.startsWith("http")) ||
            "") + $page.frontmatter.image,
        publishedAt: ($page) =>
          $page.frontmatter.date && new Date($page.frontmatter.date),
        modifiedAt: ($page) => $page.lastUpdated && new Date($page.lastUpdated),
      },
    ],
  ],
};
