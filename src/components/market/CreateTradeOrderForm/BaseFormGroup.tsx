/**
 * @file React component.
 * @copyright Yury Korotovskikh <u.korotovskiy@nil.foundation>
 */

import type { ReactElement, ReactNode } from 'react';
import { useRef } from 'react';
import { Form, uniqueId } from '@nilfoundation/react-components';

/**
 * Props.
 */
type BaseFormGroupProps = {
  hasError: boolean;
  children: ({ placeholder, id }: { placeholder?: string; id?: string }) => ReactNode;
  hintText?: string;
  labelText?: string;
  className?: string;
};

/**
 * Base form group with label and hint.
 *
 * @param {BaseFormGroupProps} props Props.
 * @returns React component.
 */
export const BaseFormGroup = ({
  hasError,
  children,
  hintText,
  labelText,
  className,
}: BaseFormGroupProps): ReactElement => {
  const { current } = useRef(uniqueId(labelText));

  return (
    <Form.Group
      hasError={hasError}
      className={className}
    >
      {labelText && <Form.Label htmlFor={current}>{labelText}</Form.Label>}
      {children({
        placeholder: hintText,
        id: current,
      })}
    </Form.Group>
  );
};
