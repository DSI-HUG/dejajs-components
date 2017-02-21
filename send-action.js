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
