// src/paypal/paypalController.js

const baseUrl = import.meta.env.VITE_BASE_URL;
export const createPay = async (total) => {
    try {
        const response = await fetch(`${baseUrl}/api/orders`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                intent: "CAPTURE",
                purchase_units: [
                    {
                        amount: {
                            currency_code: "USD",
                            value: total.toString(),  // Amount in the smallest unit (cents) if needed
                        },
                    },
                ],
            }),
        });

        console.log("Response Status:", response.status);  // Log the status code

        if (!response.ok) {
            const errorText = await response.text();
            console.log("Error Response Text:", errorText);  // Log the raw error response
            return null; // Return null if the order creation failed
        }

        const orderData = await response.json();
        console.log("orderData", orderData);

        if (!orderData.orderID) {
            const errorDetail = orderData.details[0];
            const errorMessage = errorDetail
                ? `${errorDetail.issue} ${errorDetail.description} (${orderData.debug_id})`
                : "Unexpected error occurred, please try again.";
            throw new Error(errorMessage);
        }

        return orderData.orderID;
    } catch (error) {
        console.error("Error creating order:", error);
        alert("Failed to create order.");
        return null;
    }
};

export const capturePay = async (orderID, onSuccess) => {
    try {
        const response = await fetch(`${baseUrl}/api/orders/${orderID}/capture`, {
            method: "POST",
            body: JSON.stringify({
                orderID: orderID,
            }),
        });

        const details = await response.json();
        console.log("Capture details:", details);

        // Handle success logic, like showing a success message
        if (onSuccess) {
            await onSuccess();
        }
    } catch (error) {
        console.error("Error capturing order:", error);
        alert("Failed to capture order.");
    }
};
