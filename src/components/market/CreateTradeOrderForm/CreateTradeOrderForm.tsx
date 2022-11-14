/**
 * @file React component.
 * @copyright Yury Korotovskikh 2022 <u.korotovskiy@nil.foundation>
 */

import { ReactElement, ReactNode, useContext, useEffect, useRef } from 'react';
import { useFormContext } from 'react-hook-form';
import { CSSTransition } from 'react-transition-group';
import { Button, Form, Input, Size, Spinner, Variant } from '@nilfoundation/react-components';
import { CreateTradeOrder } from 'src/models';
import { OrderManagementContext } from '../OrderManagementContextProvider';

/**
 * Props.
 */
type CreateTradeOrderFormProps = {
    onSubmit: () => Promise<void>;
    errorMessage: string;
    children?: ReactNode;
};

/**
 * Create trade order form.
 *
 * @param {CreateTradeOrderFormProps} props Props.
 * @returns React component.
 */
export const CreateTradeOrderForm = ({
    onSubmit,
    errorMessage,
    children,
}: CreateTradeOrderFormProps): ReactElement => {
    const nodeRef = useRef(null);
    const { selectedValues, setSelectedValues } = useContext(OrderManagementContext);
    const {
        register,
        setValue,
        formState: { isSubmitting, isValid, errors },
    } = useFormContext<CreateTradeOrder>();

    useEffect(() => {
        if (!selectedValues) {
            return;
        }

        const setValueOpts = { shouldDirty: true, shouldValidate: true };
        setValue('cost', selectedValues.cost, setValueOpts);
        setValue('eval_time', selectedValues.eval_time, setValueOpts);
        setSelectedValues(undefined);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedValues]);

    return (
        <>
            <Form.Group hasError={!!errors['cost']}>
                <Form.Label htmlFor="cost">Cost, $</Form.Label>
                <Input
                    type="number"
                    id="cost"
                    {...register('cost', { required: true, min: 0, valueAsNumber: true })}
                />
            </Form.Group>
            <Form.Group hasError={!!errors['eval_time']}>
                <Form.Label htmlFor="eval_time">Generation time, ms</Form.Label>
                <Input
                    type="number"
                    id="eval_time"
                    {...register('eval_time', { required: true, min: 0, valueAsNumber: true })}
                />
            </Form.Group>
            <Form.Group hasError={!!errors['wait_period']}>
                <Form.Label htmlFor="wait_period">Wait period, ms</Form.Label>
                <Input
                    type="number"
                    id="wait_period"
                    {...register('wait_period', { required: true, min: 0, valueAsNumber: true })}
                />
            </Form.Group>
            {children}
            <Button
                variant={Variant.success}
                onClick={onSubmit}
                size={Size.lg}
                disabled={!isValid || isSubmitting}
            >
                Submit
                {isSubmitting && <Spinner />}
            </Button>
            <CSSTransition
                classNames="fade"
                timeout={300}
                in={!!errorMessage}
                nodeRef={nodeRef}
            >
                <div
                    ref={nodeRef}
                    className="errorMessage"
                >
                    {errorMessage}
                </div>
            </CSSTransition>
        </>
    );
};
