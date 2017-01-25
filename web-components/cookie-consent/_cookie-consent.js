/* ==========================================================================
   Webstarter - Cookies
   ========================================================================== */

webstarter.cookies = () => {

    // Setup
    const setup = () => {
        const cookieBar = document.getElementById('cookie-bar');
        const cookieBarConsentBtn = document.getElementById('cookie-bar-consent-btn');

        cookieBar.classList.add('cookie-bar--visible');

        cookieBarConsentBtn.addEventListener('click', (e) => {
            e.preventDefault();
            document.cookie = 'slimbox-cookie-consent=true; expires=Fri, 31 Dec 9999 23:59:59 GMT; path=/';
            cookieBar.classList.remove('cookie-bar--visible');
        });
    };


    // Init
    const init = (() => {
        const hasCookie = document.cookie.match(/(?:(?:^|.*;\s*)webstarter\-cookie\-consent\s*\=\s*([^;]*).*$)|^.*$/)[1];

        if (typeof hasCookie === 'undefined' || hasCookie === 'false') {
            setup();
        }
    })();
};
