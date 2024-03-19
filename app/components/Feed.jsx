"use client";
import React, { useEffect, useState, useRef } from "react";
import PromptCard from "./PromptCard";

const PromptCardList = ({ data, handleTagClick }) => {
  return (
    <div className="mt-16 prompt_layout">
      {data.map((post) => (
        <PromptCard
          key={post._id}
          post={post}
          handleTagClick={handleTagClick}
        />
      ))}
    </div>
  );
};

const Feed = () => {
  const [searchText, setSearchText] = useState("");
  const [posts, setPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const searchInput = useRef();

  useEffect(() => {
    const fetchPosts = async () => {
      const res = await fetch("/api/prompt");
      const data = await res.json();
      setPosts(data);
      setFilteredPosts(data);
    };
    fetchPosts();
  }, []);

  // re-renders when the seachTest changes
  useEffect(() => {
    const filteredData = posts.filter(
      (post) =>
        post.prompt.toLowerCase().includes(searchText) &&
        post.creator.username.toLowerCase().includes(searchText),
    );
    setFilteredPosts(filteredData);
  }, [searchText, posts]);
  return (
    <section className="feed">
      <form className="relative w-full flex-center">
        <input
          ref={searchInput}
          type="text"
          placeholder="Search for a tag or a username"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          required
          className="w-full bg-gray-300 text-black text-sm py-4 px-3 rounded-full focus:outline-none shadow-md shadow-gray-400"
        />
      </form>
      <PromptCardList data={filteredPosts} handleTagClick={() => {}} />
    </section>
  );
};

export default Feed;
