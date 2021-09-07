// For a detailed explanation regarding each configuration property, visit:
// https://jestjs.io/docs/en/configuration.html

const { join, resolve } = require('path');

module.exports = {
    preset: '@shopware-ag/jest-preset-sw6-admin',
    globals: {
        adminPath: process.env.ADMIN_PATH, // required, e.g. /www/sw6/platform/src/Administration/Resources/app/administration
    },

    setupFilesAfterEnv: [
        resolve(join(process.env.ADMIN_PATH, '/test/_setup/prepare_environment.js')),
    ],

    moduleNameMapper: {
        '^test(.*)$': '<rootDir>/test$1',
        vue$: 'vue/dist/vue.common.dev.js',
    },
};
