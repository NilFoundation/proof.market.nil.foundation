/**
 * @file Constant data.
 * @copyright Yury Korotovskikh <u.korotovskiy@nil.foundation>
 */

import { Path } from '@/features/routing';
import { MobilePath } from '../models/MobilePath';

type MobileMenuElement = {
    icon: string;
    title: string;
    path: string;
};

export const mobileMenuConfig: MobileMenuElement[] = [
    {
        icon: 'fa-solid fa-list',
        title: 'Statements list',
        path: `${Path.market}/${MobilePath.statementsList}`,
    },
    {
        icon: 'fa-solid fa-chart-simple',
        title: 'Charts',
        path: `${Path.market}/${MobilePath.charts}`,
    },
    {
        icon: 'fa-solid fa-list-check',
        title: 'Trades',
        path: `${Path.market}/${MobilePath.trades}`,
    },
    {
        icon: 'fa-solid fa-money-check-dollar',
        title: 'Last proof producer',
        path: `${Path.market}/${MobilePath.lastProofProducer}`,
    },
];
