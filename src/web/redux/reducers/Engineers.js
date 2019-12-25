const initialState = {
  card: [],
  base_url: "",
  isLoading: false,
  isError: false,
  next: "",
  page: "",
  previous: "",
  dataTotal: 0,
  user: "",
  id: "",
  name: "",
  photo: "",
  description: "",
  skill: "",
  location: "",
  dateofbirth: "",
  expectsalary: "",
  email: "",
  phone: "",
  showcase: ""
};

const Engineers = (state = initialState, action) => {
  switch (action.type) {
    case "FETCH_ENGINEERS_PENDING":
      return {
        ...state, //collect all previous state
        isError: false,
        isLoading: true
      };
    case "FETCH_ENGINEERS_FULFILLED":
      return {
        ...state,
        isLoading: false,
        isError: false,
        card: action.payload.data.result.data,
        next: action.payload.data.nextPage,
        previous: action.payload.data.prevPage,
        base_url: action.payload.config.url,
        page: action.payload.data.page,
        dataTotal: action.payload.data.totalData
      };
    case "FETCH_ENGINEERS_REJECTED":
      return {
        ...state,
        isLoading: false,
        isError: true
      };
    case "GET_ENGINEER_FULFILLED":
      return {
        ...state,
        isLoading: false,
        isError: false,
        user: action.payload.data.result[0].name
      };
    case "PROFILE_ENGINEER_FULFILLED":
      let date = new Date(action.payload.data.result[0].dateofbirth);
      let dob =
        date.getUTCMonth() + 1 > 9
          ? date.getUTCFullYear() +
            "-" +
            (date.getUTCMonth() + 1) +
            "-" +
            date.getUTCDate()
          : date.getUTCFullYear() +
            "-0" +
            (date.getUTCMonth() + 1) +
            "-0" +
            date.getUTCDate();
      return {
        ...state,
        id: action.payload.data.result[0].id,
        name: action.payload.data.result[0].name,
        photo: action.payload.data.result[0].photo,
        description: action.payload.data.result[0].description,
        skill: action.payload.data.result[0].skill,
        location: action.payload.data.result[0].location,
        dateofbirth: dob,
        expectsalary: action.payload.data.result[0].expectsalary,
        email: action.payload.data.result[0].email,
        phone: action.payload.data.result[0].phone,
        showcase: action.payload.data.result[0].showcase
      };
    default:
      return state;
  }
};

export default Engineers;
