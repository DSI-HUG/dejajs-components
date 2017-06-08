/*
 *  @license
 *  Copyright Hôpitaux Universitaires de Genève. All Rights Reserved.
 *
 *  Use of this source code is governed by an Apache-2.0 license that can be
 *  found in the LICENSE file at https://github.com/DSI-HUG/dejajs-components/blob/master/LICENSE
 */

window.sendAction = (function() {
    function sendAction() {
        var params = [];
        for (var i = 0; i < arguments.length; i++) {
            params[i - 0] = arguments[i];
        }
        if (typeof GlobalEventEmmitter === "function") {
            GlobalEventEmmitter.instance.emit("sendaction", params);
        }
    }
    return sendAction;
}());
