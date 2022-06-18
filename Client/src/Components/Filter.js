/* This example requires Tailwind CSS v2.0+ */
import { Fragment,useEffect,useState } from "react";
import { Menu, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/solid";
import { useDispatch,useSelector } from 'react-redux'

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Filter() {
    const dispatch = useDispatch();
    const selector = useSelector(state => state.users.invoiceStatus);

   
    const clickOne = (value) => {
        dispatch({type:'INVOICE_STATUS',payload:{stus:value}})

    }

    return (
    <Menu as="div" className="relative inline-block text-left">
      <div>
        <Menu.Button className="inline-flex justify-center w-full rounded-md shadow-sm px-4 py-2 text-sm font-medium text-white hover:text-gray-700 focus:outline-none  ">
          Filter By Status
          <ChevronDownIcon className="-mr-1 ml-2 h-5 w-5" aria-hidden="true" />
        </Menu.Button>
      </div>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="origin-top-right absolute right-0 mt-2 w-40 rounded-md shadow-lg bg-[#252945] ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="py-1">
            <div class="form-check p-3">
              <input
                class="form-check-input appearance-none h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
                type="checkbox"
                checked={selector ==="Paid"}
                id="flexCheckDefault"
                onChange={() => clickOne("Paid")}
              />
              <label
                class="form-check-label inline-block text-white"
                for="flexCheckDefault"
              >
                Paid
              </label>
            </div>
            <div class="form-check p-3">
              <input
                class="form-check-input appearance-none h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
                type="checkbox"
                checked={selector ==="Pending"}
                id="flexCheckDefault1"
                onChange={() => clickOne("Pending")}
              />
              <label
                class="form-check-label inline-block text-white"
                for="flexCheckDefault"
              >
                Pending
              </label>
            </div>
            <div class="form-check p-3">
              <input
                class="form-check-input appearance-none h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
                type="checkbox"
                checked={selector === "All"}
                id="flexCheckDefault2"
                onChange={() => clickOne("All")}
              />
              <label
                class="form-check-label inline-block text-white"
                for="flexCheckDefault2"
              >
                All
              </label>
            </div>
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
}
