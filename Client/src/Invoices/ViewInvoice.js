import { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import "../App.css";
import { useLocation, useNavigate } from "react-router-dom";

export default function Invoice() {
  const { state } = useLocation();
  const [data, setData] = useState({});
  const [effect, setEffect] = useState();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const obj = useSelector((state) => state);
  if (obj) {
    // var set = obj.users.editObj.invoice_status
  } else {
    var set = "";
  }
  const deleteInvoice = () => {
    dispatch({ type: "DELETE_ALERT", payload: { show: true, id: state._id } });
  };
  const editInvoice = () => {
    dispatch({
      type: "EDIT_INVOICE",
      payload: { drawer: true, obj: data, id: state._id },
    });
  };
  const goback = () => {
    navigate(`/`);
  };

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
    bill_to_client_project_description: data.bill_to_client_project_description,
    invoice_status: "Paid",
    items: data.items,
  };

  useEffect(() => {
    axios
      .post("http://localhost:4000/invoice/get/" + state._id)
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.log("Error", error);
      });
    // setPaid()
  }, [effect, initialValues]);

  const setPaid = async () => {
    const response = await fetch(
      `http://localhost:4000/invoice/update/${data._id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(initialValues),
      }
    );
    // dispatch({type:"EDIT_INVOICE",payload:{drawer:true,obj:values}})
    // navigate(`/invoice/view/${data.invoiceNumber}`);
    return console.log(response);
  };
  if (data.items) {
    var sum = data.items.reduce((accumulator, object) => {
      return accumulator + object.qty * object.price;
    }, 0);
  }

  return (
    <>
      <div className="flex flex-row bg-[#141625] ">
        <div className=" lg:bg-indigo-600 lg:w-[5rem] rounded-r-2xl">
          <div className="  py-3 px-3 sm:px-6 lg:px-8"></div>
        </div>
        <div className="basis-[1%] md:basis-[10%] lg:basis-1/5"></div>
        <div className="basis-[70%] mt-10 lg:basis-1/2">
          <p
            className="cursor-pointer mb-5 px-6 py-2 border border-transparent shadow-sm text-sm font-bold rounded-full text-white bg-[#7c5dfa] hover:bg-[#5c3be2] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 mx-2 transition inline-block"
            onClick={() => goback()}
          >
            Go Back
          </p>
          <div className=" w-full flex flex-col  md:flex-row justify-between mb-8 bg-[#1e2139] p-5 rounded-md">
            <div className="flex flex-row m-1.5">
              <span className="text-indigo-500 font-bold pt-3 ">Status</span>
              <p className="bg-green-300/[.06]  w-max rounded-md p-2 px-2 text-[#58cfb6] m-1.5 ml-4">
                ● {data.invoice_status}
              </p>
            </div>
            <div className="w-full flex md:flex justify-end items-center">
              <div
                onClick={() => editInvoice()}
                className="cursor-pointer flex justify-center items-center px-6 py-2 border border-transparent shadow-sm text-sm font-bold rounded-full text-white bg-[#3f3f3f] hover:bg-[#272626] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 mx-2"
              >
                Edit
              </div>
              <div
                onClick={() => deleteInvoice()}
                className="cursor-pointer flex justify-center items-center px-6 py-2 border border-transparent shadow-sm text-sm font-bold rounded-full text-white bg-red-500 hover:bg-red-500/50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 mx-2"
              >
                Delete
              </div>
              {data.invoice_status == "Paid" ? null : (
                <div
                  onClick={() => setPaid()}
                  className="cursor-pointer flex justify-center items-center px-6 py-2 border border-transparent shadow-sm text-sm font-bold rounded-full text-white bg-[#7c5dfa] hover:bg-[#5c3be2] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 mx-2"
                >
                  Mark as Paid
                </div>
              )}
            </div>
          </div>
          <div className="mb-8 bg-[#1e2139] p-5 rounded-md">
            <div className="flex flex-row justify-between ">
              <div className=" h-32">
                <p className="text-white text-lg">
                  <span className="font-bold text-[#7e88c3]">#</span>
                  <span className=" font-bold ">{data.invoiceNumber}</span>
                </p>
                <p className="text-white">
                  <span>{data.bill_to_client_project_description}</span>
                </p>
              </div>
              <div className=" h-32 text-[12px] text-right">
                <p className="text-white">{data.bill_from_street_address}</p>
                <p className="text-white">{data.bill_from_city}</p>
                <p className="text-white">{data.bill_from_post_code}</p>
                <p className="text-white">{data.bill_from_country}</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cold-3 place-content-center space-y-5 md:space-y-0   md:space-x-5 bg-[#1e2139] p-5 rounded-md">
              <div className="  text-[12px] ">
                <p className="text-indigo-500 font-bold">Invoice Date</p>
                <p className="text-white text-xl font-bold">
                  {data.bill_to_client_invoice_date
                    ? data.bill_to_client_invoice_date.split("T")[0]
                    : null}
                </p>
                <br />
                <br />
                <p className="text-indigo-500 font-bold">Payment Due</p>
                <p className="text-white text-xl font-bold">
                  {data.bill_to_client_invoice_date
                    ? data.bill_to_client_invoice_date.split("T")[0]
                    : null}
                </p>
              </div>
              <div className="  text-[12px] ">
                <p className="text-indigo-500 font-bold">Bill To</p>
                <p className="text-white text-xl font-bold">
                  {data.bill_to_client_name}
                </p>
                <p className="text-white">{data.bill_to_client_address}</p>
                <p className="text-white">{data.bill_to_client_city}</p>
                <p className="text-white">{data.bill_to_client_post_code}</p>
                <p className="text-white">{data.bill_to_client_country}</p>
              </div>
              <div className=" text-[12px] ">
                <p className="text-indigo-500 font-bold">Send To</p>
                <p className="text-white text-xl font-bold">
                  {data.bill_to_client_email}
                </p>
              </div>
            </div>

            <div className="bg-[#252945] p-5 rounded-md">
              <div className=" w-full h-10 text-[12px] flex flex-row justify-between">
                <p className="text-indigo-500 font-bold mt-3 ">Item Name</p>
                <div className="flex flex-row">
                  <p className="text-indigo-500 font-bold mt-3">QTY.</p>
                  <p className="text-indigo-500 font-bold mt-3 px-8">Price</p>
                  <p className="text-indigo-500 font-bold mt-3 ml-8  text-right">
                    Total
                  </p>
                </div>
              </div>

              {data.items
                ? data.items.map((item, index) => {
                    return (
                      <div className=" w-full h-10 text-[12px] flex flex-row justify-between">
                        <p className="text-indigo-500 font-bold mt-3">
                          {item.itemName}
                        </p>
                        <div className="flex flex-row">
                          <p className="text-white mt-3">{item.qty}</p>
                          <p className="text-white mt-3 px-8">{item.price}</p>
                          <p className="text-white mt-3 ml-8  text-right">
                            {item.qty * item.price}
                          </p>
                        </div>
                      </div>
                    );
                  })
                : null}

              <div className=" text-[12px] flex flex-row"></div>
            </div>
            <div className="bg-[#000000] flex flex-row mb-8 p-5 rounded-md mt-5">
              <div className=" w-full  text-[12px] flex flex-row justify-between">
                <p className="text-indigo-500 font-bold   text-xl">
                  Account Due
                </p>
                <div className="flex flex-row">
                  <p className="text-white  ml-8  text-right text-2xl">
                    £{sum}
                  </p>
                </div>
              </div>

              <div className=" text-[12px] flex flex-row"></div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
