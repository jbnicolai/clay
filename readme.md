3VOT - Build an App for That

3VOT helps you build and deploy apps quicker. We call it Frontend as a Service.

You can build apps with any javascript framework and style them the best way you can. 

3VOT embraces the concept of modules and web components, you can re-use any component from NPM and Bower. It's an amazing way to build Quality Apps in a few days, that's 5x faster.

3VOT is also a community so you can simply copy an app for free, to your profile and start using as you own; or make a few changes to make it a perfect fit. Developers and Entrepreneurs can also build, customise and sell you amazing apps;

Here is the Information for the Developer to get started, but even if you are not a developer: give it a try.

Requirements:

- NodeJS
- GIT

*Getting Started
You can try this instructions in cloud9.io or Nitrous.io if you don't want to use your computer.
On the command line

Note: You can also try 3vot.com very quickly in nitrous.io

Step 1:
$ npm install 3vot-cli -g

This will install 3VOT Command Line Interface, a tool to build, download and deploy apps.

Step 2:
From your project folder type

$ 3vot setup

Use the following setting for your first demo key: 123456

This will create the directory structure and download all required dependencies from NPM, all dependencies and code used in 3VOT is Open Source.

Step 2.1:
$ cd 3vot_tutorial

This will cd into the project folder

Step 3:
Download a Sample App, courtesy of 3VOT

$ 3vot download

User the following settings:  app: gold , profile: rodco

This will create the folder structure for the App and download all dependencies from NPM and Bower.

Step 4:
Run the App in you development computer

$ 3vot server

If you are running on nitrous.io, find out your preview domain and add it as an option. Else leave blank and hit enter

This will start a development server, just point your browser to http://localhost:3000/tutorial/gold

If you are using nitrous.io, point the server to NITROUS_URL/tutorial/gold

Step 5:
Make change to your app

Go ahead and open the file in 3vot_tutorial/apps/gold/templates/layout.html 

Refresh your browser and you'll see the changes.

Step 6:
Update the version of your app

$ 3vot version

This will increment the version of your own App, you can also do it manually in apps/gold/package.json;

Step 7:
Register and Deploy your App

$ 3vot upload 

User the following setting app: gold

This will upload the App to your profile, you'll later be able publish it to the world.

It will also deploy a demo of your app. Visit http://demo.3vot.com/tutorial/gold_0.0.xx

Tests
Test are located in the spec folder, they run directly with the 3VOT Platform and should be executed in order.

This are the test

3setup_spec.js
3download_spec.js
3version_spec.js
3upload_spec.js

To run the tests:
$ mocha ./spec/3setup_spec.js

About 3VOT
3VOT is a company that packs the best open source modules, and the industry standard best practices into a Comercial Solution that enables every organisation to build their own apps. 

3VOT is currently in Private Beta, and we'll open and account for you if you are interested.