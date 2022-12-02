export interface GetAccountBalanceUsecasePayload {
  accountId: string;
}

export interface GetAccountBalanceUsecase {
  execute(
    payload: GetAccountBalanceUsecasePayload,
  ): Promise<{ id: string; balance: number }>;
}
