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
  options: [
    {
      value: number
      label: string
    },
    {
      value: number
      label: string
    },
    {
      value: number
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
