export interface TResponse<T> {
    data: []
}

export interface TUser {
    email: String;
    token: String;
    id: String;
}

/**
 * TBlob a blob of information used to update the user.
 */
export interface TBlobUser {
    email?: String;
    id?: String;
    
}

export interface AttoSubscription{
    name: string;
    price: number;
}