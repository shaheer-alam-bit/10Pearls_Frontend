import avatar from "../assets/avatar.png";

const ContactDetials = ({ contact, back }) => {
  return (
    <>
      <div class="h-full bg-gray-200 p-8 flex flex-col">
        <button
          onClick={back}
          class="w-24 mb-4 inline-flex items-center border border-indigo-300 px-3 py-1.5 rounded-md text-indigo-500 hover:bg-indigo-50"
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
        </button>
        <div class="bg-white rounded-lg shadow-xl pb-8">
          <div class="w-full h-[250px]">
            <img
              src="https://vojislavd.com/ta-template-demo/assets/img/profile-background.jpg"
              class="w-full h-full rounded-tl-lg rounded-tr-lg"
            />
          </div>
          <div class="flex flex-col items-center -mt-20">
            <img src={avatar} class="w-40 border-4 border-white rounded-full" />
            <div class="flex items-center space-x-2 mt-2">
              <p class="text-2xl">
                {contact.title} {contact.firstName} {contact.lastName}
              </p>
              <span class="bg-blue-500 rounded-full p-1" title="Verified">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="text-gray-100 h-2.5 w-2.5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="4"
                    d="M5 13l4 4L19 7"
                  ></path>
                </svg>
              </span>
            </div>
          </div>
        </div>

        <div class="my-4 flex flex-col 2xl:flex-row space-y-4 2xl:space-y-0 2xl:space-x-4">
          <div class="w-full flex flex-col 2xl:w-1/3">
            <div class="flex-1 bg-white rounded-lg shadow-xl p-8">
              <h4 class="text-xl text-gray-900 font-bold">Personal Info</h4>
              <ul class="mt-2 text-gray-700">
                <li class="flex border-y py-2">
                  <span class="font-bold w-24">Full name</span>
                  <span class="text-gray-700">
                    {contact.firstName} {contact.lastName}
                  </span>
                </li>
                <li class="flex border-b py-2">
                  <span class="font-bold w-24">Personal Contact</span>
                  <span class="text-gray-700 flex items-center">
                    {contact.personalPhoneNumber}
                  </span>
                </li>
                <li class="flex border-b py-2">
                  <span class="font-bold w-24">Home Contact</span>
                  <span class="text-gray-700 flex items-center">
                    {contact.homePhoneNumber}
                  </span>
                </li>
                <li class="flex border-b py-2">
                  <span class="font-bold w-24">Work Contact</span>
                  <span class="text-gray-700 flex items-center">
                    {contact.workPhoneNumber}
                  </span>
                </li>
                <li class="flex border-b py-2">
                  <span class="font-bold w-24">Personal Email</span>
                  <span class="text-gray-700 flex items-center">
                    {contact.personalEmail}
                  </span>
                </li>
                <li class="flex border-b py-2">
                  <span class="font-bold w-24 mr-2">Work Email</span>
                  <span class="text-gray-700 flex items-center">
                    {contact.workEmail}
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ContactDetials;
