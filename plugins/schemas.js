export const REPORT = {
  wallet: String,
  earning: Number,
  unclaimed: Number,
  total: Number,
  next_claim_date: Date,
  featured_nft: [
    {id: Number, img: String}
    //........
  ],
  report: {
    earning: {
      type: String,
      data: [
        {date: Date, value: Number}
        //........
      ]
    },
    ranking: {
      type: "date",
      data: [
        {date: Date, value: Number}
        //........
      ]
    }
  }
}

export const DASHBOARD = {
  overview: {
    earning: Number,
    unclaimed: Number,
    total: Number,
  },
  portfolio: {
    game: Number,
    nft: Number,
    scholarship: Number,
  },
  performance: {
    roi: Number,
    invest: Number
  },
  games: [
    {
      game: {
        id: Number,
        name: String,
        options: {
          tableField: [
            {
              name: String, field: String
            }
          ]
          //.......
        },
        earning: Number,
        unclaimed: Number,
        total: Number,
        investor: Number,
        scholarship: Number,
        wallets: [
          {
            name: String,
            earning: Number,
            nft: Number,
            next_claim_date: Date,
            terms: [
              {type: String, name: String, value: String}
            ]
          }
        ]
      }
    }
  ]
}
