# Medium Web Starter

The Medium Web Starter is made for building medium scaled websites.

## Short
This startkit includes all you need to start a simple prototype or a very small website. A barebone **index.html** is provided, **Gulp** will automate all your frontend-tasks, **Scss** will be used to write your css, **Bundler** will manage your ruby-gems, **Bower** will manage your vendors and hologram will provide your **styleguide**.


## Getting started

### Bundler
Bundler will manage your ruby-gems and install them project-based. This is nessesary for **hologram**, a ruby-gem that we will use to build our styleguide.

To get started, make sure you have Bundler installed and run `bundle install` to install your gems.

### Gulp
Gulp will automate all your frontend tasks for you. It will read out the **gonfig.json** file to get things started. It takes care of all your assest and optimizes them all. Take a look at **gulpfile.js** to know what is happening. Every task is well documented.

Use the **gonfig.json** file to setup your project for gulp. Define your basic paths and specify witch vendors and js you want in your main javascript file.

To get started, run `npm install` in your terminal at the root of the project folder and then run `gulp` to build your app and to start a local server (localhost:8080) and a watch for your live-reload files.

### Bower
Setup your vendors in the **bower.json** file.
Use the **.bowerrc** to specify where your vendors will be placed. Gulp will also use this file to find out where your vendors are located.
Now do `bower install` in your terminal at the root of the project folder to install your vendors.

### Styles
The Medium Web Starter also includes a extended styles setup. It has a custom normalize, a basic folder structure, some basic typography styles, some default components and some default config-files to get you started.

### Styleguide
Hologram is used to create our styleguide. You can find the styleguide at `/dist/styleguide/index.html`. The styleguides content is written in the scss files themself.

### Index.html
The index.html is the base-html file of the starter-kit. It includes the bare-minimal to get you going.

### Editor config
There is also a **.editorconfig** file present to ensure code-consistency throughout your files.
