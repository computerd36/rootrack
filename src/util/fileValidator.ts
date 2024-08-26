import { Deposit, Withdrawal } from "../types";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function isValidDeposit(deposit: any): deposit is Deposit {
    return (
        typeof deposit === 'object' &&
        typeof deposit._id === 'string' &&
        typeof deposit.id === 'string' &&
        typeof deposit.userId === 'string' &&
        typeof deposit.recipientAddress === 'string' &&
        typeof deposit.confirmations === 'number' &&
        typeof deposit.depositType === 'string' &&
        typeof deposit.network === 'string' &&
        typeof deposit.amount === 'number' &&
        typeof deposit.currency === 'string' &&
        typeof deposit.externalId === 'string' &&
        typeof deposit.status === 'string' &&
        typeof deposit.meta === 'object' &&
        typeof deposit.meta.toAddress === 'string' &&
        typeof deposit.meta.txHash === 'string' &&
        typeof deposit.meta.confirmationsOnCompleted === 'number' &&
        typeof deposit.createdAt === 'string' &&
        typeof deposit.updatedAt === 'string' &&
        typeof deposit.__v === 'number'
    );
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function isValidWithdrawal(withdraw: any): withdraw is Withdrawal {
    return (
        typeof withdraw === 'object' &&
        typeof withdraw._id === 'string' &&
        typeof withdraw.attempts === 'number' &&
        typeof withdraw.plugin === 'string' &&
        typeof withdraw.network === 'string' &&
        typeof withdraw.totalValue === 'number' &&
        typeof withdraw.userId === 'string' &&
        typeof withdraw.status === 'string' &&
        typeof withdraw.currency === 'string' &&
        typeof withdraw.request === 'object' &&
        typeof withdraw.request.amount === 'number' &&
        typeof withdraw.request.plugin === 'string' &&
        typeof withdraw.request.fields === 'object' &&
        typeof withdraw.request.fields.address === 'string' &&
        typeof withdraw.request.fields.countryCode === 'string' &&
        typeof withdraw.request.fields.userFeePaid === 'number' &&
        typeof withdraw.request.userIp === 'string' &&
        typeof withdraw.request.totalValue === 'number' &&
        typeof withdraw.createdAt === 'string' &&
        typeof withdraw.updatedAt === 'string' &&
        typeof withdraw.__v === 'number' &&
        typeof withdraw.transactionId === 'string'
    );
}
