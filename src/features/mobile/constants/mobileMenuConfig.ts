/**
 * @file Constant data.
 * @copyright Yury Korotovskikh <u.korotovskiy@nil.foundation>
 */

type MobileMenuElement = {
    icon: string;
    key: string;
};

export const mobileMenuConfig: MobileMenuElement[] = [
    {
        icon: 'fa-solid fa-list',
        key: 'Statements',
    },
    {
        icon: 'fa-solid fa-chart-simple',
        key: 'Charts',
    },
    {
        icon: 'fa-solid fa-list-check',
        key: 'Trades',
    },
    {
        icon: 'fa-solid fa-money-check-dollar',
        key: 'Last proof producer',
    },
];
