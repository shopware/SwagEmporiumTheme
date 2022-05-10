import ProductSliderPlugin from 'src/plugin/slider/product-slider.plugin';
import SliderSettingsHelper from 'src/plugin/slider/helper/slider-settings.helper';

export default class EmporiumProductSliderPlugin extends ProductSliderPlugin {
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
