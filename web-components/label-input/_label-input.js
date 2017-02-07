/* ==========================================================================
   Webstarter - Label Input
   ========================================================================== */

webstarter.labelInput = () => {

    // Toggle State
    const toggleState = (el, inputEl) => {
        if (inputEl.value !== '') {
            el.classList.add('form-row--has-text');
        } else {
            el.classList.remove('form-row--has-text');
        }
    };


    // Find input
    const getInputEl = (container) => {
       let inputEl = container.getElementsByTagName('input')[0];

        if (!inputEl) {
            inputEl = container.getElementsByTagName('textarea')[0];
        }

        return inputEl;
    };


    // Init
    const init = (() => {

        [].forEach.call(document.getElementsByClassName('js-label-input'), (el) => {
            // Get input
            const inputEl = getInputEl(el);

            if (inputEl) {
               toggleState(el, inputEl);

                inputEl.addEventListener('input', () => {
                    toggleState(el, inputEl);
                }, false);
            }
        });
    })();
};
