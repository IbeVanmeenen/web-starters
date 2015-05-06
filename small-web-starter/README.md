# Small Web Starter

Simple startkit for building quick prototypes and webpages.<br>
Based on workflow at @Kunstmaan.

## Basic
This startkit includes all you need to start a simple prototype or webpage(s). A barebone **index.html** is provided, **Gulp** will automate all your frontend-tasks, **Scss** will be used to write your css and **Bower** will manage your vendors.


## Getting started

### Bower
Setup your vendors in the **bower.json** file.
Use the **.bowerrc** to specify where your vendors will be placed. Gulp will also use this file to find out where your vendors are located.
Now do `bower install` in your terminal at the root of the project folder to install your vendors.

### Gulp
Gulp will automate all your frontend tasks for you. It will read out the **gonfig.json** file to get things started. It takes care of all your assest and optimizes them all. Take a look at **gulpfile.js** to know what is happening. Every task is well documented.

Use the **gonfig.json** file to setup your project for gulp. Define your basic paths and specify witch vendors and js you want in your main javascript file.

To get started, run `npm install` in your terminal at the root of the project folder and then run `gulp` to build your app and to start a local server (localhost:8080) and a watch for your live-reload files.

### Styles
The starter-kit also includes a basic styles setup. It has a custom normalize, a basic folder structure, some basic typography styles and some default config-files to get you started.

### Index.html
The index.html is the base-html file of the starter-kit. It includes the bare-minimal to get you going.

### Editor config
There is also a **.editorconfig** file present to ensure code-consistency throughout your files.

## Contribution

Want to contribute? Awesome Sause! Please read on!

##### Git Flow
Small-starter-kit works with [git-flow](https://github.com/nvie/gitflow).

For a contribution to this project, you need to follow the [following workflow](https://github.com/nvie/gitflow#initialization) with the addition of a pull-request.

Example for adding a feature:

- Start from develop (make sure to pull first)
- `git flow feature start -your feature name-`
- `git flow feature publish -your feature name-`
- start making your changes (commit and push regularly)
- when done, make a pull-request from your feature branch to develop
- after the pull-request is accepted, do `git flow feature finish -your feature name-`


## License
The small-starter-kit is licensed under the [MIT license](http://opensource.org/licenses/MIT).
