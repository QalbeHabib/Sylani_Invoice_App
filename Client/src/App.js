import React from "react";

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import { Provider } from "react-redux";
import { createStore } from "redux";
import { user } from "./redux/reducers/userReducer";
import Delete from "./Pages/User/Logout";
import Invoice from "./Invoices/Invoice";
import ViewInvoice from "./Invoices/ViewInvoice";
import EditInvoice from "./Invoices/EditInvoice";
import AddInvoice from "./Invoices/AddInvoice";

const App = () => {
  const store = createStore(user);
  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route exact path="/" element={<Invoice />} />
          <Route exact path="/invoice/view/:id" element={<ViewInvoice />} />
        </Routes>
        <Delete />
        <EditInvoice />
        <AddInvoice />
      </Router>
    </Provider>
  );
};

export default App;
