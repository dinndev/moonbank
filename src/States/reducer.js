// get local storage var if there is
const usersFromLocalStorage = localStorage.getItem("Users");
const userFromLocalStorage = localStorage.getItem("User");
const expenceListsFromLocalStorage = localStorage.getItem("Expences");
const totalExpenceFromLocalStorage = localStorage.getItem("totalExpence");
const totalFundsFromLocalStorage = localStorage.getItem("totalFunds");
// set initial state
export const initialState = {
  expenceList: userFromLocalStorage
    ? JSON.parse(userFromLocalStorage).expenceList
    : [],
  totalFunds: 0,
  totalExpence: 0,
  depositVal: 0,
  withdrawVal: 0,
  user: userFromLocalStorage ? JSON.parse(userFromLocalStorage) : {},
  accounts: usersFromLocalStorage ? JSON.parse(usersFromLocalStorage) : [],
  toEditExpence: {},
  isLoggedIn: userFromLocalStorage
    ? JSON.parse(userFromLocalStorage).email
      ? true
      : false
    : "",
};

const types = {
  add_expence: "ADD_EXPENCE",
  withdraw: "WITHDRAW",
  deposit: "DEPOSIT",
  delete_expence: "DELETE_EXPENCE",
  get_to_edit_expence: "GET_TO_EDIT_EXPENCE",
  edit_expence: "EDIT_EXPENCE",
  get_total_expence: "GET_TOTAL_EXPENCE",
  subtract_expence_to_funds: "SUBTRACT_EXPENCE_TO_FUNDS",
  add_recent_cost_to_total_expence: "ADD_RECENT_COST_TO_TOTAL_EXPENCE",
  subtract_recent_cost_to_funds: "SUBTRACT_RECENT_COST_TO_FUNDS",
  add_deleted_cost_to_funds: "ADD_DELETED_COST_TO_FUNDS",
  subtract_deleted_cost_to_expence: "SUBTRACT_DELETED_COST_TO_EXPENCE",
  add_user: "ADD_USER",
  set_user: "SET_USER",
  toggle_login: "TOGGLE_LOGIN",
  update_accounts: "UPDATE_ACCOUNTS",
  set_expence_list: "SET_EXPENCE_LIST",
};

export const reducer = (state, action) => {
  const {
    add_expence,
    withdraw,
    deposit,
    delete_expence,
    edit_expence,
    get_to_edit_expence,
    get_total_expence,
    subtract_expence_to_funds,
    add_recent_cost_to_total_expence,
    subtract_recent_cost_to_funds,
    add_deleted_cost_to_funds,
    subtract_deleted_cost_to_expence,
    add_user,
    set_user,
    toggle_login,
    update_accounts,
    set_expence_list,
  } = types;
  switch (action.type) {
    // Expence control
    case add_expence:
      return {
        ...state,
        expenceList:
          state.expenceList && state.expenceList.concat(action.recentExpence),
      };
    case delete_expence:
      return {
        ...state,
        expenceList: state.expenceList.filter(
          ({ id }) => id !== action.toDeleteExpenceID
        ),
      };
    case get_to_edit_expence:
      return {
        ...state,
        toEditExpence: { ...action.toEditExpence },
      };
    case edit_expence: {
      const newArr = [...state.expenceList];
      let test =
        newArr[
          state.expenceList.findIndex(
            ({ id }) => id === action.editedExpence.id
          )
        ];
      test.cost = action.editedExpence.cost;
      test.item = action.editedExpence.item;
      return {
        ...state,
        expenceList: newArr,
      };
    }
    // balance
    case deposit:
      return {
        ...state,
        totalFunds: (state.totalFunds += action.deposit),
      };
    case withdraw:
      return {
        ...state,
        totalFunds: (state.totalFunds -= action.withdraw),
      };
    case get_total_expence:
      return {
        ...state,
        totalExpence: state.expenceList
          .map(({ cost }) => cost)
          .reduce((prev, curr) => prev + curr),
      };

    case subtract_expence_to_funds:
      return {
        ...state,
        totalFunds: state.totalFunds - state.totalExpence,
      };
    case subtract_recent_cost_to_funds:
      return {
        ...state,
        totalFunds: state.totalFunds - action.cost,
      };
    case add_recent_cost_to_total_expence:
      return {
        ...state,
        totalExpence: state.totalExpence + action.cost,
      };
    case add_deleted_cost_to_funds:
      return {
        ...state,
        totalFunds: state.totalFunds + action.cost,
      };
    case subtract_deleted_cost_to_expence:
      return {
        ...state,
        totalExpence: state.totalExpence - action.cost,
      };
    // user
    case add_user:
      return {
        ...state,
        accounts: state.accounts.concat(action.account),
      };
    case set_user:
      return {
        ...state,
        user: { ...action.user },
      };
    case toggle_login:
      return {
        ...state,
        isLoggedIn: action.isLoggedIn,
      };
    case update_accounts: {
      const toUpdateAccount = state.accounts.filter(
        ({ email }) => email === action.updatedUser.email
      );
      const array = [...state.accounts];
      array[array.indexOf(toUpdateAccount[0])] = action.updatedUser;
      return {
        ...state,
        accounts: array,
      };
    }
    case set_expence_list:
      return {
        ...state,
        expenceList: action.expenceList,
      };

    default:
      return {
        ...state,
      };
  }
};
