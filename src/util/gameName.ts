import { Bet } from "../types";

export function getGameName(bet: Bet) {
    if (bet.gameNameDisplay) {
        return bet.gameNameDisplay;
    } else {
        return bet.gameIdentifier.split(":")[1].charAt(0).toUpperCase() + bet.gameIdentifier.split(":")[1].slice(1);
    }
}

export function getProviderName(bet: Bet) {
    return bet.gameIdentifier.split(":")[0].charAt(0).toUpperCase() + bet.gameIdentifier.split(":")[0].slice(1);
}