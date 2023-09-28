import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import {
  ULedgerTransactionInputV2,
  ULedgerTransactionSessionV2,
} from "@uledger/uledger-sdk";

const { privateKey, publicKey } = crypto.generateKeyPairSync("rsa", {
  modulusLength: 2048,
  publicKeyEncoding: {
    type: "spki",
    format: "pem",
  },
  privateKeyEncoding: {
    type: "pkcs8",
    format: "pem",
  },
});

function sha256Hash(data: string): string {
  const hash = crypto.createHash("sha256");
  hash.update(data);
  return hash.digest("hex");
}

export async function POST(req: NextRequest) {
  const data = await req.formData();
  const title: string = data.get("title") as string;
  const file: File = data.get("file") as File;

  if (!file) {
    return NextResponse.json({ success: false });
  }

  const my_address = sha256Hash(publicKey);
  const hash = crypto.createHash("sha256");

  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  hash.update(buffer);
  const fileHash = hash.digest("hex"); // 32 bytes

  try {
    const uledgerTxn = async () => {
      const txnSession = new ULedgerTransactionSessionV2({
        nodeUrl: "https://node1.network.uledger.io",
        atomicClockUrl: "https://uledger.net/api/v1/acs",
        nodeId:
          "51c7be67796f168548f0e82306095aeec58989940a9b1aedf1e758df8746d508",
      });
      const txnInputData: ULedgerTransactionInputV2 = {
        blockchainId:
          "ac083898380e3068783fbc932485db623581335499346a81922533f948a46851",
        to: my_address,
        from: my_address,
        payload: {
          title: title,
          type: file.type,
          file_name: file.name,
          file_size: file.size,
          file_hash: fileHash,
        },
        payloadType: "DATA",
        senderSignature: "",
      };

      const inputString = JSON.stringify(txnInputData.payload);
      const hash = sha256Hash(inputString);

      const sign = crypto.createSign("RSA-SHA256");
      sign.update(hash);
      const signature = sign.sign(privateKey, "base64");

      txnInputData.senderSignature = sha256Hash(signature);

      const txn = await txnSession.createTransaction(txnInputData);
      return txn;
    };
    const txn = await uledgerTxn();
    return NextResponse.json(txn, { status: 200 });
  } catch (error) {
    return NextResponse.json({ success: false });
  }
}
