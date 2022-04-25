import LanguageCurrency from './plugin/language-currency/language-currency.plugin';
import ShowroomCollapseColumn from './plugin/collapse-columns/collapse-columns.plugin';
import ShowroomOffcanvasMenuPlugin from './plugin/main-menu/offcanvas-menu.plugin';
import CustomizedProductsStepByStepWizard from './plugin/customized-product/customized-product.plugin';
import CmsExtensionsQuickviewOptions from './plugin/quick-view/quick-view.plugin';
import WishlistPlugin from './plugin/wishlist/wishlist.plugin';
import ShowroomDatePickerPlugin from './plugin/date-picker/date-picker.plugin';
import EmtListingPlugin from './plugin/listing/emt-listing.plugin';
import EmtFilterRatingSelectPlugin from './plugin/listing/emt-filter-rating-select.plugin';

const PluginManager = window.PluginManager;
PluginManager.register('LanguageCurrency', LanguageCurrency, '[data-language-currency]');
PluginManager.register('ShowroomCollapseColumn', ShowroomCollapseColumn, '[data-showroom-collapse]');
PluginManager.override('OffcanvasMenu', ShowroomOffcanvasMenuPlugin, '[data-offcanvas-menu]');
PluginManager.register('ShowroomCustomizedProductsStepByStepWizard', CustomizedProductsStepByStepWizard, '*[data-swag-customized-product-step-by-step="true"]');
PluginManager.register('ShowroomCmsExtensionsQuickview', CmsExtensionsQuickviewOptions, '[data-swag-cms-extensions-quickview="true"]');
PluginManager.override('DatePicker', ShowroomDatePickerPlugin, '[data-date-picker]');
PluginManager.override('Listing', EmtListingPlugin, '[data-listing]');
PluginManager.override('FilterRatingSelect', EmtFilterRatingSelectPlugin, '[data-filter-rating-select]');

if (window.wishlistEnabled) {
    PluginManager.override('WishlistWidget', WishlistPlugin, '[data-wishlist-widget]');
} else {
    PluginManager.register('WishlistWidget', WishlistPlugin, '[data-wishlist-widget]');
}
