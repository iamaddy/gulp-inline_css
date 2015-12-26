'use strict';
var path = require('path'),
    cheerio = require('cheerio');

module.exports = function (html, cssMap, options) {
    var editedElements = [],
        $ = cheerio.load(html, {
            decodeEntities: false
        });

    function handleRule() {
        for(var key in cssMap){
            var cssContent = handleCssImg(key, cssMap[key]);
            $('[href="' + key + '"]').replaceWith('<style type="text/css">\n' + cssContent + "</style>");
        }
    }

    function handleCssImg(cssPath, cssContent){
        return cssContent.replace(/url\s*\(\s*("(?:[^\\"\r\n\f]|\\[\s\S])*"|'(?:[^\\'\n\r\f]|\\[\s\S])*'|[^)}\s]+)\s*\)(\s*;?)/g, function($1, $2, $3){
            // 只替换相对路径
            var urlSegment = cssPath.split('/');

            if($2.indexOf('../') === -1 && $2.indexOf('./') === 0){
                urlSegment.pop();
                urlSegment.push($2.split('./')[1]);
                return "url("+ urlSegment.join('/').replace('http://', "//") +")"
            }else if($2.indexOf('../') === 0 ){
                for(var i = 0; i < $2.split('../').length; i++){
                    urlSegment.pop();
                }
                var res = $2.replace(/\.\.\//g, "");
                urlSegment.push(res);
                return "url("+ urlSegment.join('/').replace('http://', "//") +")"
            } 
            return $1;
        })
    }

    handleRule();
    return $.html();
};
