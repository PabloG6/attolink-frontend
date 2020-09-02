
export const environment = {
  production: false,
  rootUrl: 'https://staging.teenielink.dev/',
  api_key: "b5d2a12d-b77b-4718-97f6-87014d6ab24e",
  atto_cookie: 'ATTO_COOKIE',
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

