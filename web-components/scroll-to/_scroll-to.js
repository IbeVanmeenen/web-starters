/* ==========================================================================
   Webstarter - Scroll To
   ========================================================================== */

webstarter.scrollTo = (body) => {

    let start, currentTime, change,
        to = 0,
        targetOffset,
        defaultOffset = 0,
        duration,
        defaultDuration = 1000,
        increment = 20;


    // Animation Helper
    Math.easeInOutQuad = (t,b,c,d) => {
        t /= d/2;
        if (t < 1) {
            return c/2*t*t + b;
        }
        t--;
        return -c/2 * (t*(t-2) - 1) + b;
    };


    // Animate Scroll
    const animateScroll = () => {
        currentTime += increment;

        var amount = Math.easeInOutQuad(currentTime, start, change, duration);
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
                const targetTop = targetEl.offsetTop - targetOffset;

                start = document.documentElement.scrollTop || document.body.scrollTop;
                change = targetTop - start;
                currentTime = 0;

                animateScroll();
            }, false);
        });
    })();
};
