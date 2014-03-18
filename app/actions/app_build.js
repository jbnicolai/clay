var Q = require("q");
var colors = require('colors');
var Path = require('path');
var fs = require("fs")
var Builder = require("../utils/builder")
var Transform = require("../utils/transform")
var WalkDir = require("../utils/walk")

var App = require("../models/app")

var promptOptions= { 
  app_name: null,
  target: null
}

var tempVars={
  app: null
}

function execute( app_name, target, buildDependency, domain ){
  console.info("Building " + app_name.yellow)

  var deferred = Q.defer();
  var pkgPath = Path.join( process.cwd(), "3vot.json");
  var pck  = require(pkgPath);

  var appPkgPath = Path.join( process.cwd(), "apps", app_name, "package.json");
  var appPkg  = require(appPkgPath);


  promptOptions= { 
    app_name: app_name,
    target: target,
    buildDependency: buildDependency || false,
    package: pck,
    app_package: appPkg,
    domain: domain
  }
  
  Builder.buildApp( promptOptions.app_name, pck.user_name )
  .then( function(){ 
    if(promptOptions.buildDependency){ 
      return Builder.buildDependency(promptOptions.app_name);
    } 
    else{
      return false;
    } 
  })
  .then( function(){ return transformAssets( promptOptions.app_name ) })
  .then( function(){ return transformFiles( promptOptions.app_name ) })
  .then( function(){ return deferred.resolve(promptOptions.app_name) })
  .fail( function(err){ deferred.reject(err); })

  return deferred.promise;
}

function transformAssets(app_name){
  var assets = WalkDir( Path.join( process.cwd(), "apps", app_name, "assets" ) );

  assets.forEach( function(path){
    var file = null;
    if(path.name.indexOf(".html") > 0 || path.name.indexOf(".js") > 0 || path.name.indexOf(".css") > 0){
      file = fs.readFileSync( path.path, "utf-8");
      if(promptOptions.target == "localhost"){
        file = Transform[promptOptions.target](file, promptOptions.package.user_name, app_name, promptOptions.domain);
      }
      else{
        file = Transform[promptOptions.target](file, promptOptions.package.user_name, app_name, promptOptions.app_package.threevot.version );
      }
    }
    else{
      file = fs.readFileSync( path.path);
    }
    fs.writeFileSync( Path.join( process.cwd(), "apps", app_name, "app", "assets", path.name ) , file );
  });
}

function transformFiles(app_name){
  var assets = WalkDir( Path.join( process.cwd(), "apps", app_name, "app" ) );

  assets.forEach( function(path){
    if(path.name.indexOf(".html") > 0 || path.name.indexOf(".js") > 0 || path.name.indexOf(".css")){
      var file = fs.readFileSync( path.path, "utf-8"  );
      if(promptOptions.target == "localhost"){
        file = Transform[promptOptions.target](file, promptOptions.package.user_name, app_name, promptOptions.domain );
      }
      else{
        file = Transform[promptOptions.target](file, promptOptions.package.user_name, app_name, promptOptions.app_package.threevot.version );
      }      
      fs.writeFileSync( path.path, file );
    }
  });
}


module.exports = execute;