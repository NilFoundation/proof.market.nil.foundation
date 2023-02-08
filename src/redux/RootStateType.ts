/**
 * @file Type declaration.
 * @copyright Yury Korotovskikh 2022 <u.korotovskiy@nil.foundation>
 */

import type { RouterReducerState } from './common';
import type { UserReducerState } from './login';
import type {
    CircuitsReducerState,
    OrderBookReducerState,
    ChartsReducerState,
    UserOrdersReducerState,
    LastProofProducerReducerState,
} from './market';
import type {
    PortfolioRequestsInfoReducerState,
    PortfolioPorposalsInfoReducerState,
    UserStatementsInfoReducerState,
} from './portfolio';

/**
 * Root state type.
 */
export interface RootStateType {
    circuitsState: CircuitsReducerState;
    userState: UserReducerState;
    routerState: RouterReducerState;
    orderBookState: OrderBookReducerState;
    chartsState: ChartsReducerState;
    userOrdersState: UserOrdersReducerState;
    lastProofProducerState: LastProofProducerReducerState;
    userStatementInfoState: UserStatementsInfoReducerState;
    portfolioProposalsInfo: PortfolioPorposalsInfoReducerState;
    portfolioRequestsInfo: PortfolioRequestsInfoReducerState;
}
