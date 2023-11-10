import { Button, Stack, TextField } from "@mui/material";
import axios from "axios";
import React from "react";
import { toast } from "react-hot-toast";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export default function AddPublication() {
  const user = JSON.parse(localStorage.getItem("user"));
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm();

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (newPost) => {
      return axios.post("http://localhost:3000/posts", newPost);
    },
    onError: (error) => {
      return new Error(error);
    },
    onSuccess: () => {
      reset();
      toast.success("Your post is published");
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
  });

  const onSubmit = async (data) => {
    const publication = {
      ...data,
      idUser: user.id,
      publishDate: new Date(),
      numberOfLike: 0,
      author: user.username,
    };
    mutation.mutate(publication);
  };

  return (
    <Stack width={"50%"} margin={"auto"}>
      <h1>Add a new Post</h1>
      <form
        style={{
          marginTop: 4,
        }}
        onSubmit={handleSubmit(onSubmit)}
      >
        <Stack gap={2}>
          <TextField
            id="filled-basic"
            label="What's new?"
            variant="outlined"
            fullWidth
            size="small"
            multiline
            rows={4}
            {...register("publication", {
              required: "Please enter a valid text",
              minLength: {
                value: 10,
                message: "Please enter more than 5 characters",
              },
            })}
          />
          <TextField
            id="filled-basic"
            label="Choose image"
            variant="outlined"
            fullWidth
            size="small"
            {...register("image", {
              required: "Please enter a url",
            })}
          />
          <Button
            sx={{
              width: "25%",
            }}
            variant="contained"
            type="submit"
          >
            Post
          </Button>
        </Stack>
      </form>
    </Stack>
  );
}
