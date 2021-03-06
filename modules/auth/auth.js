// Copyright, 2013-2014, by Tomas Korcak. <korczis@gmail.com>
//
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
//
// The above copyright notice and this permission notice shall be included in
// all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
// THE SOFTWARE.

(function () {
    'use strict';

    var define = require('amdefine')(module);

    /**
     * Array of modules this one depends on.
     * @type {Array}
     */
    var deps = [
        "./models/user",
        "../core",
        "path",
        "util"
    ];

    define(deps, function (User, Core, path, util) {
        /**
         * Authentication and Authorization Interface
         * @type {AuthModule}
         */
        var exports = module.exports = function Auth(resolver) {
            // Call super constructor
            Auth.super_.call(this, arguments);

            this.mongo = resolver.get('mongo');

            var modelsDir = path.join(__dirname, "models");
            this.mongo.initializeModelsDir(modelsDir);
        };

        util.inherits(exports, Core);

        /**
         * Mongo module instance
         * @type {Mongo}
         */
        exports.prototype.mongo = null;

        /**
         * Add user
         * @param user
         * @returns {Mongoose.Model}
         */
        exports.prototype.userAdd = function(user) {
            var res = new User.Model(user);
            res.save();
            return res;
        };

        /**
         * Remove existing user (first) by query
         * @param user
         * @returns {Query}
         */
        exports.prototype.userRemove = function(user) {
            var res = User.Model.findOne(user);
            res.remove();
            return res;
        };

        /**
         * List user
         * @param filter
         * @returns {*|Query|Mixed|Promise|Object}
         */
        exports.prototype.userList = function(filter) {
            return User.find(filter);
        };

    });
}());