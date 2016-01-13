/* ==========================================================================
   Startkit
   ========================================================================== */

startkit.app = function(undefined) {

    var exports = this.app;


    // Scroll
    var appScroll = function() {
        // Put functions in the '_update' function :-)
        var _onScroll, _requestTick, _update,
            latestKnownScrollY = 0,
            ticking = false;

        _onScroll = function() {
            latestKnownScrollY = window.pageYOffset;
            _requestTick();
        };

        _requestTick = function() {
            if (!ticking) {
                window.requestAnimationFrame(_update);
            }
            ticking = true;
        };

        _update = function() {
            ticking = false;
            var currentScrollY = latestKnownScrollY;

            // startkit.component.updateScroll(currentScrollY);
        };

        // scroll mousewheel wheel
        window.onscroll = function(e) {
            _onScroll();
        };
    };


    // On load
    exports.onload = function() {

    };


    // Init
    var init = function() {
        startkit.component();
    }();
};


var ready = function(fn) {
    // Sanity check
    if (typeof(fn) !== 'function') return;

    // If document is already loaded, run method
    if (document.readyState === 'complete') {
        return fn();
    }

    // Otherwise, wait until document is loaded
    document.addEventListener('DOMContentLoaded', fn, false);
};

ready(function() {
    startkit.app();
});


window.onload = function() {
    scintillate.app.onload();
};
