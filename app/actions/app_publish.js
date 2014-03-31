var Aws = require("aws-sdk");
var Path = require("path")
var fs = require("fs")
var Q = require("q");

var Transform = require("../utils/transform")

var AwsCredentials = require("../aws/credentials");
var AwsHelpers = require("../aws/helpers");

var App = require("../models/app")

var promptOptions = {
  user_name: null,
  app_name: null,
  app_version: null,
  paths: null,
  main: false
}

var tempVars= {
  app: null,
  indexFileContents: null,
  app_keys: null,
  dep_keys: null
}

function execute(options){
  console.log("Publishing Apps to the 3VOT Platform")
  var deferred = Q.defer();
  
  if( !options.paths ) options.paths = { sourceBucket: "source.3vot.com", productionBucket: "3vot.com", demoBucket: "demo.3vot.com"}
  
  promptOptions = options;

  getApp()
  .then( function(){ return AwsCredentials.requestKeysFromProfile( promptOptions.user_name) })
  .then( uploadHtmlToProduction )
  .then(function(){ 
    var url = "http://3vot.com/" + promptOptions.user_name 
    if( !promptOptions.main ) url += "/" + promptOptions.app_name
    return console.log("App Available at " + url  ) 
    })
  .then(function(){ return deferred.resolve(tempVars.app) } )
  .fail( function(err){ return deferred.reject(err); } )

  return deferred.promise;
}

function getApp(){
  var deferred = Q.defer();
  
  callbacks={
    done: function(response){
      if(response.body.length == 0) throw "App not found, or Wrong Keys+Username pair" 
      tempVars.app = App.last()
      if(!promptOptions.app_version) promptOptions.app_version = tempVars.app.version
      return deferred.resolve( this ) 
    },
    fail: function(error){        
      return deferred.reject( error )
    }
  }
  
  App.fetch( { query: { select: App.querySimpleByNameAndProfileSecurity, values: [ promptOptions.user_name, promptOptions.app_name ] }  }, callbacks )
  
  return deferred.promise;
}

  
function uploadHtmlToProduction(){
  var deferred = Q.defer();

  var indexPath = Path.join( process.cwd(), "apps", promptOptions.app_name, "app", "index.html" )
  var indexContents = fs.readFileSync(indexPath, "utf-8");
  
  var key = promptOptions.user_name 
  if( !promptOptions.main ) key += "/" + promptOptions.app_name
  key += "/index.html"

  indexContents = Transform["production"](indexContents, promptOptions.user_name, promptOptions.app_name, promptOptions.app_version)

  var path =   { 
    body: indexContents,
    key: key,
    path: promptOptions.paths.productionBucket + "/" + key
  }
  
  AwsHelpers.uploadFile( promptOptions.paths.productionBucket , path )
  .then(  function(){ return deferred.resolve()  } )
  .fail(  function(){ return deferred.reject()  } )    
  
  return deferred.promise
}

module.exports = execute;