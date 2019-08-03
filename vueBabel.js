var path           = require('path');
var through2       = require('through2');

const cheerio = require('cheerio')

module.exports = function (options) {

  return through2.obj(function(file, enc, cb) {
    if (file.isNull()) {
      return cb(null, file);
    }

    if (file.isStream()) {
      return cb(null, 'error')
    }

    var str = file.contents.toString();
    console.log(str)
    var $ = cheerio.load(`<html>${str}</html>`, {decodeEntities: false});
    const template = $('template').html()
        .replace(/<p/g, '<text')
        .replace(/\/p>/g, '/text>')
        .replace(/<div/g, '<view')
        .replace(/\/div>/g, '/view>');
    $('template').html(template)

    const style = $('style').html()
    $('style').html(style.replace(/px/g, 'upx'))


    const html =
`<template>
${template}
</template>

<script>
${$('script').html()}
</script>

<style scoped lang="less">
${$('style').html()}
</style>`

    // let script = extractScript(str);
    // const res = babel.transform(script, fileOpts);
    file.contents = new Buffer(html);

    cb(null, file);
  });
};
