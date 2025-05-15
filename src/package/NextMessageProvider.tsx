"use client";

// ui
import React from "react";
import { NextMessageBox } from "@/package/NextMessage";

export default function NextMessageProvider({
  thread_id,
  domain,
}: {
  thread_id: string;
  domain: string;
}) {
  return (
    <form id={"next-chat-provider"}>
      <NextMessageBox
        thread_id={thread_id}
        domain={domain}
        style={{
          width: "550px",
          height: "800px",
      
        }}
      />
    </form>
  );
}
