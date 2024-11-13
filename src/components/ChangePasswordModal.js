import axios from "axios";
import { useState } from "react";
import { jwtDecode } from "jwt-decode";
import { NotificationContainer, NotificationManager } from "react-notifications";
import { useNavigate } from "react-router-dom";

const ChangePasswordModal = ({ onClose }) => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const token = localStorage.getItem("token");
  const { sub } = jwtDecode(token);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:8080/changePassword",
        {
          email: sub,
          oldPassword,
          newPassword,
          confirmPassword,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.data.success === true) {
        NotificationManager.success(response.data.message, "Success", 1000);
        onClose();
        navigate("/")
      }
    } catch (error) {
      if (
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
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center">
      <div className="rounded-lg shadow-xl w-full max-w-md">
        <div class="mt-7 bg-white  rounded-xl shadow-lg dark:bg-gray-800 dark:border-gray-700">
          <div class="p-4 sm:p-7">
            <div class="text-center">
              <h1 class="block text-2xl font-bold text-gray-800 dark:text-white">
                Change Password
              </h1>
            </div>

            <div class="mt-5">
              <form>
                <div class="grid gap-y-4">
                  <div>
                    <label
                      for="oldpassword"
                      class="block text-sm font-bold ml-1 mb-2 dark:text-white"
                    >
                      Old Password
                    </label>
                    <div class="relative">
                      <input
                        type="password"
                        id="oldpassword"
                        name="oldpassword"
                        class="py-3 px-4 block w-full border-2 border-gray-200 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 shadow-sm"
                        required
                        placeholder="Enter your old password"
                        onChange={(e) => setOldPassword(e.target.value)}
                      />
                    </div>
                  </div>
                  <div>
                    <label
                      for="newpassword"
                      class="block text-sm font-bold ml-1 mb-2 dark:text-white"
                    >
                      New Password
                    </label>
                    <div class="relative">
                      <input
                        type="password"
                        id="newpassword"
                        name="newpassword"
                        class="py-3 px-4 block w-full border-2 border-gray-200 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 shadow-sm"
                        required
                        placeholder="Enter your new password"
                        onChange={(e) => setNewPassword(e.target.value)}
                      />
                    </div>
                  </div>
                  <div>
                    <label
                      for="confirmpassword"
                      class="block text-sm font-bold ml-1 mb-2 dark:text-white"
                    >
                      Confirm Password
                    </label>
                    <div class="relative">
                      <input
                        type="password"
                        id="confirmpassword"
                        name="confirmpassword"
                        class="py-3 px-4 block w-full border-2 border-gray-200 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 shadow-sm"
                        required
                        placeholder="Re-enter your new password"
                        onChange={(e) => setConfirmPassword(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="flex justify-end space-x-4">
                    <button
                      onClick={onClose}
                      class="py-2 px-4 inline-flex justify-center items-center gap-2 rounded-md border border-transparent font-semibold bg-red-500 text-white hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition-all text-sm dark:focus:ring-offset-gray-800"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleSubmit}
                      type="submit"
                      class="py-2 px-4 inline-flex justify-center items-center gap-2 rounded-md border border-transparent font-semibold bg-blue-500 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all text-sm dark:focus:ring-offset-gray-800"
                    >
                      Submit
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <NotificationContainer/>
    </div>
  );
};

export default ChangePasswordModal;
