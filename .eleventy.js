const HtmlMin = require('html-minifier');
const ErrorOverlay = require('eleventy-plugin-error-overlay');
const Image = require("@11ty/eleventy-img")

async function imageShortcode(src, alt, clc, width) {
    if(alt === undefined) {
      // You bet we throw an error on missing alt (alt="" works okay)
      throw new Error(`Missing \`alt\` on myImage from: ${src}`);
    }
  
    let metadata = await Image(src, {
      widths: [600],
      formats: ["jpeg"],
      outputDir: "./dist/img/",
      sharpJpegOptions: {quality: 100}
    });
  
    let data = metadata.jpeg[metadata.jpeg.length - 1];
    return `<img src="${data.url}" class=${clc} width="${data.width}" height="${data.height}" alt="${alt}" loading="lazy" decoding="async">`;
}

module.exports = eleventyConfig => {
    eleventyConfig.setTemplateFormats(['njk']);

    eleventyConfig.addNunjucksAsyncShortcode("image", imageShortcode)

    eleventyConfig.addPassthroughCopy('src/js');
    eleventyConfig.addPassthroughCopy('src/css/styles.css');
    eleventyConfig.addPassthroughCopy('src/images');

    eleventyConfig.addPlugin(ErrorOverlay);
    eleventyConfig.addTransform('htmlmin', (content, outputPath) => {
        if (outputPath.endsWith('.html')) {
            let minified = HtmlMin.minify(content, {
                useShortDoctype: true,
                removeComments: true,
                collapseWhitespace: true,
            });
            return minified;
        }
        return content;
    });
    return {
        dir: {
            input: 'src',
            output: 'dist',
            includes: '_templates',
            data: '_data',
        },
        jsDataFileSuffix: '.data',
    };
};