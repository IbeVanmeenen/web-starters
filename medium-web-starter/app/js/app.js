/* ==========================================================================
   Startkit
   ========================================================================== */

var startkit = startkit || {};

startkit.app = function(undefined) {

    var exports = this.app;

    // Public function
    exports.publicFunction = function() {
        // Public function
    };

    // Init
    var init = function() {
        // Init (self-executing function)
    }();
};

var ready = function (fn) {
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
