import axios from "axios";
import { useState } from "react";
import { jwtDecode } from "jwt-decode";
import {
  NotificationContainer,
  NotificationManager,
} from "react-notifications";

const CreateContactModal = ({ onClose }) => {
  const token = localStorage.getItem("token");
  const decodedToken = jwtDecode(token);
  const userId = decodedToken.user_id;

  const [formData, setFormData] = useState({
    title: "",
    firstName: "",
    lastName: "",
    workEmail: "",
    personalEmail: "",
    homePhoneNumber: "",
    workPhoneNumber: "",
    personalPhoneNumber: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `http://localhost:8080/addContact/${userId}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.data.success === true) {
        onClose();
        NotificationManager.success(response.data.message, "Success", 1000);
        window.location.reload();
      }
    } catch (error) {
      if (error.response && error.response.status === 400) {
        NotificationManager.error(
          Object.values(error.response.data)[0],
          "Error",
          2000
        );
      } else if (
        error.response &&
        (error.response.status === 401 || error.response.status === 404)
      ) {
        NotificationManager.error(error.response.data.message, "Error", 2000);
      } else {
        NotificationManager.error(
          "An unexpected error occurred",
          "Error",
          2000
        );
      }
    }
  };

  return (
    <>
      <div class="fixed inset-0 z-40 min-h-full overflow-y-auto overflow-x-hidden transition flex items-center">
        <div
          aria-hidden="true"
          class="fixed inset-0 w-full h-full bg-black/50 cursor-pointer"
        ></div>

        <div class="relative w-full cursor-pointer pointer-events-none transition my-auto p-4">
          <div class="w-full py-2 bg-white cursor-default pointer-events-auto dark:bg-gray-800 relative rounded-xl mx-auto max-w-sm">
            <button
              onClick={onClose}
              tabindex="-1"
              type="button"
              class="absolute top-2 right-2 rtl:right-auto rtl:left-2"
            >
              <svg
                title="Close"
                tabindex="-1"
                class="h-4 w-4 cursor-pointer text-gray-400"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
              >
                <path
                  fill-rule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clip-rule="evenodd"
                ></path>
              </svg>
              <span class="sr-only">Close</span>
            </button>

            <div class="space-y-2 p-2">
              <div class="p-4 space-y-2 text-center dark:text-white">
                <h2
                  class="text-xl font-bold tracking-tight"
                  id="page-action.heading"
                >
                  Create Contact
                </h2>
                <div x-show="card">
                  <div class="space-y-4">
                    <div class="flex space-x-4">
                      <div class="flex-1">
                        <label
                          class="block text-sm font-medium mb-1"
                          for="firstname"
                        >
                          Title <span class="text-red-500">*</span>
                        </label>
                        <select
                          id="title"
                          name="title"
                          class="text-sm text-gray-800 bg-white border rounded leading-5 py-2 px-3 border-gray-200 hover:border-gray-300 focus:border-indigo-300 shadow-sm w-full"
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              title: e.target.value,
                            })
                          }
                        >
                          <option value="" disabled selected hidden>
                            Select Title
                          </option>
                          <option value="Mr.">Mr.</option>
                          <option value="Mrs.">Mrs.</option>
                        </select>
                      </div>
                      <div class="flex-1">
                        <label
                          class="block text-sm font-medium mb-1"
                          for="firstname"
                        >
                          First Name <span class="text-red-500">*</span>
                        </label>
                        <input
                          id="firstname"
                          name="firstname"
                          class="text-sm text-gray-800 bg-white border rounded leading-5 py-2 px-3 border-gray-200 hover:border-gray-300 focus:border-indigo-300 shadow-sm placeholder-gray-400 focus:ring-0 w-full"
                          type="text"
                          placeholder="Enter First Name"
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              firstName: e.target.value,
                            })
                          }
                        />
                      </div>
                      <div class="flex-1">
                        <label
                          class="block text-sm font-medium mb-1"
                          for="lastname"
                        >
                          Last Name <span class="text-red-500">*</span>
                        </label>
                        <input
                          id="lastname"
                          name="lastname"
                          class="text-sm text-gray-800 bg-white border rounded leading-5 py-2 px-3 border-gray-200 hover:border-gray-300 focus:border-indigo-300 shadow-sm placeholder-gray-400 focus:ring-0 w-full"
                          type="text"
                          placeholder="Enter Last Name"
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              lastName: e.target.value,
                            })
                          }
                        />
                      </div>
                    </div>
                    <div>
                      <label
                        class="block text-sm font-medium mb-1"
                        for="personal-email"
                      >
                        Personal Email <span class="text-red-500">*</span>
                      </label>
                      <input
                        id="personal-email"
                        name="personal-email"
                        class="text-sm text-gray-800 bg-white border rounded leading-5 py-2 px-3 border-gray-200 hover:border-gray-300 focus:border-indigo-300 shadow-sm placeholder-gray-400 focus:ring-0 w-full"
                        type="email"
                        placeholder="Enter Personal Email"
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            personalEmail: e.target.value,
                          })
                        }
                      />
                    </div>

                    <div>
                      <label
                        class="block text-sm font-medium mb-1"
                        for="personal-number"
                      >
                        Personal Contact <span class="text-red-500">*</span>
                      </label>
                      <input
                        id="personal-number"
                        name="personal-number"
                        class="text-sm text-gray-800 bg-white border rounded leading-5 py-2 px-3 border-gray-200 hover:border-gray-300 focus:border-indigo-300 shadow-sm placeholder-gray-400 focus:ring-0 w-full"
                        type="text"
                        placeholder="Enter Personal Number"
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            personalPhoneNumber: e.target.value,
                          })
                        }
                      />
                    </div>

                    <div>
                      <label
                        class="block text-sm font-medium mb-1"
                        for="work-email"
                      >
                        Work Email
                      </label>
                      <input
                        id="work-email"
                        name="work-email"
                        class="text-sm text-gray-800 bg-white border rounded leading-5 py-2 px-3 border-gray-200 hover:border-gray-300 focus:border-indigo-300 shadow-sm placeholder-gray-400 focus:ring-0 w-full"
                        type="email"
                        placeholder="Enter Work Email"
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            workEmail: e.target.value,
                          })
                        }
                      />
                    </div>
                    <div>
                      <label
                        class="block text-sm font-medium mb-1"
                        for="home-number"
                      >
                        Home Contact
                      </label>
                      <input
                        id="home-number"
                        name="home-number"
                        class="text-sm text-gray-800 bg-white border rounded leading-5 py-2 px-3 border-gray-200 hover:border-gray-300 focus:border-indigo-300 shadow-sm placeholder-gray-400 focus:ring-0 w-full"
                        type="text"
                        placeholder="Enter Home Contact"
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            homePhoneNumber: e.target.value,
                          })
                        }
                      />
                    </div>
                    <div>
                      <label
                        class="block text-sm font-medium mb-1"
                        for="work-number"
                      >
                        Work Contact
                      </label>
                      <input
                        id="work-number"
                        name="work-number"
                        class="text-sm text-gray-800 bg-white border rounded leading-5 py-2 px-3 border-gray-200 hover:border-gray-300 focus:border-indigo-300 shadow-sm placeholder-gray-400 focus:ring-0 w-full"
                        type="text"
                        placeholder="Enter Work Contact"
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            workPhoneNumber: e.target.value,
                          })
                        }
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div class="space-y-2">
              <div class="px-6 py-2">
                <div class="grid gap-2 grid-cols-[repeat(auto-fit,minmax(0,1fr))]">
                  <button
                    onClick={onClose}
                    type="button"
                    class="inline-flex items-center justify-center py-1 gap-1 font-medium rounded-lg border transition-colors outline-none focus:ring-offset-2 focus:ring-2 focus:ring-inset dark:focus:ring-offset-0 min-h-[2.25rem] px-4 text-sm text-gray-800 bg-white border-gray-300 hover:bg-gray-50 focus:ring-primary-600 focus:text-primary-600 focus:bg-primary-50 focus:border-primary-600 dark:bg-gray-800 dark:hover:bg-gray-700 dark:border-gray-600 dark:hover:border-gray-500 dark:text-gray-200 dark:focus:text-primary-400 dark:focus:border-primary-400 dark:focus:bg-gray-800"
                  >
                    <span class="flex items-center gap-1">
                      <span class="">Cancel</span>
                    </span>
                  </button>

                  <button
                    onClick={handleSubmit}
                    type="submit"
                    class="inline-flex items-center justify-center py-1 gap-1 font-medium rounded-lg border transition-colors outline-none focus:ring-offset-2 focus:ring-2 focus:ring-inset dark:focus:ring-offset-0 min-h-[2.25rem] px-4 text-sm text-white shadow focus:ring-white border-transparent bg-red-600 hover:bg-red-500 focus:bg-red-700 focus:ring-offset-red-700"
                  >
                    <span class="flex items-center gap-1">
                      <span class="">Confirm</span>
                    </span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <NotificationContainer />
      </div>
    </>
  );
};

export default CreateContactModal;
