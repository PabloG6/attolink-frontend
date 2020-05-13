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
    inserted_at: string;
    
}
export interface AttoSubscription{
    name: string;
    price: number;
    id?: string;
}

export interface TRoutes {
    endpoint: string;
    icon?: string;
    label?: string;
    lambda?: (val: any) => any
}

export interface TWhiteList {
    id: string;
    ip_address: string;
    type: "ipv4" | "url";
    inserted_at: string;
}