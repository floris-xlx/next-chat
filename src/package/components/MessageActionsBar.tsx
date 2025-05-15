"use client";

import { SendHorizonal, Paperclip, Smile, AtSign } from "lucide-react";

// ui
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import React, { Fragment, useState, useEffect, useRef } from "react";

// zustand

import { Button } from "@/components/ui/button";

import { useToast } from "@/hooks/use-toast";
import { useUserStore, useViewStore } from "@/store/store";

export const MessageActionsBar = ({
  sendingDisabled,
  handleSendClickWrapper,
}: {
  sendingDisabled: boolean;
  handleSendClickWrapper: any;
}) => {
  const { toast } = useToast();
  const { user } = useUserStore();

  const [file, setFile] = useState<File | null>(null);
  const [filesUrlList, setFilesUrlList] = useState<string[]>([]);

  // Save filesUrlList to localStorage when it changes
  useEffect(() => {
    if (filesUrlList.length > 0) {
      localStorage.setItem("filesUrlList", JSON.stringify(filesUrlList));
    }
  }, [filesUrlList]);

  // Load filesUrlList from localStorage on component mount
  useEffect(() => {
    const savedFilesUrlList = localStorage.getItem("filesUrlList");
    if (savedFilesUrlList) {
      try {
        const parsedList = JSON.parse(savedFilesUrlList);
        if (Array.isArray(parsedList)) {
          setFilesUrlList(parsedList);
        }
      } catch (error) {
        console.error("Error parsing filesUrlList from localStorage:", error);
      }
    }
  }, []);

  const handleAtClick = async () => {
    toast({
      description: "handleAtClick was clicked",
      variant: "system",
      duration: 5000,
    });
  };

  const handleEmojiClick = async () => {
    toast({
      description: "handleEmojiClick was clicked",
      variant: "system",
      duration: 5000,
    });
  };

  const handleAttachClick = async () => {
    toast({
      description: "handleAttachClick was clicked",
      variant: "system",
      duration: 5000,
    });
  };
  // tooltip texts
  const toolTipTexts = {
    at: "Mention someone",
    emoji: "Add emoji",
    attach: "Attach files",
    send: "Send",
  };

  const classessDisabledCursor = sendingDisabled
    ? "cursor-not-allowed pointer-events-none"
    : "cursor-pointer";
  const bgDisabledSendButton = sendingDisabled ? "bg-transparent" : "";
  const colorIcon = sendingDisabled ? "#acacad" : "#d9d9de";

  const handleSendClick = async (event: React.MouseEvent) => {
    event.preventDefault();
    handleSendClickWrapper();
  };

  return (
    <div className=" p-4 flex flex-row justify-between  ">
      <TooltipProvider delayDuration={500}>
        <div className="flex flex-row items-center w-fit">
          <Tooltip>
            <TooltipTrigger>
              <Button
                variant={"icon_naked"}
                onClick={handleAtClick}
                size={"icon_small"}
                className="rounded-md hover:bg-hover-foreground"
                type={"button"}
              >
                <AtSign size={18} className="text-icon" />
              </Button>
            </TooltipTrigger>
            <TooltipContent className="p-0 px-1">
              <p className="text-[10px] font-[400]">{toolTipTexts.at}</p>
            </TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger>
              <Button
                variant={"icon_naked"}
                onClick={handleEmojiClick}
                size={"icon_small"}
                className="rounded-md hover:bg-hover-foreground"
                type={"button"}
              >
                <Smile size={18} className="text-icon" />
              </Button>
            </TooltipTrigger>
            <TooltipContent className="p-0 px-1">
              <p className="text-[10px] font-[400]">{toolTipTexts.emoji}</p>
            </TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger>
              <label htmlFor="file-upload" className="cursor-pointer">
                <Button
                  variant={"icon_naked"}
                  size={"icon_small"}
                  className="rounded-md hover:bg-hover-foreground"
                  type={"button"}
                  onClick={(e) => {
                    e.preventDefault(); // Prevent form submission
                    // Directly trigger the file input click
                    document.getElementById("file-upload")?.click();
                  }}
                >
                  <Paperclip size={18} className="text-icon" />
                </Button>
                <input
                  id="file-upload"
                  type="file"
                  className="hidden"
                  onChange={async (e) => {
                    if (e.target.files && e.target.files.length > 0) {
                      const file = e.target.files[0];
                      console.log("File selected:", file);
                      setFile(file);

                      try {
                        const formData = new FormData();
                        formData.append("file", file);

                        const response = await fetch(
                          "https://api.suitsbooks.nl/files/upload",
                          {
                            method: "POST",
                            body: formData,
                          }
                        );

                        if (!response.ok) {
                          throw new Error(`Upload failed: ${response.status}`);
                        }

                        const data = await response.json();
                        console.log("File uploaded successfully:", data);

                        // Handle the file URL from the response
                        if (data && data.file_url) {
                          console.log("File URL:", data.file_url);

                          // Add the file URL to the list
                          setFilesUrlList((prev) => [...prev, data.file_url]);
                        }
                      } catch (error) {
                        console.error("Error uploading file:", error);
                      }
                    }
                  }}
                />
              </label>
            </TooltipTrigger>
            <TooltipContent className="p-0 px-1">
              <p className="text-[10px] font-[400]">{toolTipTexts.attach}</p>
            </TooltipContent>
          </Tooltip>
        </div>
        <div>
          <Tooltip>
            <TooltipTrigger className={classessDisabledCursor}>
              <Button
                variant={"brand"}
                onClick={(event) => handleSendClick(event)}
                size={"icon_small"}
                className={`rounded-md   ${bgDisabledSendButton}`}
                type={"button"}
                disabled={sendingDisabled}
              >
                <SendHorizonal size={18} color={colorIcon} />
              </Button>
            </TooltipTrigger>
            <TooltipContent className="p-0 px-1">
              <p className="text-[10px] font-[400]">{toolTipTexts.send}</p>
            </TooltipContent>
          </Tooltip>
        </div>
      </TooltipProvider>
    </div>
  );
};

export default MessageActionsBar;
