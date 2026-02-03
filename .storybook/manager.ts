import { addons } from '@storybook/manager-api';
import { create } from '@storybook/theming';

const theme = create({
    base: 'light',
    brandTitle: 'IVTS Component Library',
    brandUrl: 'https://github.com/moonicaa1/IVTSds',
    brandImage: 'https://placehold.co/150x40/003b41/white?text=IVTS+DS',
    brandTarget: '_self',

    // UI
    appBg: '#f8fafc',
    appContentBg: '#ffffff',
    appPreviewBg: '#ffffff',
    appBorderColor: '#e2e8f0',
    appBorderRadius: 8,

    // Colors
    colorPrimary: '#003b41',
    colorSecondary: '#005f6b',
});

addons.setConfig({
    theme,
});
