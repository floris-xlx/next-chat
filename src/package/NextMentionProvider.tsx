import React, { useState, useEffect, useRef, Fragment } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import MessageProfilePicture from "@/package/components/MessageProfilePicture";

const MentionPopover = ({ users }) => {
  const [showPopover, setShowPopover] = useState(false);
  const [matchingUsers, setMatchingUsers] = useState([]);
  const textareaRef = useRef(null);
  const [text, setText] = useState("");
  const [cursorPosition, setCursorPosition] = useState(0);

  useEffect(() => {
    const textBeforeCursor = text.slice(0, cursorPosition);
    const mentionMatch = textBeforeCursor.match(/@(\w*)$/);

    if (mentionMatch) {
      const usernameFragment = mentionMatch[1];
      const filteredUsers = users.filter((user) =>
        user.username.toLowerCase().startsWith(usernameFragment.toLowerCase())
      );

      if (filteredUsers.length > 0) {
        setMatchingUsers(filteredUsers);
        setShowPopover(true);
      } else {
        setShowPopover(false);
      }
    } else {
      setShowPopover(false);
    }
  }, [text, cursorPosition, users]);

  const handleUserClick = (user) => {
    const textBeforeCursor = text.slice(0, cursorPosition);
    const mentionMatch = textBeforeCursor.match(/@(\w*)$/);
    if (mentionMatch) {
      const beforeMention = textBeforeCursor.slice(0, mentionMatch.index);
      const afterCursor = text.slice(cursorPosition);
      const updatedText = `${beforeMention}@${user.username} ${afterCursor}`;
      setText(updatedText);
      setShowPopover(false);

      // Update contentEditable content
      if (textareaRef.current) {
        textareaRef.current.innerHTML = updatedText;
        placeCaretAtEnd(textareaRef.current);
      }
    }
  };

  const handleInput = (e) => {
    setText(e.target.innerText);
    setCursorPosition(getCaretPosition());
  };

  const getCaretPosition = () => {
    let position = 0;
    const selection = window.getSelection();
    if (selection && selection.rangeCount > 0) {
      const range = selection.getRangeAt(0);
      const preCaretRange = range.cloneRange();
      preCaretRange.selectNodeContents(textareaRef.current);
      preCaretRange.setEnd(range.endContainer, range.endOffset);
      position = preCaretRange.toString().length;
    }
    return position;
  };

  const placeCaretAtEnd = (element) => {
    element.focus();
    const range = document.createRange();
    const selection = window.getSelection();
    range.selectNodeContents(element);
    range.collapse(false);
    selection.removeAllRanges();
    selection.addRange(range);
  };

  return (
    <Fragment>
      <Popover open={showPopover}>
        <PopoverTrigger asChild>
          <span style={{ display: "none" }}>@</span>
        </PopoverTrigger>
        <PopoverContent
          onOpenAutoFocus={() => textareaRef.current.focus()}
          className="w-60 p-2 bg-background rounded-md"
          style={{
            paddingBottom: "4px",
            paddingLeft: "4px",
            paddingRight: "4px",
          }}
        >
          {matchingUsers.length > 0 && (
            <div className="flex flex-col space-y-2 ">
              {matchingUsers.slice(0, 8).map((user) => (
                <div
                  key={user.user_id}
                  className="flex items-center space-x-2 flex-row justify-between w-full cursor-pointer p-2 hover:bg-gray-700 rounded-md"
                  onMouseDown={(e) => {
                    e.preventDefault(); // Prevent losing focus
                    handleUserClick(user);
                  }}
                >
                  <MessageProfilePicture
                    profile_picture={user.profile_picture}
                    email={user.email}
                    height={18}
                    width={18}
                  />
                  <span className="text-primary text-[14px] font-[300]">
                    {user.username}
                  </span>
                </div>
              ))}
            </div>
          )}
        </PopoverContent>
      </Popover>

      <div
        contentEditable
        ref={textareaRef}
        className="border rounded-md p-2 min-h-[44px] bg-white focus:outline-none"
        onInput={handleInput}
        onKeyDown={(e) => {
          if (e.key === "Enter" && showPopover) {
            e.preventDefault(); // Prevent new line if popover is open
            if (matchingUsers.length > 0) {
              handleUserClick(matchingUsers[0]);
            }
          }
        }}
        onClick={() => setCursorPosition(getCaretPosition())}
        onKeyUp={() => setCursorPosition(getCaretPosition())}
        style={{
          whiteSpace: "pre-wrap",
          wordWrap: "break-word",
          outline: "none",
        }}
        dangerouslySetInnerHTML={{ __html: text }}
      />
    </Fragment>
  );
};

export default MentionPopover;
