"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { createUser } from "../server/queries";

const schema = z.object({
  username: z.string().min(10),
  email: z.string().email(),
  password: z.string().min(8),
  firstname: z.string(),
  lastname: z.string(),
});

type FormFields = z.infer<typeof schema>;

export default function InputForm() {
  const {
    register,
    handleSubmit,
    setError,
    formState: { isSubmitting, errors },
  } = useForm<FormFields>({
    resolver: zodResolver(schema),
  });

  const onSubmit: SubmitHandler<FormFields> = async (data) => {
    try {
      await setTimeout(() => {
        createUser(data);
        console.log(data);
      }, 3000);
      console.log(data);
    } catch (error) {
      setError("root", { message: "Error submitting the data" });
    }
  };

  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col justify-center items-center py-4 space-y-5 mx-auto max-w-full"
      >
        <input
          {...register("username")}
          type="text"
          placeholder="enter your username"
        />
        {errors.username ? (
          <div className="text-red-500 opacity-75">
            {errors.username.message}
          </div>
        ) : (
          <div className="text-sm text-indigo-600 opacity-25">
            Username must be at least 10 Characters!
          </div>
        )}
        <input
          {...register("email")}
          type="text"
          placeholder="enter your email"
        />
        {errors.email ? (
          <div className="text-red-500 opacity-75">{errors.email.message}</div>
        ) : (
          <h6 className="text-sm text-indigo-600 opacity-25">
            enter a valid Email
          </h6>
        )}
        <input
          {...register("password")}
          type="password"
          placeholder="enter your password"
        />
        {errors.password ? (
          <div className="text-red-500 opacity-75">
            {errors.password.message}
          </div>
        ) : (
          <h6 className="text-sm text-indigo-600 opacity-25">
            Password must be at least 8 Characters
          </h6>
        )}
        <input
          {...register("firstname")}
          type="text"
          placeholder="enter your firstname"
        />
        <input
          {...register("lastname")}
          type="text"
          placeholder="enter your lastname"
        />
        <button
          disabled={isSubmitting}
          type="submit"
          className="ring-indigo-400 ring-4 rounded-full "
        >
          {isSubmitting ? <div>Loading...</div> : <div>Submit</div>}
        </button>
        {errors.root && (
          <div className="text-red-500">{errors.root.message}</div>
        )}
      </form>
    </>
  );
}
