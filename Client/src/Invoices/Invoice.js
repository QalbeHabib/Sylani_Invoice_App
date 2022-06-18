import { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Filter from "../Components/Filter";

export default function Invoice() {
  const [invoices, setInvoices] = useState([]);
  const [status, setStatus] = useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const obj = useSelector((state) => state.users.invoiceStatus);
  const newObj = useSelector((state) => state);
  var customInvoices = invoices;

  console.log("Obj", obj);
  useEffect(() => {
    axios
      .get("http://localhost:4000/invoice/get")
      .then((response) => {
        setStatus(response.data);
        setInvoices(response.data);
      })
      .catch((error) => {
        return error;
      });
  }, [newObj]);

  const addInvoice = (value) => {
    dispatch({ type: "LOG_OUT", payload: { drawer: true, obj: {} } });
  };

  const ShowInvoice = (value) => {
    navigate(`/invoice/view/${value.invoiceNumber}`, { state: value });
  };

  useEffect(() => {
    if (obj == "All") {
      setStatus(invoices);
    } else if (obj == "Pending") {
      var customInvoices = invoices.filter((invoice) => {
        return invoice.invoice_status === "Pending";
      });
      setStatus(customInvoices);
    } else if (obj == "Paid") {
      var customInvoices = invoices.filter((invoice) => {
        return invoice.invoice_status === "Paid";
      });
      setStatus(customInvoices);
    }
  }, [status]);

  return (
    <>
      <div className="flex flex-row bg-[#141625] h-screen w-full">
        <div className=" lg:bg-indigo-600 lg:w-[5rem] rounded-r-2xl">
          <div className=" lg:h-screen  lg:py-3 lg:px-8"></div>
        </div>
        <div className="basis-[10%] lg:basis-1/5"></div>
        <div className="basis-[80%] mt-10 lg:basis-1/2">
          <div className="flex flex-row justify-between mb-8">
            <div>
              <span className="text-white text-2xl font-bold">Invoices</span>
              <br />
              <span className="text-white text-md">
                There are total {status.length} Invoices
              </span>
            </div>

            <div className="flex flex-row ">
              <div className="mr-8 mt-2">
                <Filter />
              </div>
              <div
                onClick={() => addInvoice()}
                className=" cursor-pointer flex justify-center items-center bg-[#7c5cfb] px-2 py-2 text-white rounded-[14%] md:rounded-full	"
              >
                <span className="  bg-white rounded-[14%] md:rounded-full  w-7 h-7 mr-2 pl-2 text-gray-600 font-bold ">
                  {" "}
                  +{" "}
                </span>
                New <span className="hidden md:block"> Invoice</span>
              </div>
            </div>
          </div>
          {status.map((value, index) => (
            <div
              onClick={() => ShowInvoice(value)}
              className=" hidden  w-full bg-[#1f213a] p-5 rounded-md md:flex md:flex-row justify-between items-center mb-2.5 cursor-pointer  border border-transparent transition hover:border-[#fff]"
            >
              <p className="text-[#6b6c9a]">
                #<span className="text-white">{value.invoiceNumber}</span>
              </p>
              <p className="text-[#6b6c9a]">
                {value.bill_to_client_invoice_date.slice(0, 10)}
              </p>
              <p className="text-[#6b6c9a]">{value.bill_to_client_name}</p>
              <p className="text-white">
                £{value.items[0].qty * value.items[0].price}
              </p>
              {value.invoice_status == "Paid" ? (
                <p className="bg-green-300/[.06] h-10 w-fit rounded-md p-2 px-4 text-[#58cfb6]">
                  ● {value.invoice_status}
                </p>
              ) : (
                <p className="bg-green-300/[.06] h-10 w-fit rounded-md p-2 px-4 text-[#ff8c2e]">
                  ● {value.invoice_status}
                </p>
              )}
            </div>
          ))}

          {invoices.map((value, index) => (
            <div
              onClick={() => ShowInvoice(value)}
              className="w-full bg-[#1f213a] p-5 rounded-md md:hidden justify-between items-center mb-2.5 cursor-pointer  border border-transparent transition hover:border-[#fff]"
            >
              <div className="flex flex-row justify-between">
                <p className="text-[#6b6c9a]">
                  #<span className="text-white">{value.invoiceNumber}</span>
                </p>
                <p className="text-[#6b6c9a]">{value.bill_to_client_name}</p>
              </div>
              <div className="flex flex-row justify-between">
                <div>
                  <p className="text-[#6b6c9a]">
                    {value.bill_to_client_invoice_date.slice(0, 10)}
                  </p>
                  <p className="text-white">
                    £{value.items[0].qty * value.items[0].price}
                  </p>
                </div>
                {value.invoice_status == "Paid" ? (
                  <p className="bg-green-300/[.06] h-10 w-fit rounded-md p-2 px-4 text-[#58cfb6]">
                    ● {value.invoice_status}
                  </p>
                ) : (
                  <p className="bg-green-300/[.06] h-10 w-fit rounded-md p-2 px-4 text-[#ff8c2e]">
                    ● {value.invoice_status}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* <AddInvoice /> */}
    </>
  );
}
