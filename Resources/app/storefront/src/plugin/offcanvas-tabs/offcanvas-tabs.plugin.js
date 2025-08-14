// SwagEmporiumTheme Copyright (C) 2025 shopware AG

import OffCanvasTabs from 'src/plugin/offcanvas-tabs/offcanvas-tabs.plugin';
import ViewportDetection from 'src/helper/viewport-detection.helper';

export default class EmporiumOffCanvasTabs extends OffCanvasTabs {
    /**
     * Returns if the browser is in the allowed viewports
     * @returns {boolean}
     * @private
     */
    _isInAllowedViewports() {
        return (ViewportDetection.isXS() || ViewportDetection.isSM() || ViewportDetection.isMD());
    }
}
