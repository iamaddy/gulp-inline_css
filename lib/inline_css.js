'use strict';

var extractCss = require('./extract-css'),
    inlineCss = require('./core'),
    Promise = require('bluebird');

function extend(obj, src) {
    var own = {}.hasOwnProperty;

    for (var key in src) {
        if (own.call(src, key)) {
            obj[key] = src[key];
        }
    }
    return obj;
}

function inlineContent(src, options) {
    return new Promise(function (resolve, reject) {
        var content;

        if (!options.url) {
            reject('options.url is required');
        }

        extractCss(src, options, function (err, html, cssMap) {
            if (err) {
                return reject(err);
            }

            // css += '\n' + options.extraCss;
            content = inlineCss(html, cssMap, options);
            resolve(content);
        });
    });

}

module.exports = function (html, options) {
    return new Promise(function (resolve, reject) {
        var opt = extend({}, options);

        inlineContent(html, opt)
            .then(function (data) {
                resolve(data);
            })
            .catch(function (err) {
                reject(err);
            });
    });
};
