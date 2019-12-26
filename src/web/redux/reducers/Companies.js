const initialState = {
  card: [],
  base_url: "",
  isLoading: false,
  isError: false,
  next: "",
  page: "",
  previous: "",
  dataTotal: 0,
  user: ""
};

const Companies = (state = initialState, action) => {
  switch (action.type) {
    case "FETCH_COMPANIES_PENDING":
      return {
        ...state,
        isLoading: true,
        isError: false
      };
    case "FETCH_COMPANIES_FULFILLED":
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
    case "FETCH_COMPANIES_REJECTED":
      return {
        ...state,
        isLoading: false,
        isError: true
      };
    default:
      return state;
  }
};

export default Companies;
