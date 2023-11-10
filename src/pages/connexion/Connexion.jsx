import { Box, Button, Stack, TextField, Typography } from "@mui/material";
import React from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useEffect } from "react";
export default function Connexion() {
  const navigate = useNavigate();
  useEffect(() => {
    if (localStorage.getItem("user")) navigate("/");
  });
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    axios
      .get(
        `http://localhost:3000/users?email=${data.email}&password=${data.password}`
      )
      .then((res) => {
        if (res.data.length > 0) {
          localStorage.setItem("user", JSON.stringify(res.data[0]));
          toast.success("Login succesfully");
          setTimeout(() => {
            navigate("/");
          }, 1000);
        } else {
          toast.error("Credentials are incorrect");
        }
      });
  };
  return (
    <Stack
      alignItems={"center"}
      justifyContent={"center"}
      width={"100%"}
      height={"100vh"}
      backgroundColor={"#f5f5f5"}
    >
      <Box
        width={400}
        sx={{
          backgroundColor: "#fff",
          padding: 3,
        }}
      >
        <Typography variant="h5">Login</Typography>
        <form
          style={{
            marginTop: 4,
          }}
          onSubmit={handleSubmit(onSubmit)}
        >
          <Stack direction={"column"} gap={2}>
            <TextField
              id="filled-basic"
              label="Email"
              variant="outlined"
              fullWidth
              size="small"
              type="email"
              {...register("email", {
                required: "Please enter our username",
                pattern: "/^w+([.-]?w+)*@w+([.-]?w+)*(.w{2,3})+$/",
              })}
            />
            <TextField
              id="filled-basic"
              label="Password"
              variant="outlined"
              fullWidth
              size="small"
              type="password"
              {...register("password", {
                required: "Please enter our password",
                minLength: {
                  value: 6,
                  message: "Password must be more than 6 characters",
                },
              })}
            />
          </Stack>
          <Button
            sx={{
              marginTop: 2,
            }}
            variant="contained"
            type="submit"
          >
            Login
          </Button>
          <Typography paddingTop={2}>
            You don't have account? <Link to="/inscription">Click here</Link>
          </Typography>
        </form>
      </Box>
    </Stack>
  );
}
