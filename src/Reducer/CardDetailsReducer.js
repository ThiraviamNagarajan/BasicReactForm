import { studentdetails } from "../Action/CardDetails";

const initialState={
    StudentAllDetails:[]
}

const detailReducer=(state=initialState,action)=>{
    switch(action.type)
    {
        case studentdetails:
            return{
                StudentAllDetails:action.payLoad
            }
            default:
                return state
    }
}

export default detailReducer