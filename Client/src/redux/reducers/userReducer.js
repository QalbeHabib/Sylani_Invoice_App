const initialState = {
  users: {
    loggedIn: false,
    delete: false,
    deleteId: "",
    edit: false,
    editObj: "",
    invoiceStatus: "",
  },
};

const currentUser = (state = initialState, action) => {
  switch (action.type) {
    case "SET_USER":
      return alert(action.payload);

    case "LOG_OUT":
      return {
        ...state,

        users: {
          ...state.users,
          loggedIn: action.payload.drawer,
          delete: false,
        },
      };
    case "DELETE_ALERT":
      return {
        ...state,
        users: {
          edit: false,
          delete: action.payload.show,
          deleteId: action.payload.id,
          loggedIn: false,
        },
      };
    case "EDIT_INVOICE":
        {
            return {
                ...state,
                users: {
                    ...state.users,
                    edit: action.payload.drawer,
                    editObj: action.payload.obj,
                    deleteId: action.payload.id,
                },
            };
        }
    

    case "INVOICE_STATUS":
      return {
        ...state,
        users: {
            ...state.users,
            invoiceStatus: action.payload.stus,
          },
      };

    default:
      return state;
  }
};

export const user = currentUser;
