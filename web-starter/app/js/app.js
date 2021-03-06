webstarter.app = () => {

    let exports = webstarter.app;


    // Scroll
    const appScroll = () => {
        // Put functions in the '_update' function :-)
        let latestKnownScrollY = 0,
            ticking = false;

        const _onScroll = () => {
            latestKnownScrollY = window.pageYOffset;
            _requestTick();
        };

        const _requestTick = () => {
            if (!ticking) {
                window.requestAnimationFrame(_update);
            }
            ticking = true;
        };

        const _update = () => {
            ticking = false;
            const currentScrollY = latestKnownScrollY;

            // webstarter.component.updateScroll(currentScrollY);
        };

        // scroll mousewheel wheel
        window.onscroll = (e) => {
            _onScroll();
        };
    };


    // On load
    exports.onload = () => {

    };


    // Init
    const init = (() => {
        webstarter.component();
    })();
};

webstarter.app();

window.onload = () => {
    webstarter.app.onload();
};
