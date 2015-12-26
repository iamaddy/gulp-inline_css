## How It Works
This gulp plugin takes an html file and inlines the CSS into the html.

file.html:
```
<html>
<head> 
  <link rel="stylesheet" href="//xxx.com/style.css?__inline">
</head>
<body>
  <p>Test</p>
</body>
</html>
```

link must with the flag '?__inline'.

//xxx.com/style.css:
```
p {
  color: red;
}
```
Output:
```
<html>
<head>
</head>
<style type="text/css">
    p {
  color: red;
}
</style>
<body>
  <p>Test</p>
</body>
</html>

```
## Install
```
npm install --save-dev gulp-inline_css
```

## Usage

    var gulp = require('gulp'),
    inlineCss = require('gulp-inline_css');
 
    gulp.task('default', function() {
        return gulp.src('./**/*.html')
            .pipe(inlineCss())
            .pipe(gulp.dest('build/'));
    });