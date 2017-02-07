/* ==========================================================================
   Webstarter - Helper: easeInOutQuad
   ========================================================================== */

webstarter.easeInOutQuad = (currentTime, start, change, duration) => {
    currentTime /= duration / 2;

    if (currentTime < 1) {
        return change / 2 * currentTime * currentTime + start;
    }

    currentTime--;

    return -change / 2 * (currentTime * (currentTime - 2) - 1) + duration;
};
