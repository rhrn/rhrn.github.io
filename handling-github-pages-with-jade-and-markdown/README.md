##Handling GitHub pages with jade and markdown
### Features
* jade template engine with extends, includes, variables
  - include markdown, coffee, etc.
* local web server for viewing and debuging
* watching on jade and mardown files change with autocompile
  - livereload page
* publish configuration
* comfortably view on github

### Requirements
* GitHub account with repository `{username}.github.io` where username your github login
[details here](http://pages.github.com/)
* Node.js and npm must have installed

#### Installing
Go into repo directory or create directory `username.github.io`
```
git clone git@github.com:username/username.github.io.git
# or just create empty directory and link to repo later
# mkdir username.github.io
cd username.github.io
```
Initialize npm package file and fill fileds
```
npm init
```
global packages
```
sudo npm install -g jade grunt marked
```
install `grunt` tasks and `connect` framework
```
npm install grunt-contrib-watch --save-dev
npm install grunt-jade-tasks --save-dev
npm install connect --save-dev
```
Create file `Gruntfile.js` with
```
module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    watch: {
      options: {
        livereload: true
      },
      jade: {
        tasks: ["jade:debug"],
        files: ["**/*.jade", "**/*.md", "!layouts/*.jade"]
      }
    },
    jade: {
      options: {
        pretty: true,
        files: {
          "*": ["**/*.jade", "!layouts/*.jade"]
        }
      },
      debug: {
        options: {
          locals: {
            livereload: true
          }
        }
      },
      publish: {
        options: {
          locals: {
            livereload: false
          }
        }
      }
    },
    web: {
      options: {
        port: 8001
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-jade-tasks');

  grunt.registerTask('default', ['jade:debug', 'web']);
  grunt.registerTask('publish', ['jade:publish']);

  grunt.registerTask('web', 'Start web server...', function() {
    var options = this.options();
    var connect = require('connect');
    connect.createServer(
        connect.static(__dirname)
    ).listen(options.port);
    console.log('http://localhost:%s', options.port);

    grunt.task.run(["watch:jade"]);
  });

};
```
Create directory `layouts` and default jade layout `layouts/default.jade` with
```
!!!
html
  block vars
  head
    title #{pageTitle} &mdash; @blog
    // main styles
    link(href="/static/css/styles.css", rel="stylesheet")
    block styles
  body
    .header
      a(href="/") blog 
    .container
      block content
    .footer
    // main javascript
    script(src="/static/js/scripts.js")
    block scripts
    block analytics
      script.
      // google analytics code, etc...
```
Create file `README.md` with
```
####Posts
```

Create file `index.jade` with
```
extends layouts/default

block vars
  pageTitle = 'Home'

block content
  include README.md
```

Create file `.gitignore` with
```
npm-debug.log
node_modules/
```

Run grunt
```
grunt
```
output will like this
```
Running "jade:debug" (jade) task
File "index.html" saved.

Running "web" task
http://localhost:8001

Running "watch:jade" (watch) task
```
So, open in browser `http://localhost:8001`
and on any changes `*.jade` or `*.md` files page will be reloaded, very usefull:)

To prepare to publish run
```
grunt jade:publish
```

#### Workflow example
* Create post directory `first-post`
  ```
  mkdir first-post

  ```
* Create `first-post/README.md` with main post content
  ```
  ### First post header

  > First post body 
  ```
* Create `first-post/index.jade` with extends layout, title, some text and incuding markdown
  ```
  extends ../layouts/default

  block vars
    - var pageTitle = 'First post title'

  block content
    include README.md
  ```
* Add link to entry point `README.md`
  ```
  [First post](first-post)
  ```
* Prepare to publish
  ```
  grunt publish
  ```
* Push to repository
  ```
  git add .
  git commit -m "first post commit"
  git push origin master
  ```
* Go to `http://{username}.gitgub.io/`
* Profit

#### Structure
```
package.json - npm package config
Gruntfile.js - grunt tasks config
layouts/ - jade layouts
index.jade - entry point
README.md - entry point content
static/ - img, css, js 
.gitignore - ignore unnecessary files
```
