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

document.addEventListener('DOMContentLoaded', function(event) {
    startkit.app();
});
