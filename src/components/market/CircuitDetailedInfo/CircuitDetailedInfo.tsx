/**
 * @file React component.
 * @copyright Yury Korotovskikh 2022 <u.korotovskiy@nil.foundation>
 */

import type { ReactElement } from 'react';
import { memo } from 'react';
import { useSelector } from 'react-redux';
import { Spinner } from '@nilfoundation/react-components';
import { selectCurrentCircuit, useAppSelector } from '@/redux';
import type { Circuit } from '@/models';
import styles from './CircuitDetailedInfo.module.scss';

/**
 * Currencies list.
 *
 * @returns React component.
 */
const CircuitDetailedInfoComponent = (): ReactElement => {
    const currentSelectedCircuit = useSelector(selectCurrentCircuit);
    const loadingCircuits = useAppSelector(s => s.circuitsState.isLoading);

    return (
        <div className={styles.container}>
            <CircuitInfoViewFactory
                loading={loadingCircuits}
                data={currentSelectedCircuit}
            />
        </div>
    );
};

export const CircuitDetailedInfo = memo(CircuitDetailedInfoComponent);

const CircuitInfoViewFactory = ({
    loading,
    data,
}: {
    loading: boolean;
    data?: Circuit;
}): ReactElement => {
    switch (true) {
        case loading && !data:
            return <Spinner grow />;
        case data !== undefined:
            return (
                <>
                    <div className={styles.text}>
                        <span className="text-muted">Description:</span>
                        {data!.description}
                    </div>
                    {data?.url && (
                        <div className={styles.text}>
                            <span className="text-muted">Url:</span>
                            <a
                                href={data.url}
                                rel="noreferrer"
                                target="_blank"
                            >
                                {data.url}
                            </a>
                        </div>
                    )}
                </>
            );
        case data === undefined:
        default:
            return <h4>No circuit info was provided.</h4>;
    }
};
