## How It Works
This gulp plugin takes an html file and inlines the CSS into the html.

**file.html:**
```
<html>
<head> 
  <link rel="stylesheet" href="./css/reset.css?__inline">
  <link rel="stylesheet" href="./css/a.css">
  <link rel="stylesheet" href="//xxx.com/css/style.css?__inline">
</head>
<body>
  <p>Test</p>
</body>
</html>
```

link must with the flag '?__inline'.

**./css/reset.css:**
```
a {
  color: blue;
  background-image: url(../img/test.png);
}
```


**//xxx.com/css/style.css:**
```
p {
  color: red;
  background-image: url(../img/bg.png);
}
```


**Output:**
```
<html>
<head>
</head>
<style type="text/css">
  a {
    color: red;
    background-image: url(../img/test.png);
  }
</style>
<link rel="stylesheet" href="./css/a.css">
<style type="text/css">
  p {
  color: red;
  background-image: url(//xxx.com/img/bg.png);
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