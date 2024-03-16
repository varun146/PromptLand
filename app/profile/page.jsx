"use client";
import Profile from "@app/components/Profile";
import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";

const MyProfile = () => {
  const [myposts, setMyPosts] = useState([]);
  const { data: session } = useSession();

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(`/api/users/${session?.user.id}/posts`);
      console.log("Res value: ", res);
      const data = await res.json();
      setMyPosts(data);
    };
    if (session?.user.id) {
      fetchData();
    }
  }, [session?.user.id]);

  const handleEdit = () => {};
  const handleDelete = async () => {};
  return (
    <div className="w-full">
      <Profile
        name="My"
        desc="Welcome to your personalized profile page. Share your exceptional prompts and inspire others with the power of your imagination"
        data={myposts}
        handleEdit={handleEdit}
        handleDelete={handleDelete}
      />
    </div>
  );
};

export default MyProfile;
