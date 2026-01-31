const ATHENA_BASE_URL =
    (process.env.ATHENA_BASE_URL ?? 'https://athena-db.com/gateway').replace(
        /\/$/,
        ''
    );

type AthenaHeadersOverrides = {
    companyId?: string;
    organizationId?: string;
    userId?: string;
};

export type AthenaFilterOperator = 'eq' | 'gte' | 'lte' | 'in';

export interface AthenaFilter {
    column: string;
    value: any;
    operator?: AthenaFilterOperator;
}

export interface AthenaSort {
    column: string;
    direction?: 'asc' | 'desc';
}

export interface AthenaInsertOptions {
    table: string;
    insertBody: Record<string, any>;
    schema?: string;
    limit?: number;
    filters?: AthenaFilter[];
    sort?: AthenaSort[];
    overrides?: AthenaHeadersOverrides;
}

export interface AthenaFetchOptions {
    table: string;
    schema?: string;
    limit?: number;
    filters?: AthenaFilter[];
    sort?: AthenaSort[];
    overrides?: AthenaHeadersOverrides;
}

export interface AthenaResponse<T = any> {
    success: boolean;
    data?: T;
    error?: string;
}

function buildHeaders(overrides?: AthenaHeadersOverrides) {
    const baseHeaders: Record<string, string> = {
        'Content-Type': 'application/json',
        'cache-control': 'no-cache',
        'x-athena-client': process.env.ATHENA_CLIENT ?? 'railway_direct',
        'x-user-id': overrides?.userId ?? process.env.ATHENA_USER_ID ?? '',
        'x-api-key': process.env.ATHENA_API_KEY ?? '',
    };

    if (process.env.ATHENA_COMPANY_ID || overrides?.companyId) {
        baseHeaders['X-Company-Id'] =
            overrides?.companyId ?? process.env.ATHENA_COMPANY_ID!;
    }

    if (process.env.ATHENA_ORGANIZATION_ID || overrides?.organizationId) {
        baseHeaders['X-Organization-Id'] =
            overrides?.organizationId ?? process.env.ATHENA_ORGANIZATION_ID!;
    }

    return baseHeaders;
}

function buildPayload(
    table: string,
    schema: string | undefined,
    limit: number | undefined,
    filters?: AthenaFilter[],
    sort?: AthenaSort[]
) {
    const payload: Record<string, any> = {
        table_name: table,
        schema: schema ?? 'public',
    };

    if (typeof limit === 'number') {
        payload.limit = limit;
    }

    if (Array.isArray(filters) && filters.length) {
        payload.filters = filters.map((filter) => ({
            column: filter.column,
            operator: filter.operator ?? 'eq',
            value: filter.value,
        }));
    }

    if (Array.isArray(sort) && sort.length) {
        payload.sort = sort.map((entry) => ({
            column: entry.column,
            direction: entry.direction ?? 'asc',
        }));
    }

    return payload;
}

async function athenaRequest(
    path: 'insert' | 'fetch',
    payload: Record<string, any>,
    method: 'PUT' | 'POST',
    overrides?: AthenaHeadersOverrides
): Promise<AthenaResponse<any>> {
    const headers = buildHeaders(overrides);
    const response: AthenaResponse<any> = {
        success: false,
    };

    try {
        const res = await fetch(`${ATHENA_BASE_URL}/${path}`, {
            method,
            headers,
            body: JSON.stringify(payload),
        });

        const text = await res.text();
        const parsed = text ? JSON.parse(text) : null;

        if (!res.ok) {
            response.error =
                parsed?.error ??
                `Athena request failed with status ${res.status}`;
            return response;
        }

        response.data = parsed ?? null;
        response.success = true;
        return response;
    } catch (error) {
        response.error =
            error instanceof Error ? error.message : 'Unknown Athena error';
        return response;
    }
}

export async function insertIntoAthena(
    options: AthenaInsertOptions
): Promise<AthenaResponse<any>> {
    const payload = {
        ...buildPayload(
            options.table,
            options.schema,
            options.limit,
            options.filters,
            options.sort
        ),
        insert_body: options.insertBody,
    };

    const response = await athenaRequest(
        'insert',
        payload,
        'PUT',
        options.overrides
    );

    return response;
}

export async function fetchFromAthena(
    options: AthenaFetchOptions
): Promise<AthenaResponse<any[]>> {
    const payload = buildPayload(
        options.table,
        options.schema,
        options.limit,
        options.filters,
        options.sort
    );

    const response = await athenaRequest(
        'fetch',
        payload,
        'POST',
        options.overrides
    );

    if (response.success && response.data) {
        const resultData = response.data?.data ?? response.data?.result ?? response.data;
        response.data = Array.isArray(resultData) ? resultData : [];
    } else {
        response.data = [];
    }

    return response as AthenaResponse<any[]>;
}
