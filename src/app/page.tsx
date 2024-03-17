"use client";

import { useState } from "react";
import { CreateUserPayload } from "../../server/queries";

export default function Home() {
  const [userData, setUserData] = useState<CreateUserPayload>({
    username: "",
    firstname: "",
    lastname: "",
    email: "",
    password: "",
  });

  const createUser = async (e: React.FormEvent) => {
    e.preventDefault();
    await createUser(userData);
    setUserData({
      username: "",
      firstname: "",
      lastname: "",
      email: "",
      password: "",
    });
  };

  return (
    <>
      <form onSubmit={createUser}>
        <label htmlFor="username">username:</label>
        <input
          type="text"
          id="username"
          placeholder="enter username"
          onChange={(e) =>
            setUserData((prev) => ({ ...prev, username: e.target.value }))
          }
        />
        <label htmlFor="password">password:</label>
        <input
          type="text"
          id="password"
          placeholder="enter password"
          onChange={(e) =>
            setUserData((prev) => ({ ...prev, password: e.target.value }))
          }
        />
        <label htmlFor="email">email:</label>
        <input
          type="text"
          id="email"
          placeholder="enter email"
          onChange={(e) =>
            setUserData((prev) => ({ ...prev, email: e.target.value }))
          }
        />
        <label htmlFor="firstname">firstname:</label>
        <input
          type="text"
          id="firstname"
          placeholder="enter firstname"
          onChange={(e) =>
            setUserData((prev) => ({ ...prev, firstname: e.target.value }))
          }
        />
        <label htmlFor="lastname">lastname:</label>
        <input
          type="text"
          id="lastname"
          placeholder="enter lastname"
          onChange={(e) =>
            setUserData((prev) => ({ ...prev, lastname: e.target.value }))
          }
        />
        <button type="submit">add username</button>
      </form>
    </>
  );
}
