"use client";

import Form from "@app/components/Form";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useSession } from "next-auth/react";

const CreatePrompt = () => {
  const [submitting, setSubmitting] = useState(false);
  const [post, setPost] = useState({ prompt: "", tag: "" });
  const router = useRouter();
  const { data: session } = useSession();
  console.log("here is the session object: ", session);
  const type = "Create";
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      console.log(post);
      const response = await fetch("/api/prompt/new", {
        method: "POST",
        body: JSON.stringify({
          prompt: post.prompt,
          userId: session?.user.id,
          tag: post.tag,
        }),
      });

      console.log("here is the response: ", response);

      if (response.ok) {
        router.push("/");
      }
    } catch (error) {
      console.log("Error in create-prompt route/page.jsx");
      console.log(error.message);
    } finally {
      setSubmitting(false);
    }
  };
  return (
    <div className="w-full">
      <Form
        type={type}
        submitting={submitting}
        post={post}
        setPost={setPost}
        handleSubmit={handleSubmit}
      />
    </div>
  );
};

export default CreatePrompt;
