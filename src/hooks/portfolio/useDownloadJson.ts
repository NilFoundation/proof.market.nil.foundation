/**
 * @file React hook.
 * @copyright Yury Korotovskikh <u.korotovskiy@nil.foundation>
 */

import { useCallback, useState } from 'react';

/**
 * Hook params.
 */
type UseDownloadJsonParams<T extends Record<string, unknown>> = {
    fileName: string;
    source?: T;
    fetcher?: () => Promise<T>;
};

/**
 * Hook return type.
 */
type UseDownloadJsonReturnType = {
    downloadJson: () => void;
    loading: boolean;
};

/**
 * Hook to download data as json.
 *
 * @param {UseDownloadJsonParams} params Hook params.
 * @returns Callback to download data as json file and loading data state.
 */
export const useDownloadJson = <T extends Record<string, unknown>>({
    fileName,
    source,
    fetcher,
}: UseDownloadJsonParams<T>): UseDownloadJsonReturnType => {
    const [loading, setLoading] = useState(false);

    const downloadJson = useCallback(async () => {
        switch (true) {
            case !!source: {
                processDownload(fileName, source!);
                return;
            }
            case !!fetcher: {
                setLoading(true);
                const remoteData = await fetcher!();
                processDownload(fileName, remoteData);
                setLoading(false);
                return;
            }
        }
    }, [source, fileName, setLoading, fetcher]);

    return { downloadJson, loading };
};

/**
 * Creates invisible anchor element to process downloading.
 *
 * @param fileName Name of file to save.
 * @param data Data.
 */
const processDownload = <T extends Record<string, unknown>>(fileName: string, data: T) => {
    const a = document.createElement('a');

    a.download = `${fileName}.json`;
    a.href = window.URL.createObjectURL(new Blob([JSON.stringify(data)], { type: 'text/json' }));

    const clickEvt = new MouseEvent('click', {
        view: window,
        bubbles: true,
        cancelable: true,
    });

    a.dispatchEvent(clickEvt);
    a.remove();
};
