module.exports = function (eleventyConfig) {

    eleventyConfig.addPassthroughCopy("assets")
    return {
        passthroughFileCopy: true,
        templateFormats: ["html", "md"],
        dir: {
            input: "src",
            output: "_site",
            includes: "includes"
        }
    }
}