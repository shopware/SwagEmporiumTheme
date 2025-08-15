// SwagEmporiumTheme Copyright (C) 2025 shopware AG

import DomAccess from 'src/helper/dom-access.helper';
import Plugin from 'src/plugin-system/plugin.class';

export default class EmporiumScrollUpPlugin extends Plugin {

    static options = {
        scrollUpSelector: '.btn-scroll-up'
    };

    init() {
        this._registerScrollUp();
    }

    _registerScrollUp() {
        this._scrollUpElement = DomAccess.querySelector(this.el, this.options.scrollUpSelector);
        this._scrollUpElement.removeEventListener('click', this._scrollToTop.bind(this));
        this._scrollUpElement.addEventListener('click', this._scrollToTop.bind(this));

        this._parentScroller = this.el.parentElement;
        this._parentScroller.removeEventListener('scroll', this._debouncedOnScroll.bind(this));
        this._parentScroller.addEventListener('scroll', this._debouncedOnScroll.bind(this));
    }

    _debouncedOnScroll() {
        // When the user scrolls down 400px from the top of the buybox area, then show the button
        if (this._parentScroller.scrollTop > 400) {
            this._scrollUpElement.style.display = 'inline-block';
        } else {
            this._scrollUpElement.style.display = 'none';
        }
    }

    _scrollToTop() {
        this._parentScroller.scrollTop = 0;
    }
}
