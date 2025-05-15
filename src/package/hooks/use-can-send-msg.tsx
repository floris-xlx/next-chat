// utils
import { countCharacters } from "@/package/utils/utils";
import { useState, useEffect } from "react";

interface UseCanSendMsgProps {
  textContent: string;
  characterLimit: number;
  filesUrlList?: string[];
}

export const useCanSendMsg = ({
  textContent,
  characterLimit,
  filesUrlList = [],
}: UseCanSendMsgProps): { sendingDisabled: boolean } => {
  const [sendingDisabled, setSendingDisabled] = useState(true);

  useEffect(() => {
    const characters = countCharacters(textContent);

    setSendingDisabled(
      !(filesUrlList.length > 0) && (characters < 1 || characters > characterLimit)
    );
  }, [textContent, filesUrlList, characterLimit]);

  return { sendingDisabled };
};
