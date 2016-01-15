/*jslint node: true*/

var chai = require("chai"),
    expect = require("chai").expect;

var OpenAMClient = require('../lib/OpenAMClient');
OpenAMClient = new OpenAMClient();

var nconf = require('nconf');
nconf.argv().env().file({ file: 'config.json' });
var endpoint = nconf.get('endpoint');
var user1 = nconf.get('user1');
var password1 = nconf.get('password1');

describe("OpenAM REST Client", function () {
    "use strict";

    function sleep(time, callback) {
        var stop = new Date().getTime();
        while (new Date().getTime() < stop + time) {
            ;
        }
        callback();
    }

    it("Authentication OK", function () {
        this.timeout(5000);

        var token = null;

        OpenAMClient.setEndPoint(endpoint);
        OpenAMClient.setCredential(user1, password1);

        return OpenAMClient.authenticate().then(function (result) {
            token = result.tokenId;
            expect(token).is.a("string");
        }).then(function (result) {
            return OpenAMClient.logout(token);
        }).then(function (result) {
            expect(true).is.a("boolean");                  
        });

    });

    it("Authentication KO", function () {
        this.timeout(5000);

        var token = null;

        OpenAMClient.setEndPoint(endpoint);
        OpenAMClient.setCredential(user1, password1 + "1");

        return OpenAMClient.authenticate().then(function (result) {
            //console.log(result);
        }).catch(function (reason) {
            var result = JSON.parse(reason);
            expect(result.code).to.be.equal(401);
        });

    });

    it.skip("Update inactivity session status", function () {
        this.timeout(500000);

        var username = "aguila_roja_1";
        var password = "12345678";
        var token = null;
        var application = "Game1";
        var resources = [];
        resources.push("PROVIDER1");

        OpenAMClient.setEndPoint(endpoint);
        OpenAMClient.setCredential(username, password);

        return OpenAMClient.authenticate().then(function (result) {
            token = result.tokenId;
            return OpenAMClient.authorizate(token, application, resources);
        }).then(function (result) {                  
            sleep(10000, function () {
                console.log("10 seconds");
            });
            sleep(10000, function () {
                console.log("10 seconds");
            });
            sleep(10000, function () {
                console.log("10 seconds");
            });
            sleep(10000, function () {
                console.log("10 seconds");
            });
            sleep(10000, function () {
                console.log("10 seconds");
            });
            sleep(10000, function () {
                console.log("10 seconds");
            });
            console.log("Un minuto");
            sleep(10000, function () {
                console.log("10 seconds");
            });
            var identityOptions = {
                subjectid: token,
                refresh:true
            }
            return OpenAMClient.getIdentityData(identityOptions)
        }).then(function (result) {
            return OpenAMClient.logout(token);
        }).then(function (result) {          
            expect(true).is.a("boolean");
        });

    });

    it.skip("Force timeout problem", function () {
        this.timeout(500000);

        var username = "aguila_roja_1";
        var password = "12345678";
        var token = null;
        var application = "Game1";
        var resources = [];
        resources.push("PROVIDER1");

        OpenAMClient.setEndPoint(endpoint);
        OpenAMClient.setCredential(username, password);

        return OpenAMClient.authenticate().then(function (result) {
            token = result.tokenId;
            return OpenAMClient.authorizate(token, application, resources);
        }).then(function (result) {            
            sleep(10000, function () {
                console.log("10 seconds");
            });
            sleep(10000, function () {
                console.log("10 seconds");
            });
            sleep(10000, function () {
                console.log("10 seconds");
            });
            sleep(10000, function () {
                console.log("10 seconds");
            });
            sleep(10000, function () {
                console.log("10 seconds");
            });
            sleep(10000, function () {
                console.log("10 seconds");
            });
            console.log("Un minuto");
            sleep(10000, function () {
                console.log("10 seconds");
            });
            sleep(10000, function () {
                console.log("10 seconds");
            });
            sleep(10000, function () {
                console.log("10 seconds");
            });
            sleep(10000, function () {
                console.log("10 seconds");
            });
            sleep(10000, function () {
                console.log("10 seconds");
            });
            sleep(10000, function () {
                console.log("10 seconds");
            });
            console.log("Un minuto");
            sleep(10000, function () {
                console.log("10 seconds");
            });            
        }).then(function (result) {
            var identityOptions = {
                subjectid: token,
                attributenames:"idletime",
                attributenames:"maxidletime",
                attributenames:"timeleft"
            }
            return OpenAMClient.getIdentityData(identityOptions)
        //}).then(function (result) {
        //    return OpenAMClient.logout(token);
        }).then(function (result) {          
            expect(true).is.a("boolean");
        });

    });





    it.skip("Authentication & Authorization with ADMIN privileges", function () {
        this.timeout(5000);

        var username = "school1teacher1";
        var password = "12345678";
        var token = null;
        var application = "Game1";
        var resources = [];
        resources.push("PROVIDER1");

        OpenAMClient.setEndPoint(endpoint);
        OpenAMClient.setCredential(username, password);

        return OpenAMClient.authenticate().then(function (result) {
            token = result.tokenId;
            return OpenAMClient.authorizate(token, application, resources);
        }).then(function (result) {
            //console.log(result);
            //console.log(result[0].attributes.ADMIN[0]);
            expect(result[0].attributes.ADMIN[0]).is.a("string");
        }).then(function (result) {
            return OpenAMClient.logout(token);
        }).then(function (result) {
            expect(true).is.a("boolean");                  
        });

    });

    it.skip("Authentication & Authorization with READER privileges", function () {
        this.timeout(5000);

        var username = "aguila_roja_1";
        var password = "12345678";
        var token = null;
        var application = "Game1";
        var resources = [];
        resources.push("PROVIDER1");

        OpenAMClient.setEndPoint(endpoint);
        OpenAMClient.setCredential(username, password);

        return OpenAMClient.authenticate().then(function (result) {
            token = result.tokenId;
            return OpenAMClient.authorizate(token, application, resources);
        }).then(function (result) {
            //console.log((result[0].attributes.READERS !== undefined) || (result[0].attributes.ADMIN !== undefined))
            expect(result[0].attributes.READERS[0]).is.a("string");
        }).then(function (result) {
            return OpenAMClient.logout(token);
        }).then(function (result) {
            expect(true).is.a("boolean");                  
        });

    });

    it.skip("Authentication & Authorization with an User without privileges", function () {
        this.timeout(5000);

        var username = "school2teacher1";
        var password = "12345678";
        var token = null;
        var application = "Game1";
        var resources = [];
        resources.push("PROVIDER1");

        OpenAMClient.setEndPoint(endpoint);
        OpenAMClient.setCredential(username, password);

        return OpenAMClient.authenticate().then(function (result) {
            token = result.tokenId;
            return OpenAMClient.authorizate(token, application, resources);
        }).then(function (result) { 
            expect(
                (
                    (result[0].attributes.READERS !== undefined) || 
                    (result[0].attributes.ADMIN !== undefined)
                )).is.equal(false);
        }).then(function (result) {
            return OpenAMClient.logout(token);
        }).then(function (result) {
            expect(true).is.a("boolean");                  
        });

    });

    it.skip("Authentication, Game Authorization & Service Authorization with an User with privileges", function () {
        this.timeout(5000);

        var username = "school2teacher1";
        var password = "12345678";
        var token = null;
        var application = "Game1";
        var resources = ["PROVIDER1"];
        var application2 = "PSLService1";
        var resources2 = ["WRITE"];

        OpenAMClient.setEndPoint(endpoint);
        OpenAMClient.setCredential(username, password);

        return OpenAMClient.authenticate().then(function (result) {
            token = result.tokenId;
            return OpenAMClient.authorizate(token, application, resources);
        }).then(function (result) { 
            expect(
                (
                    (result[0].attributes.READERS !== undefined) || 
                    (result[0].attributes.ADMIN !== undefined)
                )).is.equal(false);
        }).then(function (result) {
            return OpenAMClient.authorizate(token, application2, resources2);
        }).then(function (result) {            
            return OpenAMClient.logout(token);
        }).then(function (result) {
            expect(true).is.a("boolean");                  
        });

    });

});