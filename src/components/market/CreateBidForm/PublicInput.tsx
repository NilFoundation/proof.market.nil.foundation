/**
 * @file React component.
 * @copyright Yury Korotovskikh 2022 <u.korotovskiy@nil.foundation>
 */

import type { Dispatch, ReactElement, SetStateAction } from 'react';
import { useCallback, useContext, useState } from 'react';
import type { ControllerRenderProps } from 'react-hook-form';
import { Controller, useFormContext } from 'react-hook-form';
import type { FileRejection } from 'react-dropzone';
import { FileUploader as FileUploaderTemplate } from '@/components';
import type { CreateBid } from '@/models';
import { OrderManagementContext } from '../OrderManagementContextProvider';
import { BaseFormGroup } from '../CreateTradeOrderForm';
import styles from './PublicInput.module.scss';

/**
 * Public_input filed input.
 *
 * @returns React component.
 */
export const PublicInput = (): ReactElement => {
    const [errorMessage, setErrorMessage] = useState('');
    const { processing } = useContext(OrderManagementContext);
    const {
        control,
        formState: { errors },
    } = useFormContext<CreateBid>();

    return (
        <BaseFormGroup
            hasError={!!errors['input']}
            labelText="Public Input"
            className="publicInput"
        >
            {() => (
                <>
                    <Controller<CreateBid, 'input'>
                        name="input"
                        control={control}
                        rules={{
                            validate: val => val !== null && !!val,
                        }}
                        render={({ field: { ref: _, ...rest } }) => (
                            <FileUploader
                                {...rest}
                                disabled={processing}
                                setErrorMessage={setErrorMessage}
                            />
                        )}
                    />
                    {errorMessage && <div className="errorMessage">{errorMessage}</div>}
                </>
            )}
        </BaseFormGroup>
    );
};

/**
 * Props.
 */
type FileUploaderProps = {
    disabled?: boolean;
    setErrorMessage: Dispatch<SetStateAction<string>>;
} & Omit<ControllerRenderProps<CreateBid, 'input'>, 'ref'>;

/**
 * Renders file uploader.
 *
 * @param {FileUploaderProps} props Props.
 * @returns Recat component.
 */
const FileUploader = ({ onChange, disabled, setErrorMessage }: FileUploaderProps): ReactElement => {
    const handleJsonFile = useCallback(
        (acceptedFiles: File[], fileRejections: FileRejection[]) => {
            if (fileRejections.length !== 0) {
                setErrorMessage('Please submit only JSON files');
                onChange(null);
            }

            const reader = new FileReader();

            reader.onload = ({ target }) => {
                if (!target || !target.result) {
                    return;
                }

                try {
                    const obj = JSON.parse(target.result as string);
                    onChange(obj);
                    setErrorMessage('');
                } catch (e) {
                    setErrorMessage('File is not a valid JSON');
                    onChange(null);
                }
            };

            reader.onerror = () => {
                setErrorMessage('Error while reading file');
                onChange(null);
            };
            reader.onabort = () => {
                /*Do nothing*/
            };

            const file = acceptedFiles.at(0);
            file && reader.readAsText(file);
        },
        [onChange, setErrorMessage],
    );

    return (
        <FileUploaderTemplate
            className={styles.fileUploader}
            multiple={false}
            disabled={disabled}
            accept={{
                'application/json': ['.json'],
            }}
            onDrop={handleJsonFile}
            placeholder="Drag'n drop some json files here, or click to select files"
        />
    );
};
