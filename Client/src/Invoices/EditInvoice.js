/* This example requires Tailwind CSS v2.0+ */
import { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { XIcon, TrashIcon } from "@heroicons/react/outline";
import {
  Formik,
  Field,
  Form,
  ErrorMessage,
  FieldArray,
  useField,
  useFormikContext,
} from "formik";
import { useDispatch, useSelector } from "react-redux";
import { validationSchema } from "../Components/ValidationSchema";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const DatePickerField = ({ ...props }) => {
  const { setFieldValue } = useFormikContext();
  const [field] = useField(props);
  var inputStylee =
    "mt-1 bg-[#1f213a] text-white focus:ring-[#1f213a] focus:border-white block w-full shadow-sm sm:text-sm border-[#1f213a] rounded-md py-2 px-3 ";
  return (
    <DatePicker
      {...field}
      {...props}
      selected={(field.value && new Date(field.value)) || null}
      onChange={(val) => {
        setFieldValue(field.name, val);
      }}
      className={inputStylee}
    />
  );
};
export default function EditInvoice() {
  const inputStyle =
    "mt-1 bg-[#1f213a] text-white focus:ring-[#1f213a] focus:border-white block w-full shadow-sm sm:text-sm border-[#1f213a] rounded-sm py-2 px-3 ";
  const labelStyle = "block text-sm font-medium text-[#bcbcc5]";
  const dispatch = useDispatch();
  const value = useSelector((state) => state);
  const data = value.users.editObj;
  // console.log(value)
  const hideModel = () => {
    dispatch({ type: "EDIT_INVOICE", payload: { drawer: false, obj: data } });
  };

  const postData = async (values) => {
    console.log("values", values);
    const response = await fetch(
      `http://localhost:4000/invoice/update/${value.users.deleteId}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      }
    ).then((res) => res.json());
    dispatch({
      type: "EDIT_INVOICE",
      payload: { drawer: false, obj: values, id: value.users.deleteId },
    });

    return console.log("Response", response);
  };

  // console.log("data",data)
  if (data == undefined) {
    var initialValues = {
      invoiceNumber: "",
      bill_from_street_address: "",
      bill_from_city: "",
      bill_from_post_code: "",
      bill_from_country: "",
      bill_to_client_name: "",
      bill_to_client_email: "",
      bill_to_client_address: "",
      bill_to_client_city: "",
      bill_to_client_post_code: "",
      bill_to_client_country: "",
      bill_to_client_invoice_date: "",
      bill_to_client_payment_terms: "",
      bill_to_client_project_description: "",
      invoice_status: "",
      items: [
        {
          itemName: "",
          qty: "",
          price: "",
        },
      ],
    };
  } else {
    var initialValues = {
      invoiceNumber: data.invoiceNumber,
      bill_from_street_address: data.bill_from_street_address,
      bill_from_city: data.bill_from_city,
      bill_from_post_code: data.bill_from_post_code,
      bill_from_country: data.bill_from_country,
      bill_to_client_name: data.bill_to_client_name,
      bill_to_client_email: data.bill_to_client_email,
      bill_to_client_address: data.bill_to_client_address,
      bill_to_client_city: data.bill_to_client_city,
      bill_to_client_post_code: data.bill_to_client_post_code,
      bill_to_client_country: data.bill_to_client_country,
      bill_to_client_invoice_date: data.bill_to_client_invoice_date,
      bill_to_client_payment_terms: data.bill_to_client_payment_terms,
      bill_to_client_project_description:
        data.bill_to_client_project_description,
      invoice_status: "Pending",
      items: data.items,
    };
  }

  return (
    <>
      <Transition.Root show={value.users.edit} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={() => hideModel()}>
          <Transition.Child
            as={Fragment}
            enter="ease-in-out duration-500"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in-out duration-500"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-hidden">
            <div className="absolute inset-0 overflow-hidden">
              <div className="pointer-events-none fixed inset-y-0 left-0 flex max-w-full ">
                <Transition.Child
                  as={Fragment}
                  enter="transform transition ease-in-out duration-500 sm:duration-700"
                  enterFrom="-translate-x-full"
                  enterTo="-translate-x-0"
                  leave="transform transition ease-in-out duration-500 sm:duration-700"
                  leaveFrom="-translate-x-100"
                  leaveTo="-translate-x-full"
                >
                  <Dialog.Panel className="pointer-events-auto w-screen max-w-2xl">
                    <div className="flex h-full flex-col overflow-y-scroll bg-[#141625] shadow-xl">
                      <div className="">
                        <div className="flex items-start justify-between">
                          <Dialog.Title className="text-lg font-medium text-gray-900">
                            {" "}
                            Shopping cart{" "}
                          </Dialog.Title>
                          <div className="ml-3 flex h-7 items-center">
                            <button
                              type="button"
                              className="-m-2 p-2 text-gray-400 hover:text-gray-500"
                              onClick={() => hideModel()}
                            >
                              <span className="sr-only">Close panel</span>
                              <XIcon className="h-6 w-6" aria-hidden="true" />
                            </button>
                          </div>
                        </div>

                        <div className="mt-10 sm:mt-0">
                          <div className="">
                            <div className="mt-5 md:mt-0 md:col-span-2">
                              {/* <form action="#" method="POST"> */}
                              <div className="shadow overflow-hidden sm:rounded-md">
                                <div className="px-4 py-5 bg-[#141625] sm:p-6">
                                  <p className=" text-indigo-800 text-xl">
                                    Bill To
                                  </p>
                                  <Formik
                                    validationSchema={validationSchema}
                                    initialValues={initialValues}
                                    enableReinitialize
                                    onSubmit={(values, { resetForm }) => {
                                      postData(values);
                                      // console.log("values",values);

                                      resetForm({ values: "" });
                                    }}
                                  >
                                    {({
                                      values,
                                      touched,
                                      errors,
                                      dirty,
                                      isSubmitting,
                                      handleChange,
                                      handleBlur,
                                      handleSubmit,
                                      handleReset,
                                    }) => (
                                      <Form>
                                        <div className="grid grid-cols-6 gap-6">
                                          <div className="col-span-6">
                                            <label
                                              htmlFor="street-address"
                                              className={labelStyle}
                                            >
                                              Street address
                                            </label>
                                            <input
                                              type="text"
                                              name="bill_from_street_address"
                                              className={inputStyle}
                                              id="bill_from_street_address"
                                              value={
                                                values.bill_from_street_address
                                              }
                                              onChange={handleChange}
                                              onBlur={handleBlur}
                                            />
                                            {errors.bill_from_street_address ? (
                                              <div className="text-[#ff1818]">
                                                * Street Address{" "}
                                                {
                                                  errors.bill_from_street_address
                                                }
                                              </div>
                                            ) : null}
                                          </div>
                                          <div className="col-span-6 sm:col-span-6 lg:col-span-2">
                                            <label
                                              htmlFor="city"
                                              className={labelStyle}
                                            >
                                              City
                                            </label>
                                            <input
                                              type="text"
                                              name="bill_from_city"
                                              className={inputStyle}
                                              id="bill_form_city"
                                              value={values.bill_from_city}
                                              onChange={handleChange}
                                              onBlur={handleBlur}
                                            />
                                            {errors.bill_from_city ? (
                                              <div className="text-[#ff1818]">
                                                * City {errors.bill_from_city}
                                              </div>
                                            ) : null}
                                          </div>

                                          <div className="col-span-6 sm:col-span-3 lg:col-span-2">
                                            <label
                                              htmlFor="region"
                                              className={labelStyle}
                                            >
                                              Post Code
                                            </label>
                                            <input
                                              type="text"
                                              name="bill_from_post_code"
                                              className={inputStyle}
                                              id="bill_from_post_code"
                                              value={values.bill_from_post_code}
                                              onChange={handleChange}
                                              onBlur={handleBlur}
                                            />

                                            {errors.bill_from_post_code ? (
                                              <div className="text-[#ff1818]">
                                                * Post Code{" "}
                                                {errors.bill_from_post_code}
                                              </div>
                                            ) : null}
                                          </div>

                                          <div className="col-span-6 sm:col-span-3 lg:col-span-2">
                                            <label
                                              htmlFor="postal-code"
                                              className={labelStyle}
                                            >
                                              Country
                                            </label>
                                            <input
                                              type="text"
                                              name="bill_from_country"
                                              className={inputStyle}
                                              id="bill_from_country"
                                              value={values.bill_from_country}
                                              onChange={handleChange}
                                              onBlur={handleBlur}
                                            />
                                            {errors.bill_from_country ? (
                                              <div className="text-[#ff1818]">
                                                * Country{" "}
                                                {errors.bill_from_country}
                                              </div>
                                            ) : null}
                                          </div>

                                          <br />

                                          <div className="col-span-6">
                                            <label
                                              htmlFor="street-address"
                                              className={labelStyle}
                                            >
                                              Client Name
                                            </label>
                                            <input
                                              type="text"
                                              name="bill_to_client_name"
                                              className={inputStyle}
                                              id="bill_to_client_name"
                                              value={values.bill_to_client_name}
                                              onChange={handleChange}
                                              onBlur={handleBlur}
                                            />
                                            {errors.bill_to_client_name ? (
                                              <div className="text-[#ff1818]">
                                                * Client Name{" "}
                                                {errors.bill_to_client_name}
                                              </div>
                                            ) : null}
                                          </div>

                                          <div className="col-span-6">
                                            <label
                                              htmlFor="street-address"
                                              className={labelStyle}
                                            >
                                              Client Email
                                            </label>
                                            <input
                                              type="text"
                                              name="bill_to_client_email"
                                              className={inputStyle}
                                              id="bill_to_client_email"
                                              value={
                                                values.bill_to_client_email
                                              }
                                              onChange={handleChange}
                                              onBlur={handleBlur}
                                            />
                                            {errors.bill_to_client_email ? (
                                              <div className="text-[#ff1818]">
                                                * Email{" "}
                                                {errors.bill_to_client_email}
                                              </div>
                                            ) : null}
                                          </div>

                                          <div className="col-span-6">
                                            <label
                                              htmlFor="street-address"
                                              className={labelStyle}
                                            >
                                              Client address
                                            </label>
                                            <input
                                              type="text"
                                              name="bill_to_client_address"
                                              className={inputStyle}
                                              id="bill_to_client_address"
                                              value={
                                                values.bill_to_client_address
                                              }
                                              onChange={handleChange}
                                              onBlur={handleBlur}
                                            />
                                            {errors.bill_to_client_address ? (
                                              <div className="text-[#ff1818]">
                                                * Address{" "}
                                                {errors.bill_to_client_address}
                                              </div>
                                            ) : null}
                                          </div>

                                          <div className="col-span-6 sm:col-span-6 lg:col-span-2">
                                            <label
                                              htmlFor="city"
                                              className={labelStyle}
                                            >
                                              City
                                            </label>
                                            <input
                                              type="text"
                                              name="bill_to_client_city"
                                              className={inputStyle}
                                              id="bill_to_client_city"
                                              value={values.bill_to_client_city}
                                              onChange={handleChange}
                                              onBlur={handleBlur}
                                            />
                                            {errors.bill_to_client_city ? (
                                              <div className="text-[#ff1818]">
                                                * City{" "}
                                                {errors.bill_to_client_city}
                                              </div>
                                            ) : null}
                                          </div>

                                          <div className="col-span-6 sm:col-span-3 lg:col-span-2">
                                            <label
                                              htmlFor="region"
                                              className={labelStyle}
                                            >
                                              Post Code
                                            </label>
                                            <input
                                              type="text"
                                              name="bill_to_client_post_code"
                                              className={inputStyle}
                                              id="bill_to_client_post_code"
                                              value={
                                                values.bill_to_client_post_code
                                              }
                                              onChange={handleChange}
                                              onBlur={handleBlur}
                                            />
                                            {errors.bill_to_client_post_code ? (
                                              <div className="text-[#ff1818]">
                                                *
                                                {
                                                  errors.bill_to_client_post_code
                                                }
                                              </div>
                                            ) : null}
                                          </div>

                                          <div className="col-span-6 sm:col-span-3 lg:col-span-2">
                                            <label
                                              htmlFor="postal-code"
                                              className={labelStyle}
                                            >
                                              Country
                                            </label>
                                            <input
                                              type="text"
                                              name="bill_to_client_country"
                                              className={inputStyle}
                                              id="bill_to_client_country"
                                              value={
                                                values.bill_to_client_country
                                              }
                                              onChange={handleChange}
                                              onBlur={handleBlur}
                                            />
                                            {errors.bill_to_client_country ? (
                                              <div className="text-[#ff1818]">
                                                * Country{" "}
                                                {errors.bill_to_client_country}
                                              </div>
                                            ) : null}
                                          </div>

                                          <div className="col-span-6 sm:col-span-3">
                                            <label
                                              htmlFor="first-name"
                                              className={labelStyle}
                                            >
                                              Invoice Date
                                            </label>

                                            <DatePickerField name="bill_to_client_invoice_date" />
                                          </div>

                                          <div className="col-span-6 sm:col-span-3">
                                            <label
                                              htmlFor="country"
                                              className={labelStyle}
                                            >
                                              Payment Terms
                                            </label>
                                            <select
                                              name="bill_to_client_payment_terms"
                                              className={inputStyle}
                                              id="bill_to_client_payment_terms"
                                              value={
                                                values.bill_to_client_payment_terms
                                              }
                                              onChange={handleChange}
                                              onBlur={handleBlur}
                                            >
                                              <option value={""}>
                                                Select...
                                              </option>
                                              <option>Net 30 Days</option>
                                              <option>Net 15 Days</option>
                                              <option>Net 10 Days</option>
                                            </select>
                                          </div>

                                          <div className="col-span-6">
                                            <label
                                              htmlFor="street-address"
                                              className={labelStyle}
                                            >
                                              Project Description
                                            </label>
                                            <input
                                              type="text"
                                              name="bill_to_client_project_description"
                                              className={inputStyle}
                                              id="bill_to_client_project_description"
                                              value={
                                                values.bill_to_client_project_description
                                              }
                                              onChange={handleChange}
                                              onBlur={handleBlur}
                                            />
                                            {errors.bill_to_client_project_description ? (
                                              <div className="text-[#ff1818]">
                                                * Description{" "}
                                                {
                                                  errors.bill_to_client_project_description
                                                }
                                              </div>
                                            ) : null}
                                          </div>

                                          <div className="col-span-6">
                                            Items
                                          </div>
                                        </div>

                                        <div>
                                          {" "}
                                          <FieldArray name="items">
                                            {({ insert, remove, push }) => (
                                              <div>
                                                {values.items.length > 0 &&
                                                  values.items.map(
                                                    (friend, index) => (
                                                      <div
                                                        key={index}
                                                        className=" md:flex md:flex-row"
                                                      >
                                                        <div className="mr-3  whitespace-nowrap ">
                                                          <label
                                                            htmlFor="city"
                                                            className={
                                                              labelStyle
                                                            }
                                                          >
                                                            Item Name
                                                          </label>

                                                          <Field
                                                            name={`items.${index}.itemName`}
                                                            type="text"
                                                            className={`${inputStyle} md:w-[200px] w-full`}
                                                          />
                                                          <ErrorMessage
                                                            name={`items.${index}.itemName`}
                                                            component="div"
                                                            className="field-error text-[#ff1818]"
                                                          />
                                                        </div>
                                                        <div className="flex flex-row md:flex-none">
                                                          <div className="w-1/5 mr-3 ">
                                                            <label
                                                              htmlFor="city"
                                                              className={
                                                                labelStyle
                                                              }
                                                            >
                                                              Qty
                                                            </label>

                                                            <Field
                                                              name={`items.${index}.qty`}
                                                              type="text"
                                                              className={`${inputStyle} `}
                                                            />
                                                            <ErrorMessage
                                                              name={`items.${index}.qty`}
                                                              component="div"
                                                              className="field-error text-[#ff1818]"
                                                            />
                                                          </div>
                                                          <div className="w-1/3 mr-3">
                                                            <label
                                                              htmlFor="city"
                                                              className={
                                                                labelStyle
                                                              }
                                                            >
                                                              Price
                                                            </label>

                                                            <Field
                                                              name={`items.${index}.price`}
                                                              type="text"
                                                              className={`${inputStyle}`}
                                                            />
                                                            <ErrorMessage
                                                              name={`items.${index}.price`}
                                                              component="div"
                                                              className="field-error text-[#ff1818]"
                                                            />
                                                          </div>
                                                          <div className="">
                                                            <label
                                                              htmlFor="city"
                                                              className={
                                                                labelStyle
                                                              }
                                                            >
                                                              Total
                                                            </label>

                                                            <p className="text-white font-bold pt-2">
                                                              {values.items[
                                                                index
                                                              ].qty *
                                                                values.items[
                                                                  index
                                                                ].price}
                                                            </p>
                                                          </div>
                                                          <div className="col p-2.5">
                                                            {index !== 0 ? (
                                                              <TrashIcon
                                                                onClick={() =>
                                                                  remove(index)
                                                                }
                                                                className="h-6 w-6 text-[#4f5169] hover:text-red-600 focus:text-[#d8d8d8] mt-4 cursor-pointer"
                                                                aria-hidden="true"
                                                              />
                                                            ) : (
                                                              <div className='className="h-6 w-6 mt-6"'></div>
                                                            )}
                                                          </div>
                                                        </div>
                                                      </div>
                                                    )
                                                  )}
                                                <button
                                                  type="button"
                                                  className=" bg-slate-700 w-full mt-7 text-center p-3.5 rounded-full text-white cursor-pointer"
                                                  onClick={() =>
                                                    push({
                                                      itemName: "",
                                                      qty: "",
                                                      price: "",
                                                    })
                                                  }
                                                >
                                                  + Add Item
                                                </button>
                                              </div>
                                            )}
                                          </FieldArray>
                                        </div>
                                        {/* <button type="submit">Invite</button> */}

                                        <div className="flex flex-row justify-end">
                                          <div className="px-4 py-3 bg-[#141625] text-right sm:px-6">
                                            <button
                                              onClick={() => hideModel()}
                                              className="inline-flex justify-center py-4 px-8 border border-transparent shadow-sm text-sm font-medium rounded-full text-white bg-[#3f3f3f] hover:bg-[#272626] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                            >
                                              Cancel
                                            </button>
                                          </div>
                                          <div className="px-4 py-3 bg-[#141625] text-right sm:px-6">
                                            <button
                                              // onClick={() => handleSubmit()}
                                              type="submit"
                                              className="inline-flex justify-center py-4 px-8 border border-transparent shadow-sm text-sm font-medium rounded-full text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                            >
                                              Save Changes
                                            </button>
                                          </div>
                                        </div>
                                      </Form>
                                    )}
                                  </Formik>
                                </div>
                              </div>
                              {/* </form> */}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
    </>
  );
}
