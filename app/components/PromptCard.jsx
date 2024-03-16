"use client";
import React, { useState } from "react";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";

const PromptCard = ({ post, handleTagClick, handleEdit, handleDelete }) => {
  const [copy, setCopy] = useState("");
  const { data: session } = useSession();
  const pathName = usePathname();
  console.log("Post value in Profile/Prompt Card: ", post);

  const handleCopy = () => {
    setCopy(post.prompt);
    navigator.clipboard.writeText(post.prompt);
    setTimeout(() => setCopy(""), 3000);
  };
  return (
    <div className="prompt_card">
      <div className="flex justify-between items-start gap-5">
        <div className="flex-1 flex  justify-start items-start gap-3 cursor-pointer">
          <Image
            src={post.creator.image}
            width={40}
            height={40}
            alt="profile_pic"
            className="rounded-full object-contain"
          />
          <div className="flex flex-col gap-1">
            <span className="font-satoshi font-semibold text-gray-700">
              {post.creator.username}
            </span>
            <span className="font-satoshi text-sm text-gray-500">
              {post.creator.email}
            </span>
          </div>
        </div>
        <div>
          <Image
            src={
              copy === post.prompt
                ? "/assets/icons/tick.svg"
                : "/assets/icons/copy.svg"
            }
            width={22}
            height={22}
            onClick={handleCopy}
          />
        </div>
      </div>

      <p className="my-4 font-satoshi text-sm text-gray-600">{post.prompt}</p>
      <p
        onClick={() => handleTagClick && handleTagClick(post.tag)}
        className="font-satoshi text-sm font blue_gradient cursor-pointer"
      >
        {post.tag}
      </p>
      <p>
        {session?.user.id === post.creator._id && pathName === "/profile" && (
          <div className="mt-5 flex-center gap-4 border-t border-gray-200 pt-3">
            <p
              className="text-sm font-inter text-green-700 cursor-pointer"
              onClick={() => handleEdit(post)}
            >
              Edit
            </p>
            <p
              className="text-sm text-red-600 font-inter cursor-pointer"
              onClick={() => handleDelete(post)}
            >
              Delete
            </p>
          </div>
        )}
      </p>
    </div>
  );
};

export default PromptCard;
