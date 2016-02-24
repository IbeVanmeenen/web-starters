# Small Web Starter

The Small Web Starter is made for building prototypes or very small websites.


## Short
The Small Web Starter includes all you need to start a prototype or very small website. Highlights: **Gulp** will automate all your frontend-tasks, **Scss** will be used to write your css and **Bower** will manage your vendors.


## Getting started

### Vendors
[Bower](http://bower.io/) is used to manage all our vendors.

Setup your vendors in the **bower.json** file. Use the **.bowerrc** to specify where your vendors will be placed. Gulp will also use this file to find out where your vendors are located.

Now run `bower install` in your terminal at the root of the project folder to install your vendors.


### Gulp
[Gulp](http://gulpjs.com/) will automate all your frontend-tasks for you. It will read out the **gonfig.json** file to get things started. It will take care of all your assest. Be sure to take a look at **gulpfile.js** to know what is going on. Every task is well documented.

Use the **gonfig.json** file to setup your project for gulp. Define your basic paths and specify witch vendors and js you want in your main javascript file.

To get started, run `npm install` in your terminal at the root of the project folder and then run `gulp` to build your app and to start a local server (localhost:8080) and a watch for your live-reload files.


### Styles
[Scss](http://sass-lang.com/) is used to write your css. Gulp will take care of the compiling and will store your css in the `dist/css/` folder.

A extended styles scaffolding is provided and can be found at `app/scss/`.
It provides a basic folder structure, a custom normalize and some basic typography styles.


### Javascript
A namespaced scaffolding is provided and can be found at `app/js/`.

Gulp will uglify (only when you execute the build-task) and combine all your javascript-files into one single file named **footer.min.js**. It will store this file in the `dist/js/` folder.


### Editor config
There is also a **.editorconfig** file present to ensure code-consistency throughout your files.


### Images
Place your images in `app/img/` and Gulp will optimize any image and svg present. It will store the optimized files in the `dist/img/` folder.
