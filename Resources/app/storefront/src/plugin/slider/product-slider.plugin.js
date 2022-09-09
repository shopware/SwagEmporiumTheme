import DomAccess from 'src/helper/dom-access.helper';
import ProductSliderPlugin from 'src/plugin/slider/product-slider.plugin';
import SliderSettingsHelper from 'src/plugin/slider/helper/slider-settings.helper';

export default class EmporiumProductSliderPlugin extends ProductSliderPlugin {

    /**
     * Extend initialize the ProductSliderPlugin plugin to add event when indexChanged
     *
     * @returns {void}
     */
    _initSlider() {
        super._initSlider();
        this._slider.events.on('indexChanged', () => {
            DomAccess.querySelector(this.el, ".js-dots-text-current").innerHTML = (this.getCurrentSliderIndex()+1 < 10) ? ` 0${this.getCurrentSliderIndex()+1}` : this.getCurrentSliderIndex()+1;
        });
    }

    /**
     * extends the slider settings with the slider item limit depending on the product-box and the container width
     *
     * @private
     */
    _addItemLimit() {
        super._addItemLimit()

        const mobileItems = this.options.slider.responsive[0].items ? this.options.slider.responsive[0].items :  this._sliderSettings.items;

        this._sliderSettings  = {
            ...this.options.slider,
            items: mobileItems,
            responsive: {
                sm: {
                    items: this._sliderSettings.items,
                },
                md: {},
                lg: {},
                xl: {},
            },
        }

        this._sliderSettings = SliderSettingsHelper.prepareBreakpointPxValues(this._sliderSettings);
    }
}
