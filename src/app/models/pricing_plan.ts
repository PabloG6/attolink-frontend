export interface Plan {
    preview_limit: number;
    cache_limit: {limit: number, unit: string};
    cache_request_limit: number;
    overage_fees: number;
    price: number;
    title: string;
    description: string;
    
}