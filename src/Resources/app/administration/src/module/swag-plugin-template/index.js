import deDE from './snippet/de-DE.json';
import enGB from './snippet/en-GB.json';

Shopware.Module.register('swag-plugin-template', {
    type: 'plugin',
    name: 'SwagPluginTemplate',
    title: 'swag-plugin-template.general.mainMenuItemGeneral',
    description: 'sw-property.general.descriptionTextModule',
    color: '#ff3d58',
    icon: 'default-shopping-paper-bag-product',
    snippets: {
        'de-DE': deDE,
        'en-GB': enGB
    },
    routes: {
        list: {
            component: 'swag-plugin-template-list',
            path: 'list'
        },
    },

    settingsItem: {
        group: 'system',
        to: 'swag-plugin-template-list.list',
        icon: 'default-object-rocket'
    }
});
