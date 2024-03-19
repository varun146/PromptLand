"use client";

import Form from "@app/components/Form";
import { useRouter, useSearchParams } from "next/navigation";
import React, { Suspense, useEffect, useState } from "react";

const UpdatePrompt = () => {
  const [post, setPost] = useState({ prompt: "", tag: "" });
  const searchParams = useSearchParams();
  const router = useRouter();
  const promptId = searchParams.get("id");

  useEffect(() => {
    const fetchPromptData = async () => {
      const res = await fetch(`/api/prompt/${promptId}`);
      const data = await res.json();
      setPost({ prompt: data.prompt, tag: data.tag });
    };
    if (promptId) fetchPromptData();
  }, [promptId]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      console.log(post);
      const response = await fetch(`/api/prompt/${promptId}`, {
        method: "PATCH",
        body: JSON.stringify({
          prompt: post.prompt,
          tag: post.tag,
        }),
      });
      console.log("reponse for udpate request: ", response);

      if (response.ok) {
        router.push("/");
      }
    } catch (error) {
      console.log("Error in update-prompt route/page.jsx");
      console.log(error.message);
    } finally {
    }
  };
  return (
    <Suspense>
      <div className="w-full">
        <Form
          type="Edit"
          post={post}
          setPost={setPost}
          handleSubmit={handleSubmit}
        />
      </div>
    </Suspense>
  );
};

export default UpdatePrompt;
