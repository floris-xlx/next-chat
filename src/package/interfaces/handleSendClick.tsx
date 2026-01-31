"use client";

import React, { useState, useEffect } from "react";

import { addMessage } from "@/actions/messaging";
import { scrollFullDown } from "@/package/utils/viewport-utils";
import {
  countCharacters,
  extractUrls,
  identifyUrlType,
} from "@/package/utils/utils";
import { removeUrls } from "@/package/utils/clean-utils";

const handleSendClick = async (
  e: any,
  textContent?: string,
  user?: any,
  referencedMessageId?: string,
  thread_id?: string,
  domain?: string,
  setTextContent?: React.Dispatch<React.SetStateAction<string>>,
  toast?: any,
  containerRef?: React.RefObject<HTMLDivElement>
) => {
  e.preventDefault();
  if (!textContent.trim()) {
    return;
  }

  // Get any file URLs from localStorage
  let filesUrlList: string[] = [];
  try {
    const savedFilesUrlList = localStorage.getItem("filesUrlList");
    if (savedFilesUrlList) {
      const parsedList = JSON.parse(savedFilesUrlList);
      if (Array.isArray(parsedList)) {
        filesUrlList = parsedList;
        // Clear the localStorage after retrieving the URLs
        localStorage.removeItem("filesUrlList");
      }
    }
  } catch (error) {
    console.error("Error parsing filesUrlList from localStorage:", error);
  }

  // possible url cleaning
  //   const urls = urlsList;
  //   const urlTypes = urls.map((url: string) => identifyUrlType(url));

  const newMessageObject = {
    content: textContent,
    user_id: user?.id,
    organization_id: user?.organization_id ?? user?.organization,
    referenced_message_id: referencedMessageId || null,
    is_reference: !!referencedMessageId,
    character_count: countCharacters(textContent),
    thread_id: thread_id,
    domain: domain,
    profile_picture: user?.profile_picture,
    username: user?.username,
    email: user?.email,
    verified: false,
    urls: filesUrlList,
  };

  try {
    const response = await addMessage({ message: newMessageObject });
    if (response.success) {
      scrollFullDown(containerRef);
      setTextContent("");

      // floris; temp removed the client-only ghost message for now
      // setMessages((prevMessages) => [...prevMessages, newMessageObject]);
    } else {
      throw new Error(response.error.message);
    }
  } catch (error: any) {
    toast({
      description: `Failed to send message: ${error.message}`,
      variant: "destructive",
      duration: 2500,
    });
  }
};

export default handleSendClick;
