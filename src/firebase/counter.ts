import { database } from "./firebaseConfig";
import { ref, get, runTransaction } from "firebase/database";

export const incrementCounter = async () => {
    const counterRef = ref(database, "statsCounter");

    try {
        // use of transaction to ensure atomic updates (so two users can't increment the counter at the same time)
        await runTransaction(counterRef, (currentValue) => {
            // if the counter doesn't exist, set it to 1 (not possible since we set it to 0 in the database)
            if (currentValue === null) {
                return 1;
            }
            return currentValue + 1; // increment the counter
        });
    } catch (error) {
        console.error("Error updating counter:", error);
    }
};



export const getCounter = async () => {
    const counterRef = ref(database, "statsCounter");

    try {
        const snapshot = await get(counterRef);
        return snapshot.exists() ? snapshot.val() : 0;
    } catch (error) {
        console.error("Error getting counter:", error);
        return 0;
    }
}