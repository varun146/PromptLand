"use client";
import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import PromptCard from "@app/components/PromptCard";
import { useRouter } from "next/navigation";

const ProfilePage = ({ params }) => {
  const [data, setData] = useState([]);
  const { data: session } = useSession();
  const router = useRouter();
  console.log("here is the router object: ", router);

  useEffect(() => {
    const fetchProfileDetails = async () => {
      const res = await fetch(`/api/users/${params.id}/posts`);
      const posts = await res.json();
      setData(posts);

      console.log("Here are the fetched posts", data);
    };
    fetchProfileDetails();
  }, []);
  return (
    <section className="w-full">
      <h1 className="head_text text-left">
        <span className="blue_gradient">{session?.user.name}</span>
      </h1>
      <div className="mt-10 prompt_layout">
        {data.map((post) => (
          <PromptCard
            key={post._id}
            post={post}
            handleEdit={() => handleEdit && handleEdit(post)}
            handleDelete={() => handleDelete && handleDelete(post)}
          />
        ))}
      </div>
    </section>
  );
};

export default ProfilePage;
