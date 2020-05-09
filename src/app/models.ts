export interface TResponse<T> {
    data: T
}

export interface TUser {
    email: string;
    token?: string;
    id: string;
}

/**
 * TBlob a blob of information used to update the user.
 */
export interface TBlobUser {
    email?: string;
    id?: string;
    
}

export interface TResponseList<T> {
    data: T[]
}

export interface TKey {
    id: string;
    api_key: string;
}
export interface AttoSubscription{
    name: string;
    price: number;
    id?: string;
}

