/*import Arweave from "arweave";

const arweave = Arweave.init({
  host: "arweave.net", // Hostname or IP address for a Arweave host
  port: 443, // Port
  protocol: "https", // Network protocol http or https
  timeout: 20000, // Network request timeouts in milliseconds
  logging: false, // Enable network request logging
});

export default arweave;
*/

import Arweave from "arweave";

// Initialize Arweave
const arweave = Arweave.init({
  host: "arweave.net",
  port: 443,
  protocol: "https",
});

// Function to upload file to Arweave
export async function uploadFileToArweave(file: any, key: any) {
  try {
    // Convert file to a buffer
    const data = await file.arrayBuffer();

    // Create a transaction
    const transaction = await arweave.createTransaction({ data }, key);

    // Add tags to the transaction (optional)
    transaction.addTag("Content-Type", file.type);

    // Sign the transaction
    await arweave.transactions.sign(transaction, key);

    // Submit the transaction
    const response = await arweave.transactions.post(transaction);

    // Return the transaction ID or response status
    return transaction.id;
  } catch (error) {
    console.error("Error uploading file to Arweave:", error);
    throw error;
  }
}
