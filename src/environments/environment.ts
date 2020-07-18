// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  rootUrl: 'https://staging.teenielink.dev/',
  atto_cookie: 'ATTO_COOKIE',
  api_key: 'f9187d2c-4b31-4793-b5f8-372149bb5880',
  products: [
    {
      amount: 0,
      id: "price_1H4hwaBvkxm3eOnT1vIx6rVL",
      nickname: "Free",
      preview_limit: 100,
      description: 'Personal Use',
      restrict_ip: 3
    },
    {
      id: "price_1H4hwaBvkxm3eOnToyyuTuty",
      preview_limit: 1000,
      amount: 999,
      description: "Low Volume",
      restrict_ip: 'unlimited',
      nickname: "Basic"
    },
    {
      preview_limit: 3000,
      id: "price_1H4hwaBvkxm3eOnT0lyCy3I0",
      description: "Medium Volume",
      restrict_ip: 'unlimited',
      nickname: "Premium",

      amount: 1999
    },
    {
      amount: 9999,
      nickname: "Enterprise",
      preview_limit: 10000,
      id: "price_1H4hwaBvkxm3eOnTyfBbJpfn",
      description: "High Volume",
      restrict_ip: 'unlimited'
    }
  ]
  
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
