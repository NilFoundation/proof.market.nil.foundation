/**
 * @file Root reducer.
 * @copyright Yury Korotovskikh 2022 <u.korotovskiy@nil.foundation>
 */

import { combineReducers } from 'redux';
import { RouterReducer } from './common';
import { UserReducer } from './login';
import {
    CircuitsReducer,
    OrderBookReducer,
    ChartsReducer,
    UserOrdersReducer,
    LastProofProducerReducer,
} from './market';
import {
    PortfolioRequestsInfoReducer,
    PortfolioPorposalsInfoReducer,
    UserStatementsInfoReducer,
} from './portfolio';
import type { RootStateType } from './RootStateType';

/**
 * Root reducer.
 */
export const RootReducer = combineReducers<RootStateType>({
    circuitsState: CircuitsReducer,
    userState: UserReducer,
    routerState: RouterReducer,
    orderBookState: OrderBookReducer,
    chartsState: ChartsReducer,
    userOrdersState: UserOrdersReducer,
    lastProofProducerState: LastProofProducerReducer,
    userStatementInfoState: UserStatementsInfoReducer,
    portfolioProposalsInfo: PortfolioPorposalsInfoReducer,
    portfolioRequestsInfo: PortfolioRequestsInfoReducer,
});
