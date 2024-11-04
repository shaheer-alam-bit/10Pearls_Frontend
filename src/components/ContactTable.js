import { useState } from "react";
import CreateContactModal from "./CreateContactModal";
import { MdDelete } from "react-icons/md";
import DeleteContactModal from "./DeleteContactModal";
import { LuEye } from "react-icons/lu";
import ContactDetails from "./ContactDetails";
import UpdateContactModal from "./UpdateContactModal";
import axios from "axios";
import { FaFileExport } from "react-icons/fa6";
import { CiImport } from "react-icons/ci";
import { jwtDecode } from "jwt-decode";

const ContactTable = ({
  contactsList,
  pageDetails,
  handleNextPage,
  handlePrevPage,
}) => {
  const [modal, setModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [selectedContact, setSelectedContact] = useState(null);
  const [contactToShow, setContactToShow] = useState(null);
  const [updateContactModal, setUpdateContactModal] = useState(false);
  const [contactToUpdate, setContactToUpdate] = useState(null);
  const [name, setName] = useState("");
  const [dropdown, setDropdown] = useState(false);
  const [searchedContacts, setSearchedContacts] = useState([]);
  const token = localStorage.getItem("token");
  const { user_id } = jwtDecode(token);

  const searchContacts = async (name) => {
    setName(name);

    if (name.length > 0) {
      try {
        const response = await axios.get(
          `http://localhost:8080/search?userId=${user_id}&name=${name}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        if (response.data.success === true) {
          setSearchedContacts(response.data.results);
          setDropdown(response.data.results.length > 0);
        }
      } catch (error) {
        console.error(error);
      }
    } else {
      setSearchedContacts([]);
      setDropdown(false);
    }
  };

  const handleExportContacts = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8080/export/${user_id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          responseType: "blob",
        }
      );

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "contacts.vcf");
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error downloading contacts:", error);
    }
  };

  const handleContactToShow = (contact) => {
    setContactToShow(contact);
  };

  const handleContactToHide = () => {
    setContactToShow(null);
  };

  const handleModalOnClose = () => {
    setModal(false);
  };

  const handleModalOnOpen = () => {
    setModal(true);
  };

  const handleDeleteModalOnClose = () => {
    setDeleteModal(false);
  };

  const handleDeleteModalOnOpen = (contact) => {
    setDeleteModal(true);
    setSelectedContact(contact);
  };

  const handleUpdateContactModalOnClose = () => {
    setUpdateContactModal(false);
  };

  const handleUpdateContactModalOnOpen = (contact) => {
    setContactToUpdate(contact);
    setUpdateContactModal(true);
  };

  return (
    <>
      {contactToShow ? (
        <ContactDetails contact={contactToShow} back={handleContactToHide} />
      ) : (
        <div class="relative flex flex-col w-full h-full text-gray-700 bg-white rounded-xl bg-clip-border">
          <div class="relative mx-4 mt-4 text-gray-700 bg-white rounded-none bg-clip-border">
            <div class="flex items-center justify-end gap-8 mb-8">
              <div class="flex flex-col gap-2 shrink-0 sm:flex-row">
                <button
                  className="flex items-center gap-2 select-none rounded-lg border border-gray-900 py-2 px-4 text-center font-sans text-xs font-bold uppercase text-gray-900 transition-all hover:opacity-75 focus:ring focus:ring-gray-300 active:opacity-85 disabled:pointer-events-none disabled:opacity-50"
                  type="button"
                >
                  <CiImport color="black" size={20} />{" "}
                  <span>Import Contacts</span>
                </button>
                <button
                  className="flex items-center gap-2 select-none rounded-lg border border-gray-900 py-2 px-4 text-center font-sans text-xs font-bold uppercase text-gray-900 transition-all hover:opacity-75 focus:ring focus:ring-gray-300 active:opacity-85 disabled:pointer-events-none disabled:opacity-50"
                  type="button"
                  onClick={handleExportContacts}
                >
                  <FaFileExport color="black" size={20} />{" "}
                  <span>Export Contacts</span>
                </button>
                <button
                  onClick={handleModalOnOpen}
                  class="flex select-none items-center gap-3 rounded-lg bg-gray-900 py-2 px-4 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-gray-900/10 transition-all hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                  type="button"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    aria-hidden="true"
                    stroke-width="2"
                    class="w-4 h-4"
                  >
                    <path d="M6.25 6.375a4.125 4.125 0 118.25 0 4.125 4.125 0 01-8.25 0zM3.25 19.125a7.125 7.125 0 0114.25 0v.003l-.001.119a.75.75 0 01-.363.63 13.067 13.067 0 01-6.761 1.873c-2.472 0-4.786-.684-6.76-1.873a.75.75 0 01-.364-.63l-.001-.122zM19.75 7.5a.75.75 0 00-1.5 0v2.25H16a.75.75 0 000 1.5h2.25v2.25a.75.75 0 001.5 0v-2.25H22a.75.75 0 000-1.5h-2.25V7.5z"></path>
                  </svg>
                  Add Contact
                </button>
              </div>
            </div>
            <div class="flex flex-col items-center justify-between gap-4 md:flex-row">
              <div>
                <p className="text-3xl font-bold text-gray-800 tracking-wide leading-tight">
                  Contacts Directory
                </p>
              </div>
              <div class="w-full md:w-72">
                <div class="relative h-10 w-full min-w-[200px]">
                  <div class="absolute grid w-5 h-5 top-2/4 right-3 -translate-y-2/4 place-items-center text-blue-gray-500">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke-width="1.5"
                      stroke="currentColor"
                      aria-hidden="true"
                      class="w-5 h-5"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                      ></path>
                    </svg>
                  </div>
                  {dropdown && searchedContacts.length > 0 && (
                    <div class="absolute z-50 w-full mt-9 bg-white border border-gray-200 rounded-lg shadow-md">
                      {searchedContacts.map((contact) => (
                        <div
                          key={contact.id}
                          onClick={() => {
                            handleContactToShow(contact);
                            setDropdown(false);
                            
                          }}
                          className="flex space-x-10 items-center p-2 border border-gray-200 hover:bg-gray-100 cursor-pointer"
                        >
                          <img
                            src="https://demos.creative-tim.com/test/corporate-ui-dashboard/assets/img/team-3.jpg"
                            alt="John Michael"
                            class="relative inline-block h-9 w-9 !rounded-full object-cover object-center"
                          />
                          <p>
                            {contact.title} {contact.firstName}{" "}
                            {contact.lastName}
                          </p>
                        </div>
                      ))}
                    </div>
                  )}
                  <input
                    name="name"
                    id="name"
                    type="text"
                    class="peer h-full w-full rounded-[7px] border border-blue-gray-200 border-t-transparent bg-transparent px-3 py-2.5 !pr-9 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-gray-900 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                    value={name}
                    onChange={(e) => searchContacts(e.target.value)}
                    autoComplete="off"
                  />
                  <label class="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none !overflow-visible truncate text-[11px] font-normal leading-tight text-gray-500 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-gray-900 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:!border-gray-900 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:!border-gray-900 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
                    Search By Name
                  </label>
                </div>
              </div>
            </div>
          </div>
          <div class="px-0">
            <table class="w-full mt-6 text-left table-auto min-w-max">
              <thead className="bg-blue-600 text-white">
                <tr>
                  <th class="p-4 transition-all border-y border-blue-gray-200 bg-blue-gray-100/70 hover:bg-blue-gray-200">
                    <p class="flex items-center justify-between gap-2 font-sans text-sm antialiased leading-none text-blue-gray-900">
                      Contact Name
                    </p>
                  </th>
                  <th class="p-4 transition-all border-y border-blue-gray-200 bg-blue-gray-100/70 hover:bg-blue-gray-200">
                    <p class="flex items-center justify-between gap-2 font-sans text-sm antialiased leading-none text-blue-gray-900">
                      Email
                    </p>
                  </th>
                  <th class="p-4 transition-all border-y border-blue-gray-200 bg-blue-gray-100/70 hover:bg-blue-gray-200">
                    <p class="flex items-center justify-between gap-2 font-sans text-sm antialiased leading-none text-blue-gray-900">
                      Phone Number
                    </p>
                  </th>
                  <th class="p-4 transition-all border-y border-blue-gray-200 bg-blue-gray-100/70 hover:bg-blue-gray-200">
                    <p class="flex items-center justify-between gap-2 font-sans text-sm antialiased leading-none text-blue-gray-900">
                      Actions
                    </p>
                  </th>
                </tr>
              </thead>
              <tbody>
                {contactsList.map((contact) => (
                  <tr>
                    <td class="p-4 border-b border-blue-gray-50">
                      <div class="flex items-center gap-3">
                        <img
                          src="https://demos.creative-tim.com/test/corporate-ui-dashboard/assets/img/team-3.jpg"
                          alt="John Michael"
                          class="relative inline-block h-9 w-9 !rounded-full object-cover object-center"
                        />
                        <div class="flex flex-col">
                          <p class="block font-sans text-md antialiased font-normal leading-normal text-blue-gray-900">
                            {contact.title} {contact.firstName}{" "}
                            {contact.lastName}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td class="p-4 border-b border-blue-gray-50">
                      <div class="flex flex-col">
                        <p class="block font-sans text-md antialiased font-normal leading-normal text-blue-gray-900">
                          {contact.personalEmail}
                        </p>
                      </div>
                    </td>
                    <td class="p-4 border-b border-blue-gray-50">
                      <div class="flex flex-col">
                        <p class="block font-sans text-md antialiased font-normal leading-normal text-blue-gray-900">
                          {contact.personalPhoneNumber}
                        </p>
                      </div>
                    </td>
                    <td class="flex space-x-1 p-4 border-b border-blue-gray-50">
                      <button
                        onClick={() => handleContactToShow(contact)}
                        class="relative h-10 max-h-[40px] w-6 max-w-[40px] select-none rounded-lg text-center align-middle font-sans text-xs font-medium uppercase text-gray-900 transition-all hover:bg-gray-900/10 active:bg-gray-900/20 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                        type="button"
                      >
                        <LuEye size={20} color="blue" />
                      </button>
                      <button
                        onClick={() => handleUpdateContactModalOnOpen(contact)}
                        class="relative h-10 max-h-[40px] w-6 max-w-[40px] select-none rounded-lg text-center align-middle font-sans text-xs font-medium uppercase text-gray-900 transition-all hover:bg-gray-900/10 active:bg-gray-900/20 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                        type="button"
                      >
                        <span class="absolute transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                            aria-hidden="true"
                            class="w-4 h-4"
                          >
                            <path d="M21.731 2.269a2.625 2.625 0 00-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 000-3.712zM19.513 8.199l-3.712-3.712-12.15 12.15a5.25 5.25 0 00-1.32 2.214l-.8 2.685a.75.75 0 00.933.933l2.685-.8a5.25 5.25 0 002.214-1.32L19.513 8.2z"></path>
                          </svg>
                        </span>
                      </button>
                      <button
                        onClick={() => handleDeleteModalOnOpen(contact)}
                        class="relative h-10 max-h-[40px] w-6 max-w-[40px] select-none rounded-lg text-center align-middle font-sans text-xs font-medium uppercase text-gray-900 transition-all hover:bg-gray-900/10 active:bg-gray-900/20 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                        type="button"
                      >
                        <MdDelete size={20} color="red" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div class="flex items-center justify-between p-4 border-t border-blue-gray-50">
            <p class="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
              Page {pageDetails.currentPage + 1} of {pageDetails.totalPages}
            </p>
            <div class="flex gap-2">
              <button
                onClick={handlePrevPage}
                disabled={pageDetails.currentPage === 0}
                class="select-none rounded-lg border border-gray-900 py-2 px-4 text-center align-middle font-sans text-xs font-bold uppercase text-gray-900 transition-all hover:opacity-75 focus:ring focus:ring-gray-300 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                type="button"
              >
                Previous
              </button>
              <button
                onClick={handleNextPage}
                disabled={
                  pageDetails.currentPage === pageDetails.totalPages - 1
                }
                class="select-none rounded-lg border border-gray-900 py-2 px-4 text-center align-middle font-sans text-xs font-bold uppercase text-gray-900 transition-all hover:opacity-75 focus:ring focus:ring-gray-300 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                type="button"
              >
                Next
              </button>
            </div>
          </div>
          {modal && <CreateContactModal onClose={handleModalOnClose} />}
          {deleteModal && (
            <DeleteContactModal
              contact={selectedContact}
              onClose={handleDeleteModalOnClose}
            />
          )}
          {updateContactModal && (
            <UpdateContactModal
              contact={contactToUpdate}
              onClose={handleUpdateContactModalOnClose}
            />
          )}
        </div>
      )}
    </>
  );
};

export default ContactTable;
