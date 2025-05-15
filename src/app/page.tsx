"use client";

// ui
import React, { ReactNode, useEffect, useState, Fragment } from "react";

import NextMessageProvider from "@/package/NextMessageProvider";

import { useUserStore } from "@/store/useUserStore";

export default function Home() {
  const { setProfilePicture, setUsername, setId, setEmail } = useUserStore();

  const [profilePicture, setProfilePictureState] = useState(
    "https://xylex.ams3.cdn.digitaloceanspaces.com/profilePics/floris.png"
  );
  const [username, setUsernameState] = useState("floris");
  const [userId, setUserIdState] = useState("a29faa58-3d54-412e-b071-679912d9ac35");
  const [email, setEmailState] = useState("floris@xylex.ai");

  useEffect(() => {
    setProfilePicture(profilePicture);
    setUsername(username);
    setId(userId);
    setEmail(email);
  }, [profilePicture, username, userId, email]);

  const thread_id = "demo";
  const domain = "next-chat";

  return (
    <Fragment>
      <div className="p-4 flex flex-row justify-center w-full translate-y-[10%] sm:translate-y-[50%] ">
        <NextMessageProvider thread_id={thread_id} domain={domain} />
      </div>
    </Fragment>
  );
}
