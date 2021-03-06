'use strict';

var gutil = require('gulp-util'),
    through = require('through2'),
    inlineCss = require('./lib/inline_css');

module.exports = function (opt) {
    return through.obj(function (file, enc, cb) {
        opt = {             
            applyStyleTags: true,
            applyLinkTags: true,
            removeStyleTags: true,
            removeLinkTags: false
        };
        var _opt = JSON.parse(JSON.stringify(opt || {}));

        // 'url' option is required
        // set it automatically if not provided
        if (!_opt.url) {
            _opt.url = 'file://' + file.path;
        }

        if (file.isNull()) {
            cb(null, file);
            return;
        }

        if (file.isStream()) {
            this.emit('error', new gutil.PluginError('gulp-inline-css', 'Streaming not supported'));
            return cb();
        }

        inlineCss(file.contents, _opt)
            .then(function (html) {
                file.contents = new Buffer(String(html));

                this.push(file);

                return cb();
            }.bind(this))
            .catch(function (err) {
                if (err) {
                    this.emit('error', new gutil.PluginError('gulp-inline-css', err));
                }
            }.bind(this));
    });
};
