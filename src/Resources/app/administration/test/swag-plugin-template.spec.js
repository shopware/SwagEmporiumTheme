import '../src/module/swag-plugin-template';
const { Module } = Shopware;

describe('module/swag-plugin-template', () => {
    it('should be registered as a module', () => {
        expect(Module.getModuleRegistry().get('swag-plugin-template')).toBeDefined();
    });
})
