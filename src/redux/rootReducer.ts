/**
 * @file Root reducer.
 * @copyright Yury Korotovskikh <u.korotovskiy@nil.foundation>
 */

import { combineReducers } from 'redux';
import { RouterReducer } from './common';
import { AuthReducer, UserReducer } from './login';
import {
    StatementsReducer,
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
    statementsState: StatementsReducer,
    userState: UserReducer,
    routerState: RouterReducer,
    orderBookState: OrderBookReducer,
    chartsState: ChartsReducer,
    userOrdersState: UserOrdersReducer,
    lastProofProducerState: LastProofProducerReducer,
    userStatementInfoState: UserStatementsInfoReducer,
    portfolioProposalsInfo: PortfolioPorposalsInfoReducer,
    portfolioRequestsInfo: PortfolioRequestsInfoReducer,
    authState: AuthReducer,
});
