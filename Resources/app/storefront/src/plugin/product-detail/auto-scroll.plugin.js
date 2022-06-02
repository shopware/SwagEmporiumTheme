import ViewportDetection from 'src/helper/viewport-detection.helper';
import Plugin from 'src/plugin-system/plugin.class';

export default class EmporiumAutoScrollPlugin extends Plugin {
    static options = {
        toggleAttribute: '[data-bs-toggle]',
        tabContainer: '.nav-item',
        tabsContainer: '.product-detail-tabs',
    };

    init() {
        this._registerAutoScroll();
    }

    _registerAutoScroll() {
        this.el.removeEventListener('click', this._autoScroll.bind(this));
        this.el.addEventListener('click', this._autoScroll.bind(this));
    }

    _autoScroll() {
        // if the current viewport is not allowed return
        if (this._isInAllowedViewports() === false) return;

        const toggleEl = event.target.closest(this.options.toggleAttribute);

        if(!toggleEl) return;

        const tabContainer = toggleEl.closest(this.options.tabContainer);
        const tabsContainer = toggleEl.closest(this.options.tabsContainer);
        const siblingTabContainer = tabContainer.nextElementSibling || tabsContainer.querySelector(this.options.tabContainer);
        const siblingToggleEl = siblingTabContainer.querySelector(this.options.toggleAttribute);

        // Only trigger auto scroll when expanding the tab
        if(!toggleEl.classList.contains('collapse')) {
            this._collapseSiblingTab(siblingToggleEl);

            // Calculate to scroll the tab on the top
            setTimeout(() => {
                if(tabContainer.nextElementSibling) {
                    this.el.scrollTop = tabsContainer.offsetTop;
                } else {
                    const styleSiblingTab = getComputedStyle(siblingTabContainer);
                    const styleSiblingToggleEl = getComputedStyle(siblingToggleEl);
                    const siblingTabHeight = this._convertToNum(styleSiblingTab.paddingTop) + this._convertToNum(styleSiblingTab.paddingBottom) + this._convertToNum(styleSiblingToggleEl.height);

                    this.el.scrollTop = tabsContainer.offsetTop + siblingTabHeight;
                }
            }, 200);
        }
    }

    _collapseSiblingTab(toggleEl) {
        // Trigger to collapse the sibling expanded tab
        if(toggleEl.getAttribute('aria-expanded') === 'true') {
            toggleEl.dispatchEvent(new Event("click"));
        }
    }

    _convertToNum(value) {
        return parseInt(value, 10);
    }

    _isInAllowedViewports() {
        return (ViewportDetection.isLG() || ViewportDetection.isXL() || ViewportDetection.isXXL());
    }
}
