import * as Yup from 'yup';

export const validationSchema = Yup.object({
        bill_from_street_address: Yup.string()
        .required('Required')
        .max(25, 'Must be 25 characters or less'),
        
        bill_from_city: Yup.string()
        .required('Required')
        .max(25, 'Must be 25 characters or less'),

        bill_from_post_code: Yup.string()
        .required('Required')
        .max(25, 'Must be 25 characters or less'),

        bill_from_country: Yup.string()
        .required('Required')
        .max(25, 'Must be 25 characters or less'),

        bill_to_client_name: Yup.string()
        .required('Required')
        .max(25, 'Must be 25 characters or less'),

        bill_to_client_email: Yup.string().email('Invalid').required('Required'),

        bill_to_client_address: Yup.string()
        .required('Required')
        .max(25, 'Must be 25 characters or less'),

        bill_to_client_city: Yup.string()
        .required('Required')
        .max(25, 'Must be 25 characters or less'),

        bill_to_client_post_code: Yup.number()
        .required('Required'),
        // .max(5, 'Must be 25 characters or less'),

        bill_to_client_country: Yup.string()
        .required('Required')
        .max(25, 'Must be 25 characters or less'),

        bill_to_client_project_description: Yup.string()
        .required('Required')
        .max(2500, 'Must be less then 2500'),
//     validation for array     
        items: Yup.array()
        .of(
                Yup.object({
                        itemName: Yup.string()
                        .required('Required')
                        .max(25, 'Must be 25 characters or less'),
                        qty: Yup.number()
                        .required('Required')
                        .max(99, 'Must be 99  or less'),
                        price: Yup.number()
                        .required('Required')
                        .max(999999, 'Must be 999999 or less'),
                })
)
.required('Required'),

       
});


// invoiceNumber: "R"+ randomInvoiceNumber(),
// bill_from_street_address:'',
// bill_from_city:'',
// bill_from_post_code:'',
// bill_from_country:'',
// bill_to_client_name:'',
// bill_to_client_email:'',
// bill_to_client_address:'',
// bill_to_client_city:'',
// bill_to_client_post_code:'',
// bill_to_client_country:  '',
// bill_to_client_invoice_date:'',
// bill_to_client_payment_terms:'',
// bill_to_client_project_description:'',
// invoice_status:"Pending",
// friends: [
//   {
//     itemName: '',
//     qty: '',
//     price: '',
//   },
// ],