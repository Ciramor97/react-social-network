import React from "react";
import { Avatar, Box, IconButton, Stack, Typography } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import axios from "axios";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { toast } from "react-hot-toast";

export default function PostCard({ post }) {
  const user = JSON.parse(localStorage.getItem("user"));
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (id) => {
      return axios.delete(`http://localhost:3000/posts/${id}`);
    },
    onError: (error) => {
      return new Error(error);
    },
    onSuccess: () => {
      toast.success("Your post is deleted");
      queryClient.invalidateQueries("posts");
    },
  });

  const deletePost = (id) => {
    mutation.mutate(id);
  };
  return (
    <Box
      width={"100%"}
      bgcolor={"#ffff"}
      borderRadius={4}
      marginBottom={3}
      padding={2}
    >
      <Stack direction={"row"} alignItems={"center"} gap={2}>
        <Avatar src={post.image} />
        <Typography>{post.author}</Typography>
        {user.id === post.idUser && (
          <IconButton aria-label="delete" onClick={() => deletePost(post.id)}>
            <DeleteIcon />
          </IconButton>
        )}
      </Stack>
      <Typography marginTop={2}>{post.publication}</Typography>
      <img
        src={post.image}
        alt="Default image"
        style={{
          width: "100%",
          borderRadius: 4,
        }}
      />
    </Box>
  );
}
