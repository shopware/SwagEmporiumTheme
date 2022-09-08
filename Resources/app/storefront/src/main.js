import EmtListingPlugin from './plugin/listing/emt-listing.plugin';
import EmtFilterRatingSelectPlugin from './plugin/listing/emt-filter-rating-select.plugin';
import EmporiumOffCanvasTabsPlugin from './plugin/offcanvas-tabs/offcanvas-tabs.plugin';
import EmporiumProductSliderPlugin from "./plugin/slider/product-slider.plugin";
import EmporiumScrollUpPlugin from "./plugin/product-detail/scroll-buybox-up.plugin";
import EmporiumAutoScrollPlugin from "./plugin/product-detail/auto-scroll.plugin"
import EmporiumGallerySliderPlugin from './plugin/slider/gallery-slider.plugin';

const PluginManager = window.PluginManager;
PluginManager.register('OffCanvasTabsDefault', EmporiumOffCanvasTabsPlugin, '[data-offcanvas-tabs-default]');
PluginManager.register('BuyboxScrollUp', EmporiumScrollUpPlugin, '[data-buybox-scroll-up]');
PluginManager.register('BuyboxAutoScroll', EmporiumAutoScrollPlugin, '[data-auto-scroll]');
PluginManager.override('Listing', EmtListingPlugin, '[data-listing]');
PluginManager.override('FilterRatingSelect', EmtFilterRatingSelectPlugin, '[data-filter-rating-select]');
PluginManager.override('ProductSlider', EmporiumProductSliderPlugin, '[data-product-slider]');
PluginManager.override('GallerySlider', EmporiumGallerySliderPlugin, '[data-gallery-slider]');
