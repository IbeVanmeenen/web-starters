/* ==========================================================================
   Webstarter - Table Of Content

   // Dependencies:
   - helpers/_offset.js

   // Combine with:
   - scroll-to.js (for scrolling on click)
   ========================================================================== */

webstarter.toc = (body) => {

    let exports = webstarter.toc;

    let menu;

    let menuStartOffset;
    let menuItems = [];
    let lastTarget;


    // Setup Menu
    const setupMenu = () => {
        menuStartOffset = webstarter.offset.top(menu);
    };


    // Setup Menu Items
    const setupMenuItems = () => {

        // Get za menu items
        [].forEach.call(document.getElementsByClassName('js-toc-item'), (item) => {
            const itemDetails = {
                'item': item,
                'offset': webstarter.offset.top(document.getElementById(item.getAttribute('href').slice(+1))),
                'target': item.getAttribute('href')
            };

            menuItems.push(itemDetails);
        });
    };


    // Update Menu Items
    const updateMenuItems = (currentOffset) => {
        // Get all passed anchors
        let currentInViewTarget = [];

        for (let i = 0; i < menuItems.length; i++) {
            if (menuItems[i].offset < currentOffset + 50) {
                currentInViewTarget.push(menuItems[i]);
            }
        }

        // Get the last of the passed anchors
        currentInViewTarget = currentInViewTarget[currentInViewTarget.length - 1];

        // Check if exists
        if (!currentInViewTarget) {
            currentInViewTarget = menuItems[0];
        }

        // Update navigations items if there is a new anchor passed
        if (lastTarget !== currentInViewTarget.target) {
            lastTarget = currentInViewTarget.target;

            for (let i = 0; i < menuItems.length; i++) {
                menuItems[i].item.classList.remove('toc__item--active');
            }

            currentInViewTarget.item.classList.add('toc__item--active');
        }
    };


    // Update menu
    const updateMenu = (currentOffset) => {
        if (menuStartOffset < currentOffset) {
            menu.classList.add('toc--fixed');
        } else {
            menu.classList.remove('toc--fixed');
        }
    };


    // Update on scroll
    exports.updateScroll = (currentScrollY) => {
        updateMenu(currentScrollY);
        updateMenuItems(currentScrollY);
    };


    // Init
    const init = (() => {
        menu = document.getElementById('toc');

        if (menu) {
            setupMenu();
            setupMenuItems();

            exports.updateScroll(window.pageYOffset);
        }
    })();
};
