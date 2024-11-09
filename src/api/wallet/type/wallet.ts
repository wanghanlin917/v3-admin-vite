export interface WalletRequestData {
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
}
