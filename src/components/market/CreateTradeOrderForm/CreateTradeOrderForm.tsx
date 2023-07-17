/**
 * @file React component.
 * @copyright Yury Korotovskikh <u.korotovskiy@nil.foundation>
 */

import type { ReactElement, ReactNode } from 'react';
import { useContext, useEffect, useRef } from 'react';
import { useFormContext } from 'react-hook-form';
import { CSSTransition } from 'react-transition-group';
import {
    Button,
    Input,
    Size,
    Spinner,
    Variant,
    Form,
    InputGroup,
} from '@nilfoundation/react-components';
import { useAuth } from '@/hooks';
import { siteMoneyTickerAbbreviation } from '@/constants';
import type { CreateTradeOrder } from '@/models';
import { Details } from '../../common';
import { OrderManagementContext } from '../OrderManagementContextProvider';
import { BaseFormGroup } from './BaseFormGroup';
import styles from './CreateTradeOrderForm.module.scss';

/**
 * Props.
 */
type CreateTradeOrderFormProps = {
    onSubmit: () => Promise<void>;
    errorMessage: string;
    children?: ReactNode;
};

/**
 * Validates input value.
 *
 * @param v Value.
 * @returns Validation result.
 */
const validateFn = (v?: number) => v !== undefined && (v >= 0 || isNaN(v));

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
    const { user, isReadonly } = useAuth();

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
        <Form>
            <div className="formContent">
                <BaseFormGroup
                    hasError={!!errors['cost']}
                    labelText="Cost"
                    hintText="Proof cost"
                >
                    {props => (
                        <InputGroup className={styles.control}>
                            <Input
                                type="number"
                                {...props}
                                {...register('cost', {
                                    required: true,
                                    min: 0,
                                    valueAsNumber: true,
                                })}
                                data-sb="createOrderCostInput"
                            />
                            <InputGroup.Addon>{siteMoneyTickerAbbreviation}</InputGroup.Addon>
                        </InputGroup>
                    )}
                </BaseFormGroup>
                <Details
                    title={
                        <div className={`${styles.detailsTitle} text-muted`}>
                            Additional parameters
                        </div>
                    }
                    bottomIndent={false}
                    defaultOpen={false}
                >
                    <BaseFormGroup
                        hasError={!!errors['eval_time']}
                        labelText="Generation time"
                        hintText="Proof generation time"
                    >
                        {props => (
                            <InputGroup className={styles.control}>
                                <Input
                                    type="number"
                                    {...props}
                                    {...register('eval_time', {
                                        required: false,
                                        validate: validateFn,
                                        valueAsNumber: true,
                                    })}
                                    data-sb="createOrderEvalTimeInput"
                                />
                                <InputGroup.Addon>Mins</InputGroup.Addon>
                            </InputGroup>
                        )}
                    </BaseFormGroup>
                    <BaseFormGroup
                        hasError={!!errors['wait_period']}
                        labelText="Order timeout"
                        hintText="Order cancellation time"
                    >
                        {props => (
                            <InputGroup className={styles.control}>
                                <Input
                                    type="number"
                                    {...props}
                                    {...register('wait_period', {
                                        required: false,
                                        validate: validateFn,
                                        valueAsNumber: true,
                                    })}
                                    data-sb="createOrderWaitPeriodInput"
                                />
                                <InputGroup.Addon>Mins</InputGroup.Addon>
                            </InputGroup>
                        )}
                    </BaseFormGroup>
                </Details>
                {children}
            </div>
            <div className={styles.errorMsg}>
                <CSSTransition
                    classNames="fade"
                    timeout={300}
                    in={!!errorMessage}
                    nodeRef={nodeRef}
                >
                    <span
                        ref={nodeRef}
                        className="errorMessage"
                    >
                        {errorMessage}
                    </span>
                </CSSTransition>
            </div>
            <Button
                variant={Variant.success}
                onClick={onSubmit}
                size={Size.lg}
                disabled={!isValid || isSubmitting || !user || isReadonly}
                data-sb="createTradeOrder"
            >
                Submit
                {isSubmitting && <Spinner />}
            </Button>
        </Form>
    );
};
