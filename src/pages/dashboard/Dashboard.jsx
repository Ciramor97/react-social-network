import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import { Avatar, Box, IconButton, Stack, Typography } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import AddPublication from "./components/AddPublication";
import axios from "axios";
import { useQuery, useMutation } from "@tanstack/react-query";
import PostCard from "./components/PostCard";

export default function Dashboard() {
  const navigate = useNavigate();
  useEffect(() => {
    if (!localStorage.getItem("user")) navigate("/connexion");
  });

  // Queries
  const { data: posts, isLoading } = useQuery({
    queryKey: ["posts"],
    queryFn: () =>
      axios.get("http://localhost:3000/posts").then((res) => res.data),
    onerror: (error) => console.log(error),
  });

  if (isLoading) {
    return <div>Loading data...</div>;
  }

  const postsSorted = posts.sort((a, b) => {
    return new Date(b.publishDate) - new Date(a.publishDate);
  });
  return (
    <Box bgcolor={"#eef4ff"}>
      <Navbar></Navbar>
      <AddPublication></AddPublication>
      <Box width={"60%"} margin={"auto"} marginTop={4}>
        {posts &&
          postsSorted.map((post) => <PostCard post={post} key={post.id} />)}
      </Box>
    </Box>
  );
}
