import { combineReducers } from "@reduxjs/toolkit";
import detailReducer from "../Reducer/CardDetailsReducer";

const rootReducer=combineReducers({
    detailsAction :detailReducer
})

export default rootReducer