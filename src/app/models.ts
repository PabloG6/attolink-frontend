import { HttpErrorResponse } from '@angular/common/http';
import { Identifiers } from '@angular/compiler';
import { Observable } from 'rxjs';

export interface TResponse<T> {
    data: T
}



export interface TUser {
    email: string;
    token?: string;
    id: string;
    customer_id?: string;
    plan?: string;
}

export interface TSubscription {
    id?: string;
    nickname?: string;
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
    callback?: () => any
}

export interface TWhiteList {
    id: string;
    ip_address: string;
    type: "ipv4" | "url";
    inserted_at: string;
}

export type ConfirmCallback = () => any;
export type AsyncCOnfirmCallback =  ()  => Observable<any>;
export interface TGenericModal {
    icon?: string;
    headline?: string;
    tagline?: string;
    isObservable?: boolean;
    onConfirmCallback: ConfirmCallback | AsyncCOnfirmCallback;
    cancelText?: string;
    confirmText?: string;
    confirmClass?: string;
    closeOnSuccess?: boolean;

}

export interface TGenericAccount {
    prompt?: string;
    query?: Observable<any>;
}

export interface TPermission {
    id?: string;
    enable_whitelist: 'all' | 'restricted' | 'none';
}
/**
 * TPlan stores the plan ids and nicknames
 */
export interface TPlan {
    id: string;
    nickname: string;
    amount: number;
    currency: string;

}

export interface TServices {
    preview_limit: number;
    cache_limit?: {limit: number, unit: string};
    cache_request_limit?: number;
    overage_fees?: number;
    is_restrict_ip: boolean;
    description?: string;
    
}

// export type TServicesMap = {
//     [key in 'Free' | 'Basic' | 'Premium' | 'Enterprise']: TServices
// }

export const typeServiceMap = {
    'Free': {
        amount: 0,
        nickname: "Free",
        preview_limit: 100,  
        description: 'Personal Use',
         restrict_ip: 3},
    'Basic': {
        preview_limit: 1000, 
        amount: 999,
        description: "Low Volume",
        restrict_ip: 'unlimited',
        nickname: "Basic"
    },
    'Premium': {
        preview_limit: 3000,
        description: "Medium Volume",
        restrict_ip: 'unlimited',
        nickname: "Premium",
        
        amount: 1999
    },

    'Enterprise': {
        amount: 9999,
        nickname: "Enterprise",
        preview_limit: 10000,
        description: "High Volume",
        restrict_ip: 'unlimited'
    }
    
}


export interface TProductMap {
    [key: string]: TProduct
}

export interface TProduct {
    id: string;
    nickname: string;
    amount: number,
    preview_limit: number,
    restrict_ip: number | String,
    description?: string;
    overage_fees?: string;

} 