import { Box, Button, Stack, TextField, Typography } from "@mui/material";
import React from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import axios from "axios";
export default function Inscription() {
  const navigate = useNavigate();
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    if (data.password != data.confirmPassword) {
      toast.error("Passwords don't match");
    } else {
      axios
        .get(`http://localhost:3000/users?email=${data.email}`)
        .then((res) => {
          if (res.data.length > 0) toast.error("User already exist");
          else {
            try {
              axios.post("http://localhost:3000/users", data);
              toast.success("Register successfully");
              setTimeout(() => {
                navigate("/connexion");
              }, 1000);
            } catch (error) {
              return new Error(error);
            }
          }
        });
    }
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
        {/* replace inscription by Register */}
        <Typography variant="h5">Inscription</Typography>
        <form
          style={{
            marginTop: 4,
          }}
          onSubmit={handleSubmit(onSubmit)}
        >
          <Stack direction={"column"} gap={2}>
            <TextField
              id="filled-basic"
              label="Name"
              variant="outlined"
              fullWidth
              size="small"
              {...register("username", {
                required: "Please enter our username",
                minLength: {
                  value: 5,
                  message: "Username must be more than 5 characters",
                },
              })}
            />
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
            <TextField
              id="filled-basic"
              label="Confirm password"
              variant="outlined"
              fullWidth
              size="small"
              type="password"
              {...register("confirmPassword", {
                required: "Please confirm your password",
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
            Inscription
          </Button>
        </form>
      </Box>
    </Stack>
  );
}
