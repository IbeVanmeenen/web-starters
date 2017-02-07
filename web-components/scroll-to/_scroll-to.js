/* ==========================================================================
   Webstarter - Scroll To

   // Dependencies:
   - helpers/_offset.js
   - helpers/_easeInOutQuad.js
   ========================================================================== */

webstarter.scrollTo = (body) => {

    let start, currentTime, change,
        to = 0,
        targetOffset,
        defaultOffset = 0,
        duration,
        defaultDuration = 1000,
        increment = 20;


    // Animate Scroll
    const animateScroll = () => {
        currentTime += increment;

        var amount = webstarter.easeInOutQuad(currentTime, start, change, duration);
        document.body.scrollTop = document.documentElement.scrollTop = amount;

        if (currentTime < duration) {
            window.requestAnimationFrame(animateScroll);
        }
    };


    // Init
    const init = (() => {
        [].forEach.call(document.getElementsByClassName('js-scroll-to'), (el) => {
            el.addEventListener('click', (e) => {
                e.preventDefault();

                const target = el.getAttribute('href').slice(+1);
                const dataOffset = el.getAttribute('data-offset');
                const dataDuration = el.getAttribute('data-animation-duration');

                targetOffset = (dataOffset !== null && dataOffset !== undefined && !isNaN(dataOffset)) ? dataOffset : defaultOffset;
                duration = (dataDuration !== null && dataDuration !== undefined && !isNaN(dataDuration)) ? dataDuration : defaultDuration;

                const targetEl = document.getElementById(target);
                const targetTop = webstarter.offset.top(targetEl) - targetOffset;

                start = document.documentElement.scrollTop || document.body.scrollTop;
                change = targetTop - start;
                currentTime = 0;

                animateScroll();
            }, false);
        });
    })();
};
