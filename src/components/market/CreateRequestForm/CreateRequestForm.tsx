/**
 * @file React component.
 * @copyright Yury Korotovskikh <u.korotovskiy@nil.foundation>
 */

import type { ReactElement } from 'react';
import { useContext, useState } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { notificationActions, Variant } from '@nilfoundation/react-components';
import { AddUserRequest, useAppSelector } from '@/redux';
import { createRequest } from '@/api/market/RequestsApi';
import type { CreateRequest } from '@/models';
import { OrderManagementContext } from '../OrderManagementContextProvider';
import { CreateTradeOrderForm } from '../CreateTradeOrderForm';
import { PublicInput } from './PublicInput';

/**
 * Create request form.
 *
 * @returns React component.
 */
export const CreateRequestForm = (): ReactElement => {
    const { setProcessing } = useContext(OrderManagementContext);
    const selectedStatementKey = useAppSelector(s => s.statementsState.selectedKey);
    const dispatch = useDispatch();
    const [errorMessage, setErrorMessage] = useState('');
    const form = useForm<CreateRequest>({
        mode: 'onChange',
        defaultValues: {
            statement_key: selectedStatementKey,
        },
    });

    const onSubmitRequest = form.handleSubmit(async (data: CreateRequest): Promise<void> => {
        setErrorMessage('');
        setProcessing(true);
        try {
            const createdRequest = await createRequest(data);
            dispatch(AddUserRequest(createdRequest));

            const { cost, eval_time } = data;

            notificationActions?.create({
                title: 'Order successfully created',
                message: `Cost: ${cost}${eval_time ? `, eval_time: ${eval_time}` : ''}`,
                variant: Variant.success,
            });
            form.reset();
        } catch (e) {
            setErrorMessage('Create order error');
        } finally {
            setProcessing(false);
        }
    });

    return (
        <FormProvider {...form}>
            <CreateTradeOrderForm
                onSubmit={onSubmitRequest}
                errorMessage={errorMessage}
            >
                <PublicInput />
            </CreateTradeOrderForm>
        </FormProvider>
    );
};
