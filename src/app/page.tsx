"use client";

import { useState } from "react";
import { CreateUserPayload, createUser } from "../../server/queries";

export default function Home() {
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

  return (
    <>
      <form className="flex flex-col" method="POST" onSubmit={handleCreateUser}>
        <label htmlFor="username">username:</label>
        <input
          type="text"
          id="username"
          placeholder="enter username"
          onChange={handleChange}
        />
        <label htmlFor="password">password:</label>
        <input
          type="text"
          id="password"
          placeholder="enter password"
          onChange={handleChange}
        />
        <label htmlFor="email">email:</label>
        <input
          type="text"
          id="email"
          placeholder="enter email"
          onChange={handleChange}
        />
        <label htmlFor="firstname">firstname:</label>
        <input
          type="text"
          id="firstname"
          placeholder="enter firstname"
          onChange={handleChange}
        />
        <label htmlFor="lastname">lastname:</label>
        <input
          type="text"
          id="lastname"
          placeholder="enter lastname"
          onChange={handleChange}
        />
        <button type="submit" className="border ring-indigo-400 ring-2">
          add username
        </button>
      </form>
    </>
  );
}
