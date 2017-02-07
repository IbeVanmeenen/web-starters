/* ==========================================================================
   Webstarter - Helper: Get offset
   ========================================================================== */

webstarter.offset = (body) => {

    let exports = webstarter.offset;


    // Get
    exports.top = (el) => {
        let _top = 0;

        const start = document.documentElement.scrollTop || document.body.scrollTop;

        while(el && !isNaN(el.offsetTop)) {
            _top += el.offsetTop - el.scrollTop;
            el = el.offsetParent;
        }

        return _top + start;
    };
};
