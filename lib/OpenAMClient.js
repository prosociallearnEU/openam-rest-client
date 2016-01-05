/*jslint node: true*/

var HttpUtils = require('./utils/HttpUtils');

/**
 * [OpenAMClient description]
 */
function OpenAMClient() {
    "use strict";
    this.REST = new HttpUtils();
    this.endpoint = null;
    this.username = null;
    this.password = null;
}

/**
 * [setEndPoint description]
 * @param {[type]} endPoint [description]
 */
OpenAMClient.prototype.setEndPoint = function (endPoint) {
    "use strict";
    this.endpoint = endPoint;
};

/**
 * [setCredential description]
 * @param {[type]} username [description]
 * @param {[type]} password [description]
 */
OpenAMClient.prototype.setCredential = function (username, password) {
    "use strict";
    this.username = username;
    this.password = password;
};

/**
curl \
--request POST \
--header "Content-Type: application/json" \
--header "X-OpenAM-Username: xxx" \
--header "X-OpenAM-Password: yyy" \
--header "Accept-API-Version: resource=2.0, protocol=1.0" \
http://openam.example.com:8080/openam/json/authenticate
*/
OpenAMClient.prototype.authenticate = function () {
    "use strict";
    var options = {
        method: 'POST',
        url: this.endpoint + "/json/authenticate",
        headers: {
            'Content-Type': 'application/json',
            'X-OpenAM-Username': this.username,
            'X-OpenAM-Password': this.password,
            'Accept-API-Version': 'resource=2.0, protocol=1.0'
        }
    };

    return this.REST.request(options, 200, true);
};

/*
curl \
--request POST \
--header "iPlanetDirectoryPro: AQIC5wM2LY4Sfcztiql_GnAnq4NUl70DmN-r5v-QMkbe6TE.*AAJTSQACMDEAAlNLABM4NDgwMDA2MDc0MjY1NDQ4OTAz*" \
--header "Content-Type: application/json" \
--data '{"resources": ["http://www.example.com"], "application": "iPlanetAMWebAgentService"}' \
http://openam.example.com:8080/openam/json/policies?_action=evaluate
*/
OpenAMClient.prototype.authorizate = function (token, application, resources) {
    "use strict";

    var appOptions = {
        resources: resources,
        application: application
    };
    var options = {
        method: 'POST',
        url: this.endpoint + "/json/policies?_action=evaluate",
        headers: {
            iPlanetDirectoryPro: token,
            "Content-Type": "application/json"
        },
        json: appOptions
    };

    return this.REST.request(options, 200, false);
};

/**
 * [getIdentityData description]
 * 
 * $ curl "https://openam.example.com:8443/openam/identity/attributes?\
 * subjectid=AQIC5wM2LY4SfcxuxIP0VnP2lVjs7ypEM6VDx6srk56CN1Q.*AAJTSQACMDE.*\
 * &refresh=true"
 * 
 * @param  {[type]} identityOptions [description]
 * @return {[type]}                 [description]
 */
OpenAMClient.prototype.getIdentityData = function (identityOptions) {
    "use strict";
    var options = {
        method: 'POST',
        url: this.endpoint + "/identity/attributes",
        form: identityOptions
    };

    return this.REST.request(options, 200, false);
};

/**
 * [logout description]
 * 
 * $ curl \
 * --request POST \
 * --data "subjectid=AQIC5w...*AAJTSQACMDE.*" \
 * https://openam.example.com:8443/openam/identity/logout
 * 
 * @param  {[type]} token [description]
 * @return {[type]}       [description]
 */
OpenAMClient.prototype.logout = function (token) {
    "use strict";
    var logoutOptions = {
        subjectid: token
    }    
    var options = {
        method: 'POST',
        url: this.endpoint + "/identity/logout",
        form: logoutOptions
    };

    return this.REST.request(options, 200, false);
};

module.exports = OpenAMClient;
