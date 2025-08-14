// SwagEmporiumTheme Copyright (C) 2025 shopware AG

import ViewportDetection from 'src/helper/viewport-detection.helper';
import Plugin from 'src/plugin-system/plugin.class';
import Feature from 'src/helper/feature.helper';

export default class EmporiumAutoScrollPlugin extends Plugin {
    static options = {
        toggleAttribute: '[data-bs-toggle]',
        tabContainer: '.nav-item',
        tabsContainer: '.product-detail-tabs',
        startButtonCustomizedProduct: '.swag-customized-products-start-wizard',
        navCustomizedProduct: '.swag-customized-products-navigation',
        formContainer: '.product-detail-form-container',
        toggleLinkCustomizedProduct: 'swag-customized-products__title-link',
        customizedProductItem: '.swag-customized-products__item'
    };

    init() {
        this._registerAutoScroll();
    }

    _registerAutoScroll() {
        this.el.removeEventListener('click', this._autoScroll.bind(this));
        this.el.addEventListener('click', this._autoScroll.bind(this));
    }

    _autoScroll() {
        // If Customize Product is on step by step mode
        const interactiveElementCustomizedProduct = event.target.closest(this.options.startButtonCustomizedProduct) || event.target.closest(this.options.navCustomizedProduct);

        if(interactiveElementCustomizedProduct) {
            const formContainer = interactiveElementCustomizedProduct.closest(this.options.formContainer);
            this.el.scrollTop = formContainer.offsetTop;

            return;
        }

        const toggleEl = event.target.closest(this.options.toggleAttribute);

        if(!toggleEl) return;

        // If Customize Product is on default mode
        if(toggleEl.classList.contains(this.options.toggleLinkCustomizedProduct)) {
            if(toggleEl.getAttribute('aria-expanded') !== 'true') {
                setTimeout(() => {
                    const tabContainer = toggleEl.parentElement;
                    this.el.scrollTop = toggleEl.offsetTop - this._convertToNum(getComputedStyle(tabContainer).paddingTop);
                }, 300);
            } else {
                return;
            }

            const siblingToggleEls = this._getSiblings(toggleEl.closest(this.options.customizedProductItem));

            this._collapseTabs(siblingToggleEls);

            return;
        }

        // If the current viewport is not allowed return
        if (this._isInAllowedViewports() === false) return;

        const tabContainer = toggleEl.closest(this.options.tabContainer);
        const tabsContainer = toggleEl.closest(this.options.tabsContainer);
        const siblingTabContainer = tabContainer.nextElementSibling || tabsContainer.querySelector(this.options.tabContainer);
        const siblingToggleEl = siblingTabContainer.querySelector(this.options.toggleAttribute);

        // Only trigger auto scroll when expanding the tab
        if(toggleEl.getAttribute('aria-expanded') !== 'true' || !toggleEl.classList.contains('collapse')) {
            this._collapseTabs(siblingTabContainer.querySelectorAll(this.options.toggleAttribute));

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

    _getSiblings(toggleEl) {
        // for collecting siblings
        let siblings = [];

        // if no parent, return no sibling
        if(!toggleEl.parentNode) {
            return siblings;
        }
        // first child of the parent node
        let sibling  = toggleEl.parentNode.firstChild;

        // collecting siblings
        while (sibling) {
            if (sibling.nodeType === 1 && sibling !== toggleEl) {
                let toggleSiblingEl = sibling.querySelector(this.options.toggleAttribute);

                if(toggleSiblingEl) {
                    siblings.push(toggleSiblingEl);
                }
            }

            sibling = sibling.nextSibling;
        }

        return siblings;
    }

    _collapseTabs(toggleEls) {
        // Trigger to collapse the sibling expanded tab
        toggleEls.forEach(el => {
            if(el.getAttribute('aria-expanded') === 'true') {
                el.dispatchEvent(new Event("click", { bubbles: true }));
            }
        })
    }

    _convertToNum(value) {
        return parseInt(value, 10);
    }

    _isInAllowedViewports() {
        return ViewportDetection.isLG() || ViewportDetection.isXL() || ViewportDetection.isXXL();
    }
}
