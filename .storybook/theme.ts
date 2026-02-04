import { create } from '@storybook/theming/create';

export default create({
    base: 'light',
    brandTitle: 'Inventis',
    brandUrl: 'https://www.inventis.co.kr',
    brandImage: 'https://intra.inventis.co.kr/theme/inventis/img/logo-color.png',
    brandTarget: '_self',

    // Typography
    fontBase: '"Pretendard", -apple-system, BlinkMacSystemFont, system-ui, Roboto, "Helvetica Neue", "Segoe UI", "Apple SD Gothic Neo", "Noto Sans KR", "Malgun Gothic", sans-serif',
    fontCode: 'ui-monospace, SFMono-Regular, "SF Mono", Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
});
