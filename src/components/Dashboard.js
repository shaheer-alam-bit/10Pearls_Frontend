import { useEffect, useState } from "react";
import axios from "axios";
import { NotificationManager } from "react-notifications";
import { jwtDecode } from "jwt-decode";
import ContactTable from "./ContactTable";

const Dashboard = () => {
  const [contacts, setContacts] = useState([]);
  const [pageDetails, setPageDetails] = useState({
    currentPage: 0,
    totalPages: 0,
    totalItems: 0,
  });
  const token = localStorage.getItem("token");
  const decodedToken = jwtDecode(token);
  const userId = decodedToken.user_id;

  const fetchMyContacts = async () => {
    try {
      const response = await axios.post(
        `http://localhost:8080/getContactsById?page=${pageDetails.currentPage}`,
        {
          id: userId,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.data.success === true) {
        setPageDetails({
          currentPage: response.data.currentPage,
          totalPages: response.data.totalPages,
          totalItems: response.data.totalItems,
        });
        setContacts(response.data.contactDetailsList);
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

  useEffect(() => {
    fetchMyContacts();
  }, [pageDetails.currentPage]);

  const handleNextPage = () => {
    if (pageDetails.currentPage < pageDetails.totalPages - 1) {
      setPageDetails((prev) => ({
        ...prev,
        currentPage: prev.currentPage + 1,
      }));
    }
  };

  const handlePrevPage = () => {
    if (pageDetails.currentPage > 0) {
      setPageDetails((prev) => ({
        ...prev,
        currentPage: prev.currentPage - 1,
      }));
    }
  };

  return (
    <>
      <ContactTable
        contactsList={contacts}
        pageDetails={pageDetails}
        handleNextPage={handleNextPage}
        handlePrevPage={handlePrevPage}
      />
    </>
  );
};

export default Dashboard;
