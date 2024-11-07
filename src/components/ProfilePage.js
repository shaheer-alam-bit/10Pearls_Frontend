import { useEffect, useState } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

const ProfilePage = () => {
  const token = localStorage.getItem("token");
  const { user_id } = jwtDecode(token);
  const [response, setResponse] = useState({});

  const getProfile = async () => {
    const res = await axios.post(
      `http://localhost:8080/getDetails/${user_id}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    setResponse(res.data);
  };

  useEffect(() => {
    getProfile();
  });

  return (
    <div>
      <div className="flex p-4">
        <a
          href="/dashboard"
          class="inline-flex items-center border border-indigo-300 px-3 py-1.5 rounded-md text-indigo-500 hover:bg-indigo-50"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            class="h-6 w-6"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M7 16l-4-4m0 0l4-4m-4 4h18"
            ></path>
          </svg>
          <span class="ml-1 font-bold text-lg">Back</span>
        </a>
      </div>

      <header class="px-2 py-4 mt-16 flex flex-col justify-center items-center text-center">
        <img
          class="inline-flex object-cover border-4 border-indigo-600 rounded-full shadow-[5px_5px_0_0_rgba(0,0,0,1)] shadow-indigo-600/100 bg-indigo-50 text-indigo-600 h-24 w-24 !h-48 !w-48"
          src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&amp;ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;auto=format&amp;fit=crop&amp;w=1480&amp;q=80"
          alt=""
        />
        <h1 class="text-2xl text-gray-500 font-bold mt-2">
          {response.firstName} {response.lastName}
        </h1>
        <h2 class="text-base md:text-xl text-blue-500 font-bold">
          {response.email}
        </h2>
      </header>
    </div>
  );
};

export default ProfilePage;
