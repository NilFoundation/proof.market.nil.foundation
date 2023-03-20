/**
 * @file React hook.
 * @copyright Yury Korotovskikh 2022 <u.korotovskiy@nil.foundation>
 */

import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import {
    selectCircuits,
    selectCurrentCircuit,
    UpdateSelectedCircuitKey,
    useAppSelector,
} from '@/redux';
import { RouterParam } from '@/enums';

/**
 * Hook to manage selected circuit state and url statementName parameter sync.
 */
export const useSelectedCircuitNameUrlSync = (): void => {
    const selectedCircuit = useAppSelector(
        selectCurrentCircuit,
        (prev, next) => prev?._key === next?._key,
    );
    const circuitList = useAppSelector(selectCircuits);
    const circuitName = useParams()[RouterParam.statementName];
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        if (selectedCircuit?.name === circuitName) {
            return;
        }

        if (circuitName !== undefined) {
            const circuitToSelect = circuitList.find(x => x.name === circuitName);
            circuitToSelect && dispatch(UpdateSelectedCircuitKey(circuitToSelect._key));
            return;
        }

        selectedCircuit?._key !== undefined && navigate(`${selectedCircuit.name}`);
    }, [circuitName, dispatch, selectedCircuit, navigate, circuitList]);
};
