const initialState = {
    id: '',
    name:'',
    photo:'',
    description:'',
    skill:'',
    location:'',
    dateOfBirth:'',
    expectedSalary:'',
    email:'',
    phone:'',
    showcase:'',
    isDeleted: false,
    isError: false,
    isLoading: false,
    message: ''
}

const Profile = (state=initialState, action) => {
    switch(action.type){
        case "GET_ENGINEER_PENDING":
            case "DELETE_ENGINEER_PENDING":
                case "UPDATE_ENGINEER_PENDING":
                    return{
                        ...state,
                        isLoading: true,
                        isError: false
                    }
        case "GET_ENGINEER_FULFILLED":
            let date = new Date(action.payload.data.result[0].dateofbirth)
            let dob = (date.getUTCMonth()+1) > 9 ?  date.getUTCFullYear()+'-'+(date.getUTCMonth()+1)+'-'+date.getUTCDate() :
            date.getUTCFullYear()+'-0'+(date.getUTCMonth()+1)+'-0'+date.getUTCDate()
            return{
                ...state,
                id: action.payload.data.result[0].id,
                name: action.payload.data.result[0].name,
                photo: action.payload.data.result[0].photo,
                description: action.payload.data.result[0].description,
                skill: action.payload.data.result[0].skill,
                location: action.payload.data.result[0].location,
                dateOfBirth: dob,
                expectedSalary: action.payload.data.result[0].expectsalary,
                email: action.payload.data.result[0].email,
                phone: action.payload.data.result[0].phone,
                showcase: action.payload.data.result[0].showcase,
                isError: false,
                isLoading: false
            }
        case "GET_ENGINEER_REJECTED":
            return{
                ...state,
                isLoading: false,
                isError: true
            }
        case "DELETE_ENGINEER_FULFILLED":
            return{
                ...state,
                isDeleted: true,
                isLoading: false,
                isError: false
            }
        case "DELETE_ENGINEER_REJECTED":
            return{
                ...state,
                isDeleted: false,
                isLoading: false,
                isError: true
            }
        case "UPDATE_ENGINEER_FULFILLED":
            return{
                ...state,
                isError: false,
                isLoading: false,
                message: 'Update Success!'
            }
        
        case "UPDATE_ENGINEER_REJECTED":
            return{
                ...state,
                isError: true,
                isLoading: false,
                message: 'Update Failed!'
            }
        default:
            return state
    }
}

export default Profile