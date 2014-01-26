/*
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

(function (global) {
    define(["config", "jquery", "bootstrap", "handlebars", "ember", "socketio", "exports"], function (config, $, bootstrap, handlebars, Ember, io, exports) {
        var App = window.App = Ember.Application.create({
            options: {},

            socket: null,

            initialize: function () {
                $(document).ready(function () {
                    var i = 0,
                        words = [
                            'love',
                            'scrape',
                            'clean',
                            'organize',
                            'distribute',
                            '$ell'
                        ];

                    $('#changeOnClick').click(function () {
                        i++;
                        $(this).text(words[i]);
                        if (i == words.length) {
                            i = 0;
                            $(this).text(words[0]);
                        }
                    });
                });
            }
        });

        exports.App = App;
        global.App = App;

        return App;
    });
})(this);