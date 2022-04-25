import EmtListingPlugin from './plugin/listing/emt-listing.plugin';
import EmtFilterRatingSelectPlugin from './plugin/listing/emt-filter-rating-select.plugin';

const PluginManager = window.PluginManager;
PluginManager.override('Listing', EmtListingPlugin, '[data-listing]');
PluginManager.override('FilterRatingSelect', EmtFilterRatingSelectPlugin, '[data-filter-rating-select]');
