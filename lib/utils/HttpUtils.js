/*jslint node: true*/

var Promise = require('bluebird');
var request = require('request');

function HttpUtils() {
    "use strict";
    return undefined;
}

HttpUtils.prototype.request = function (options, httpStatusAssert, jsonOutput) {
    "use strict";
    var result = null;

    return new Promise(function (resolve, reject) {

        try {

            request(options, function (error, response, body) {
                if (error) {
                    return reject(error);
                }

                if (jsonOutput) {
                    try {
                        result = JSON.parse(body);
                    } catch (error2) {
                        return reject(error2);
                    }
                } else {
                    result = body;
                }

                if (!error && response.statusCode === httpStatusAssert) {
                    return resolve(result);
                } 

                //Defensive code.
                if (body.length === 0) {
                    return reject("EMPTY_BODY");
                }
                return reject(body);
            });

        } catch (error) {
            return reject(error);
        }

    });

};

module.exports = HttpUtils;
