var assert = require("assert")
var should = require("should")
var Parse = require('parse').Parse;
var Path = require("path");
var rimraf = require("rimraf");
var http = require("http")

Parse.initialize( "IOcg1R4TxCDCPVsxAwLHkz8MPSOJfj2lZwdL4BU4", "jOr74Zy7C8VbatIvxoNyt2c03B9hPY7Hc32byA78" );

var fs = require("fs")
var _3setup = require("../src/3setup")
var _3download = require("../src/3download")
var _3dev = require("../src/3dev")
var _3install = require("../src/3install")

var Path = require("path")

describe('3VOT Server', function(){
  
  it('should start the server and run the app', function(done){
    var _this = this;
    
    process.chdir( Path.join( process.cwd(), "3vot_cli_test" ) );
    
    _3dev.startServer(null, function(){
      _this.timeout(10500);
      
      http.get("http://localhost:3000/cli_test/gold", function(res) {
        console.log("Got response: " + res.statusCode);
        var depPath = "/cli_test/dependencies/gold/build";
        http.get("http://localhost:3000" + depPath, function(res) {
          done();
        });
      });
    })
  });
});