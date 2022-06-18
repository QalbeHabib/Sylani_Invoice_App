const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const mySchema = Schema({
  // _id:                                 { type: Schema.Types.ObjectId },
  invoiceNumber: { type: String, unique: true },
  bill_from_street_address: { type: String },
  bill_from_city: { type: String },
  bill_from_post_code: { type: Number },
  bill_from_country: { type: String },
  bill_to_client_name: { type: String },
  bill_to_client_email: { type: String },
  bill_to_client_address: { type: String },
  bill_to_client_city: { type: String },
  bill_to_client_post_code: { type: Number },
  bill_to_client_country: { type: String },
  bill_to_client_invoice_date: { type: String },
  bill_to_client_payment_terms: { type: String },
  bill_to_client_project_description: { type: String },
  invoice_status: { type: String },
  items: [
    {
      itemName: { type: String, required: true },
      qty: { type: Number, required: true },
      price: { type: Number, required: true },
    },
  ],
});

/* global db */
module.exports = db.model("InvoiceData", mySchema);
