// Generated by CoffeeScript 1.7.1
var Path, Setup, nock, rimraf, should, sinon;

Login = require("../../app/salesforce/login");

should = require("should");

nock = require("nock");

rimraf = require("rimraf");

Path = require("path");

sinon = require("sinon");
require("sinon/lib/sinon/mock");
require("sinon/lib/sinon/sandbox");
require("sinon/lib/sinon/stub");
require("sinon/lib/sinon/spy");
require("sinon/lib/sinon/test");
require("sinon/lib/sinon/collection");
require("sinon/lib/sinon/match");
require("sinon/lib/sinon/util/event");
require("sinon/lib/sinon/util/fake_server");
require("sinon/lib/sinon/util/fake_xml_http_request");
require("sinon/lib/sinon/util/xhr");


describe('3VOT Salesforce', function() {
  before(function(done) {
    var projectPath;
    projectPath = Path.join(process.cwd(), "3vot_cli_2_test");
    console.info("Changing current directory in profile before to " + projectPath);
    process.chdir(projectPath);
    return done();
  });
  
  after(function() {
    var projectPath;
    projectPath = Path.join(process.cwd(), "..");
    console.info("Restoring current directory in profile after to");
    return process.chdir(projectPath);
  });
  
  return it('should login to salesforce', function(done) {
    this.timeout(20000);
    var server = sinon.fakeServer.create();

    var login = Login({
      user_name: "cli_2_test",
      public_dev_key: process.env.public_dev_key,
      salesforce: {
        user_name: "one",
        password: "two",
        key: "thre"
      }
    })

    login.fail( function(_this) {
      return function(error) {
        return error.should.equal("");
      };
    })
    
    login.done(function() {
      return done();
    });
    
    return server.requests[0].respond( 200, { "Content-Type": "application/json" }, 
      JSON.stringify( [ { instance_url: "https://na99.salesforce.com", access_token: "abcdefg", id: "https://na15.salesforce.com/abcdefg/abcdeff" } ] ) 
    );

  });
});