var prompt = require("prompt")
var LoadPackage = require("../app/utils/package_loader")

var Setup = require("../app/actions/salesforce_setup")
var Dev = require("../app/actions/salesforce_dev")
var Upload = require("../app/actions/salesforce_upload")

function setup(callback){
  prompt.start();
  prompt.get( [ 
    { name: 'salesforce_user', description: 'User Name: ( Salesforce Admin User )' } , 
    { name: 'password', description: 'Password:' , hidden: true } , 
    { name: 'key', description: 'Security Token ( info here: https://help.salesforce.com/HTViewHelpDoc?id=user_security_token.htm&language=en_US )' } ], 
    function (err, result) {
      LoadPackage(result)
      .then( Setup )
      .then( function(){ console.log("Salesforce Setup Succesful".green); } )
      .then( function(){ if(callback) return callback(); })
      .fail( function(err){console.error(err); } )
  });
}

function upload(callback){
  prompt.start();
  prompt.get( 
    [ { name: 'app_name', description: 'App Name: ( The name of the app you want to develop on salesforce )' } ],
    function (err, result) {
      LoadPackage(result)
      .then( Upload )
      .then( function(){ console.log("Salesforce Setup Succesful".green); } )
      .then( function(){ if(callback) return callback(); })
      .fail( function(err){console.error(err); } )
    }
  );
}

function dev(callback){
  prompt.start();
  prompt.get( 
    [ { name: 'app_name', description: 'App Name: ( The name of the app you want to develop on salesforce )' } ],
    function (err, result) {
      LoadPackage(result)
      .then( Dev )
      .then( function(){ console.log("Salesforce Development App Published Succesful".green); } )
      .then( function(){ if(callback) return callback(); })
      .fail( function(err){console.error(err); } )
    }
  );
}

module.exports = {
  setup: setup,
  upload: upload,
  dev: dev
}