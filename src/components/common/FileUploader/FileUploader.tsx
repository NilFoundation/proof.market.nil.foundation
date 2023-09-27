/**
 * @file React component.
 * @copyright Yury Korotovskikh <u.korotovskiy@nil.foundation>
 */

import type { ReactElement } from 'react';
import { Icon } from '@nilfoundation/react-components';
import type { DropzoneOptions } from 'react-dropzone';
import { useDropzone } from 'react-dropzone';
import styles from './FileUploader.module.scss';

/**
 * Props.
 */
type FileUploaderProps = {
  placeholder?: string;
  className?: string;
} & DropzoneOptions;

/**
 *
 * @param {FileUploaderProps} props Props.
 * @returns React component.
 */
export const FileUploader = ({
  placeholder = "Drag'n drop some files here, or click to select files",
  className,
  ...restOptions
}: FileUploaderProps): ReactElement => {
  const { acceptedFiles, getRootProps, getInputProps, isDragActive } = useDropzone({
    ...restOptions,
  });

  return (
    <div
      className={`${styles.container} ${isDragActive ? styles.dragActive : ''} ${className ?? ''}`}
      {...getRootProps()}
    >
      <input {...getInputProps()} />
      {acceptedFiles.length !== 0 ? (
        <span>
          {acceptedFiles.map(x => (
            <span key={x.name}>{x.name}</span>
          ))}
        </span>
      ) : (
        <span className={styles.placeholder}>{placeholder}</span>
      )}
      <Icon
        className={styles.icon}
        iconName="fa-solid fa-circle-arrow-up"
      />
    </div>
  );
};
