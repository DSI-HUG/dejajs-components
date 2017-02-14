(function() {
    setInterval(function() {
        sendAction((new Date()).getTime(), `This is a date`);
    }, 1000);
})();
