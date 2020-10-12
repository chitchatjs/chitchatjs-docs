const { description } = require("../../package");

module.exports = {
    /**
     * Ref：https://v1.vuepress.vuejs.org/config/#title
     */
    title: "Chitchat JS",
    /**
     * Ref：https://v1.vuepress.vuejs.org/config/#description
     */
    description: "Documentation for Chitchat JS: A framework for building multi modal voice interfaces.",

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
                text: "Guide",
                link: "/guide/getting-started",
            },
            {
                text: "Config",
                link: "/config/",
            },
            {
                text: "GitHub",
                link: "https://github.com/chitchatjs/chitchatjs",
            },
        ],
        sidebar: [
            {
                title: "Guides",
                collapsable: true,
                sidebarDepth: 2,
                children: [
                    "/guide/intro",
                    "/guide/getting-started",
                    "/guide/directory-structure",
                    "/alexa/components",
                    "/guide/templates",
                ],
            },
            {
                title: "Advanced",
                collapsable: true,
                children: [],
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
    ],
};
