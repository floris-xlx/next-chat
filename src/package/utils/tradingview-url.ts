export function transformTradingViewUrl(url: string): string {
    const baseUrl = 'https://www.tradingview.com/x/';
    const snapshotBaseUrl = 'https://s3.tradingview.com/snapshots/a/';

    if (url.startsWith(baseUrl)) {
        const id = url.slice(baseUrl.length).replace(/\/$/, ''); // Remove trailing slash if exists
        return `${snapshotBaseUrl}${id}.png`;
    }

    return url;
}
