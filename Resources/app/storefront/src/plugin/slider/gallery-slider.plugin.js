import DomAccess from "src/helper/dom-access.helper";
import GallerySliderPlugin from "src/plugin/slider/gallery-slider.plugin";

export default class EmporiumGallerySliderPlugin extends GallerySliderPlugin {
    /**
     * sets the active dot depending on the slider index
     *
     * @private
     */
    _setActiveDot() {
        super._setActiveDot();
        const currentIndex = this.getCurrentSliderIndex();

        let currentDot = this._dots[currentIndex];

        if (currentDot) {
            DomAccess.querySelector(
                this.el,
                ".js-dots-text-current"
            ).innerHTML =
                currentIndex + 1 < 10
                    ? `0${currentIndex + 1}`
                    : currentIndex + 1;
        }
    }
}
