const initialState = {

    drawer: {
      open: false,
    }
  }
  
const drawerReducer = (state = initialState, action) => {
    switch(action.type){
        case "DRAWER_OPEN":
            return {
                ...state,
                drawer: {open: action.payload},
                
            }
        default:
            return state
    }
}

export const drawer =  drawerReducer;