/**
 * @file React component.
 * @copyright Yury Korotovskikh 2022 <u.korotovskiy@nil.foundation>
 */

import { ReactElement } from 'react';
import { Image, ListGroup, Media } from '@nilfoundation/react-components';
import { useDispatch, useSelector } from 'react-redux';
import { getCurrencyImage } from 'src/enums';
import { UpdateSelectedCircuitId, selectCurrentCircuit } from 'src/redux';
import { Circuit } from 'src/models';

/**
 * Props.
 */
type CurcuitsListItemProps = {
    circuit: Circuit;
};

/**
 * Currencies list item.
 *
 * @param {CurcuitsListItemProps} props - Props.
 * @returns React component.
 */
export const CurcuitsListItem = ({
    circuit: { id, name, info },
}: CurcuitsListItemProps): ReactElement => {
    const dispatch = useDispatch();
    const selectedItem = useSelector(selectCurrentCircuit, (prev, next) => prev?.id === next?.id);
    const onSelectItem = () => {
        dispatch(UpdateSelectedCircuitId(id));
    };

    return (
        <ListGroup.Item
            active={id === selectedItem?.id}
            onClick={onSelectItem}
        >
            <Media>
                <Media.Item>
                    <Image
                        source={getCurrencyImage(name)}
                        height={48}
                        width={48}
                        alt="Circuit image"
                    />
                </Media.Item>
                <Media.Body>
                    <Media.Heading>{`${name.toUpperCase()} (${info.toUpperCase()})/USD`}</Media.Heading>
                </Media.Body>
            </Media>
        </ListGroup.Item>
    );
};