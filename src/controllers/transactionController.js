const baseUrl = import.meta.env.VITE_BASE_URL;

export const createTransaction = async (formData) => {
    try {
        const response = await fetch(`${baseUrl}/transaction/create`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                formData
            }),
        });

        if (!response.ok) {
            throw new Error('Failed to create transaction');
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error creating transaction:', error);
        throw error;
    }
};

export const updatePaymentStatus = async (transactionId, status) => {
    try {
        const response = await fetch(`${baseUrl}/transaction/payment-status`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                transactionId: transactionId,
                paymentStatus: status,
            }),
        });

        if (!response.ok) {
            throw new Error("Failed to update payment status");
        }

        const updatedTransaction = await response.json();
    } catch (error) {
        console.error("Error updating payment status:", error);
    }
};