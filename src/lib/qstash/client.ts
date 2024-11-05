'use server';
import { Client, Receiver } from "@upstash/qstash";

import "isomorphic-fetch";

function createQstashClient() {
    return new Client({
        token: process.env.QSTASH_TOKEN,
    });
}

export async function sendMessage() {
    const client = createQstashClient();

    const res = await client.publishJSON({
        url: process.env.QSTASH_URL,
        // or urlGroup: "the name or id of a url group"
        body: {
            hello: "world",
        },
    });

    console.log('res', res);

    console.log(res);
    // { messageId: "msg_xxxxxxxxxxxxxxxx" }
}

export async function receiveMessage(signature: string, body: string) {
    const receiver = new Receiver({
        currentSigningKey: process.env.QSTASH_CURRENT_SIGNING_KEY,
        nextSigningKey: process.env.QSTASH_NEXT_SIGNING_KEY,
    });

    const isValid = await receiver.verify({
        signature,
        body,
    });

    return isValid;
}