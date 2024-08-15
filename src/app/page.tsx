"use client";

import { Button } from "../../@/components/ui/button";
import { Input } from "../../@/components/ui/input";
import { Label } from "../../@/components/ui/label";
import { ConnectButton, ThirdwebProvider } from "thirdweb/react";
import { client } from "../lib/client";
import { useRouter } from "next/navigation";
import arweave from "../lib/arweave";
import React, { useState } from "react";
import { ethers } from "ethers";
import { useActiveAccount } from "thirdweb/react";

export default function Home() {
  const [file, setFile] = useState(null);
  const [transactionId, setTransactionId] = useState("");
  const router = useRouter();
  const account = useActiveAccount();

  const handleFileChange = (e: any) => {
    if (e.target.files && e.target.files[0]) {
      console.log("File selected:", e.target.files[0]);
      setFile(e.target.files[0]);
    }
  };

  async function uploadFile(file: File) {
    try {
      if (!account) {
        throw new Error("User is not connected");
      }

      const address = await account.address; // Get the user's address

      // Convert file to ArrayBuffer
      const fileData = await file.arrayBuffer();

      // Create a transaction
      const transaction = await arweave.createTransaction({
        data: fileData,
      });

      // Add a tag to the transaction (optional, but can be used for metadata)
      transaction.addTag("Content-Type", file.type);

      // Hash the file data using ethers
      const fileDataHash = ethers.utils.keccak256(new Uint8Array(fileData));

      // Sign the hashed data using the user's wallet
      const signedData = await account.signMessage(
        ethers.utils.arrayify(fileDataHash)
      );

      transaction.addTag("Signature", signedData);
      transaction.addTag("Signer", address);

      // Submit the transaction to the Arweave network
      const response = await arweave.transactions.post(transaction);

      if (response.status === 200) {
        console.log("File uploaded successfully:", transaction.id);
        return transaction.id; // This is the unique ID of the transaction, which can be used to retrieve the file later
      } else {
        console.error("Error uploading file:", response);
      }
    } catch (error) {
      console.error("Failed to upload file:", error);
    }
  }

  const handleUpload = async () => {
    if (!account) {
      console.log("User is not logged in");
      return;
    }

    if (!file) return;
    const transactionId = await uploadFile(file);
    if (transactionId) {
      console.log("File uploaded! Transaction ID:", transactionId);
      setTransactionId(transactionId);
    }
  };

  return (
    <>
      <ThirdwebProvider>
        <header className="w-full flex items-center justify-center border-b border-[#29292F] bg-[#111115]">
          <nav className="container w-full h-[90px] flex items-center justify-between">
            <p className="text-[#F8F8FF] text-xl sm:text-[42px] font-semibold">
              Demo
            </p>

            <div className="max-w-[200px] sm:w-fit">
              <ConnectButton client={client} />
            </div>
          </nav>
        </header>
        <main className="bg-[#111115] flex items-center justify-center py-20">
          <div className="w-[90%] sm:w-1/2 flex flex-col items-center gap-7">
            <p className="text-[#F8F8FF] text-2xl sm:text-[32px] text-center font-semibold">
              Welcome to my assessment task, thanks for the opportunity
            </p>
            <div className="grid w-full max-w-sm items-center gap-4 px-10 py-8 rounded-[30px] outline outline-1 outline-[#29292F]">
              <Label
                htmlFor="picture"
                className="text-[#F8F8FF] tetx-lg font-medium"
              >
                Picture
              </Label>
              <Input
                id="picture"
                onChange={handleFileChange}
                type="file"
                className="border-[#29292F] border-[1px] text-white"
              />

              <Button
                variant={`default`}
                disabled={!file}
                onClick={handleUpload}
                className="text-white border border-[#29292F] p-2 rounded-[5px]"
              >
                Upload
              </Button>

              {transactionId && (
                <div>
                  File uploaded successfully! Transaction ID:{" "}
                  <a
                    href={`https://viewblock.io/arweave/tx/${transactionId}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {transactionId}
                  </a>
                </div>
              )}
            </div>
          </div>
        </main>
      </ThirdwebProvider>
    </>
  );
}
