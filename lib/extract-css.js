'use strict';

var assert = require('assert'),
    Batch = require('batch'),
    getStylesData = require('style-data'),
    getStylesheetList = require('list-stylesheets'),
    getHrefContent = require('href-content');

module.exports = function (html, options, callback) {
    var batch = new Batch();
    var data = getStylesheetList(html, options);

    batch.push(function (callback) {
        getStylesData(data.html, options, callback);
    });
    if (data.hrefs.length) {
        assert.ok(options.url, 'options.url is required');
    }
    data.hrefs.forEach(function (stylesheetHref) {
        // 仅当url含__inline 标签
        if(/\?__inline/.test(stylesheetHref)){
            if(stylesheetHref.indexOf('//') === 0){
                stylesheetHref = 'http:' + stylesheetHref;
            }
            batch.push(function (callback) {
                getHrefContent(stylesheetHref, options.url, callback);
            });
        }
    });
    batch.end(function (err, results) {
        if (err) {
            return callback(err);
        }
        var css = {};
        var stylesData = results.shift();
        var i = 0;
        results.forEach(function (content) {
            stylesData.css.push(content);
            css[data.hrefs[i]] = content;
            i++
        });
        // var css = stylesData.css;
        callback(null, stylesData.html, css);
    });
};
