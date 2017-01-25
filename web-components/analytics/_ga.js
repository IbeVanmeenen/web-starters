/* ==========================================================================
   Webstarter - Analytics
   ========================================================================== */

webstarter.ga = () => {

    let exports = webstarter.ga;

    const webPropertyId = 'XX-00000000-0';


    // Setup Analytics
    const setup = () => {
        // Get Script
        /* jshint ignore:start */
        (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)})(window,document,'script','https://www.google-analytics.com/analytics.js','ga');
        /* jshint ignore:end */

        // Create Tracker Object
        ga('create', webPropertyId, 'auto');

        // Send pageview
        ga('send', 'pageview');

        // Find analytics links
        eventItems();
    };



    // Send event
    exports.sendEvent = (eventCategory, eventAction, eventLabel) => {
        ga('send', 'event', eventCategory, eventAction, eventLabel);
    };



    // Events links
    const eventItems = () => {
        [].forEach.call(document.getElementsByClassName('js-analytics-item'), (link) => {
            link.addEventListener('click', () => {
                exports.sendEvent(link.dataset.analyticsCategory, link.dataset.analyticsAction, link.dataset.analyticsLabel);
            }, false);
        });
    };



    // Init
    const init = (() => {
        setup();
    })();
};
