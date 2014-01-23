﻿/*
 Copyright, 2013, by Tomas Korcak. <korczis@gmail.com>

 Permission is hereby granted, free of charge, to any person obtaining a copy
 of this software and associated documentation files (the "Software"), to deal
 in the Software without restriction, including without limitation the rights
 to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 copies of the Software, and to permit persons to whom the Software is
 furnished to do so, subject to the following conditions:

 The above copyright notice and this permission notice shall be included in
 all copies or substantial portions of the Software.

 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 THE SOFTWARE.
 */

(function () {
    'use strict';

    var deferred = require('deferred'),
        fs = require('fs'),
        merge = require('node.extend'),
        moment = require('moment');
    /**
     * Returns loaded config with merged environments
     * @param path string Path to config file
     * @param env string Environment used
     */
    module.exports.loadConfig = function (path, env) {
        if (env === undefined || env === null) {
            env = "local";
        }

        var tmp = require(path);

        var glob = tmp._global || {};
        var loc = tmp[env] || {};

        return merge(true, glob, loc);
    };

    /**
     * Sets objects property by name (dot nototation)
     * @param obj Object to be updated
     * @param prop Propert name in dot notation
     * @param value Value
     */
    module.exports.setObjectProperty = function (obj, prop, value) {
        if (typeof prop === "string") {
            prop = prop.split(".");
        }

        if (prop.length > 1) {
            var e = prop.shift();
            module.exports.setObjectProperty(obj[e] =
                Object.prototype.toString.call(obj[e]) === "[object Object]"
                    ? obj[e]
                    : {},
                prop,
                value);
        } else {
            obj[prop[0]] = value;
        }
    };

    /**
     * Returns formatted time as timestamp
     * @param fmt Optional format string
     * @param dt Optional date time
     * @returns {*} Formatted timestamp
     */
    module.exports.timestamp = function(fmt, dt) {
        if(!fmt) {
            fmt = "YYYY/MM/DD HH:mm:ss.ms";
        }

        return moment(dt).format(fmt);
    };

    /**
     * Returns UUID - Universaly Unique Identifier
     * @returns {*|string}
     */
    module.exports.generateUUID = function() {
        var d = new Date().getTime();
        var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
            var r = (d + Math.random()*16)%16 | 0;
            d = Math.floor(d/16);
            return (c === 'x' ? r : (r & 0x7 | 0x8)).toString(16);
        });
        return uuid;
    };

}());