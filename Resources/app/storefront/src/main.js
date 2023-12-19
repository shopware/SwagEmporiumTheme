const PluginManager = window.PluginManager;

PluginManager.register('OffCanvasTabsDefault', () => import('./plugin/offcanvas-tabs/offcanvas-tabs.plugin'), '[data-offcanvas-tabs-default]');
PluginManager.register('BuyboxScrollUp', () => import('./plugin/product-detail/scroll-buybox-up.plugin'), '[data-buybox-scroll-up]');
PluginManager.register('BuyboxAutoScroll', () => import('./plugin/product-detail/auto-scroll.plugin'), '[data-auto-scroll]');
PluginManager.override('Listing', () => import('./plugin/listing/emt-listing.plugin'), '[data-listing]');
PluginManager.override('FilterRatingSelect', () => import('./plugin/listing/emt-filter-rating-select.plugin'), '[data-filter-rating-select]');
PluginManager.override('ProductSlider', () => import('./plugin/slider/product-slider.plugin'), '[data-product-slider]');
