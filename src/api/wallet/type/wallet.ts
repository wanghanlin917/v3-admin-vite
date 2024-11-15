export interface WalletRequestData {
  moneyLoading: boolean
  money: {
    total: number
    freeze_balance: number
    balance: number
  }
  chargeForm: {
    amount: string
  }
  chargeFormError: {
    amount: string
  }
  withdrawForm: {
    amount: string
    ali_account: string
  }
  withdrawFormError: {
    amount: string
    ali_account: string
  }
  searchForm: {
    date_range: string
    tran_type: string
    trans_id: string
  }
  options: [
    {
      value: string
      label: string
    },
    {
      value: string
      label: string
    },
    {
      value: string
      label: string
    }
  ]
}

export interface ChargeWalletRequestData {
  amount: string
}

export interface WithDrawRequestData {
  amount: string
  ali_account: string
}
