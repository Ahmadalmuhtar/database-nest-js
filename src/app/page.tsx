"use client";

import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { CreateUserPayload, createUser } from "../../server/queries";
import { resolve } from "path";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
  username: z.string(),
  firstname: z.string(),
  lastname: z.string(),
});

type FormFields = z.infer<typeof schema>;

export default function Home() {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<FormFields>({
    defaultValues: {
      email: "test@email.com",
      username: "Ahmad Naser Almuhtar",
      password: "12345678",
    },
    resolver: zodResolver(schema),
  });

  const initialState = {
    username: "",
    firstname: "",
    lastname: "",
    email: "",
    password: "",
  };

  const [userData, setUserData] = useState<CreateUserPayload>(initialState);

  const handleCreateUser = async (e: React.FormEvent) => {
    e.preventDefault();
    await createUser(userData);
    setUserData(initialState);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserData((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const onSubmit: SubmitHandler<FormFields> = async (data) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      console.log(data);
    } catch (error) {
      setError("root", { message: "email is taken" });
    }
  };

  return (
    <>
      <form
        className="flex flex-col max-w-full mx-auto justify-center items-center space-y-1 text-center"
        method="POST"
        onSubmit={handleSubmit(onSubmit)}
      >
        <label htmlFor="username">username:</label>
        <input
          {...register("username", { required: true })}
          className="ring-1 ring-black"
          type="text"
          id="username"
        />
        {errors.username && (
          <div className="text-red-600">{errors.username.message}</div>
        )}
        <label htmlFor="password">password:</label>
        <input
          {...register("password")}
          className="ring-1 ring-black"
          type="password"
          id="password"
        />
        {errors.password && (
          <div className="text-red-600">{errors.password.message}</div>
        )}
        <label htmlFor="email">email:</label>
        <input
          {...register("email")}
          className="ring-1 ring-black"
          type="text"
          id="email"
        />
        {errors.email && (
          <div className="text-red-600">{errors.email.message}</div>
        )}
        <label htmlFor="firstname">firstname:</label>
        <input
          {...register("firstname")}
          className="ring-1 ring-black"
          type="text"
          id="firstname"
        />
        <label htmlFor="lastname">lastname:</label>
        <input
          {...register("lastname")}
          className="ring-1 ring-black"
          type="text"
          id="lastname"
        />
        <div className="pt-4">
          <button
            disabled={isSubmitting}
            type="submit"
            className="border ring-indigo-400 ring-2"
          >
            {isSubmitting ? "Loading..." : "Create"}
          </button>
          {errors.root && (
            <div className="text-red-600">{errors.root.message}</div>
          )}
        </div>
      </form>
    </>
  );
}
