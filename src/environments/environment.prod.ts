export const environment = {
  production: true,
  stripe_key: "pk_live_w3nqqxvfF5OIu1tt1uMq8TDL00rfVNyhKI",
  rootUrl: "https://api.teenielink.dev/",
  atto_cookie: 'ATTO_COOKIE',
  api_key: 'f9187d2c-4b31-4793-b5f8-372149bb5880',
  products: [
    {
      amount: 0,
      id: "price_1H7wzpFiqLhwiC9fRNp7HFeB",
      nickname: "Free",
      preview_limit: 100,
      description: 'Personal Use',
      restrict_ip: 3
    },
    {
      id: "price_1H7wzpFiqLhwiC9fKHf53SoJ",
      preview_limit: 1000,
      amount: 999,
      description: "Low Volume",
      restrict_ip: 'unlimited',
      nickname: "Basic"
    },
    {
      preview_limit: 3000,
      id: "price_1H7wzqFiqLhwiC9f2S4jJS2b",
      description: "Medium Volume",
      restrict_ip: 'unlimited',
      nickname: "Premium",
      amount: 2500
    },
    {
      amount: 9900,
      nickname: "Enterprise",
      preview_limit: 10000,
      id: "price_1H7wzqFiqLhwiC9fbBAyCuVB",
      description: "High Volume",
      restrict_ip: 'unlimited'
    }
  ]
};
