"use client";

import React, { useState, useEffect, useRef, Fragment } from "react";

import {
  addMessage,
  fetchMessagesByDomainAndThread,
} from "@/actions/messaging";
import { useToast } from "@/hooks/use-toast";
import { useCanSendMsg } from "@/package/hooks/use-can-send-msg";

// ui
import Error from "@/components/ui/error";
import { Textarea } from "@/components/ui/textarea";
import { useUserStore } from "@/store/store";
import MessageActionsBar from "@/package/components/MessageActionsBar";
import handleSendClick from "@/package/interfaces/handleSendClick";

// re-xports
import MessageProfilePicture from "@/package/components/MessageProfilePicture";
import useResizeObservers from "@/package/hooks/use-resize-observers";
import { MessageVirtualizer } from "@/package/components/MessageVirtualizer";
import { countCharacters } from "@/package/utils/utils";

// config
import { NextMessageConfig, defaultConfig } from "@/package/NextMessageConfig";

import MentionPopover from "@/package/NextMentionProvider";

export type MessageBoxProps = {
  thread_id: string;
  domain: string;
  style?: MessageBoxStylingProps;
  allowSelectName?: boolean;
  allowSelectMessage?: boolean;
  placeholderMessage?: string;
  update_interval_in_ms?: number;
  config?: NextMessageConfig;
};

export type MessageBoxStylingProps = {
  width: string;
  height: string;
  minWidth?: string;
  maxWidth?: string;
  maxHeight?: string;
  minHeight?: string;
};

const MessageBox = ({
  thread_id,
  domain,
  style = { width: "600px", height: "400px" },
  allowSelectName = false,
  allowSelectMessage = false,
  placeholderMessage = "Write a message...",
  update_interval_in_ms = 1000,
  config = defaultConfig,
}: MessageBoxProps) => {
  // ref of the virtualization parent
  const parentRef = useRef(null);
  const { toast } = useToast();
  const { user } = useUserStore();
  const [textContent, setTextContent] = useState("");
  const [isTextAreaFocused, setIsTextAreaFocused] = useState(false);
  const [messages, setMessages] = useState<any[]>([]);
  const [lastMessageTime, setLastMessageTime] = useState(0);
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [event, setEvent] = useState<any>(null);
  const [errorHeight, setErrorHeight] = useState(40);
  const [sendButtonClicked, setSendButtonClicked] = useState(false);

  const { sendingDisabled } = useCanSendMsg({
    textContent: textContent,
    characterLimit: config.characterLimit,
  });

  // this makes sure msgs are sorted by time
  const sortedMessages = [...messages].sort((a, b) => a.time - b.time);

  console.log("sortedMessages", sortedMessages);

  useEffect(() => {
    const fetchMessages = async () => {
      const response = await fetchMessagesByDomainAndThread(
        domain,
        thread_id,
        messages.length === 0
      );
      if (response?.data) {
        setMessages(response.data);

        if (response.data.length > 0) {
          setLastMessageTime(
            Math.max(...response.data.map((message) => message.time))
          );
        }
      }
    };
    fetchMessages();
    const interval = setInterval(fetchMessages, update_interval_in_ms);

    return () => clearInterval(interval);
  }, [domain, thread_id, update_interval_in_ms]);

  useEffect(() => {
    if (parentRef.current) {
      parentRef.current.scrollTo({
        top: parentRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [lastMessageTime]);

  useEffect(() => {
    if (parentRef.current && isTextAreaFocused) {
      parentRef.current.scrollTo({
        top: parentRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [isTextAreaFocused]);

  useEffect(() => {
    const observer = new ResizeObserver(() => {
      if (parentRef.current) {
        parentRef.current.scrollTo({
          top: parentRef.current.scrollHeight,
          behavior: "auto",
        });
      }
    });

    if (parentRef.current) {
      observer.observe(parentRef.current);
    }

    return () => {
      if (parentRef.current) {
        observer.unobserve(parentRef.current);
      }
    };
  }, []);

  useEffect(() => {
    const characterCount = countCharacters(textContent);
    if (characterCount > config.characterLimit) {
      setIsError(true);
      setErrorMessage(
        `Character limit exceeded. ${characterCount}/${config.characterLimit}`
      );
    } else {
      setIsError(false);
      setErrorMessage("");
    }
  }, [textContent, config.characterLimit]);

  const handleSendClickWrapper = async () => {
    if (event) {
      event.preventDefault();
    }

    if (parentRef.current) {
      parentRef.current.scrollTo({
        top: parentRef.current.scrollHeight,
        behavior: "smooth",
      });
    }

    if (isError) {
      return;
    }
    setSendButtonClicked(false);
    await handleSendClick(
      event,
      textContent,
      user,
      "",
      thread_id,
      domain,
      setTextContent,
      toast,
      parentRef
    );
  };
  const [cursorPosition, setCursorPosition] = useState(0);


  return (
    <Fragment>
      <MessageVirtualizer
        sortedMessages={sortedMessages}
        allowSelectName={allowSelectName}
        allowSelectMessage={allowSelectMessage}
        parentRef={parentRef}
        style={style}
      />

      <form
        dir="ltr"
        className="w-full border rounded-b-md bg-foreground "
        onSubmit={(e) => {
          handleSendClickWrapper();
        }}
      >
        <div>
          <Textarea
            placeholder={placeholderMessage}
            className="bg-transparent w-full border-none ring-0 resize-none p-4 sm:pb-0 xlx-message-box transform transition-transform duration-150 ease-in-out text-[16px]"
            value={textContent}
            onChange={(e) => {
              setTextContent(e.target.value);
              setEvent(e);
              setCursorPosition(e.target.selectionStart); // Set the cursor position
            }}
            onSelect={(e) => {
              setCursorPosition(e.target.selectionStart); // Update cursor position when selecting text
            }}
            style={{ resize: "none", minHeight: "44px", maxHeight: "60px" }}
            onFocus={() => setIsTextAreaFocused(true)}
            onBlur={() => setIsTextAreaFocused(false)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                setSendButtonClicked(true);
                handleSendClickWrapper();
              }
            }}
            autoFocus
          />

          <div className="px-4">
            <Error
              content={errorMessage}
              isError={isError}
              setIsError={setIsError}
              height={errorHeight}
              timerAmount={50000}
            />
          </div>
        </div>
        <MessageActionsBar
          sendingDisabled={sendingDisabled}
          handleSendClickWrapper={handleSendClickWrapper}
        />
      </form>
    </Fragment>
  );
};

MessageBox.displayName = "MessageBox";

export {
  MessageBox as NextMessageBox,
  MessageProfilePicture as NextMessageProfilePicture,
};
