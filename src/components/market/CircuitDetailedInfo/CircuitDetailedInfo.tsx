/**
 * @file React component.
 * @copyright Yury Korotovskikh 2022 <u.korotovskiy@nil.foundation>
 */

import { ReactElement, memo } from 'react';
import { useSelector } from 'react-redux';
import { Icon, Label, Spinner } from '@nilfoundation/react-components';
import { selectCurrentCircuit, useAppSelector } from 'src/redux';
import { Circuit } from 'src/models';
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
                    <div className={styles.description}>
                        <span className="text-muted">Description:</span>
                        {data!.description}
                    </div>
                    <Label
                        href={data!.repository}
                        target="_blank"
                    >
                        <Icon
                            iconName="fa-brands fa-github"
                            srOnlyText="github repository link"
                        />
                        GitHub Repository
                    </Label>
                </>
            );
        case data === undefined:
        default:
            return <h4>No circuit info was provided.</h4>;
    }
};
