// get local storage var if there is
const usersFromLocalStorage = localStorage.getItem("Users");
const userFromLocalStorage = localStorage.getItem("User");
// set initial state
export const initialState = {
  expenceList: userFromLocalStorage
    ? JSON.parse(userFromLocalStorage).expenceList
    : [],
  totalFunds: userFromLocalStorage
    ? JSON.parse(userFromLocalStorage).totalFunds
    : 1000,
  totalExpence: userFromLocalStorage
    ? JSON.parse(userFromLocalStorage).totalExpence
    : 0,
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
  delete_account: "DELETE_ACCOUNT",
  send_funds: "SEND_FUNDS",
  subtract_sent_amount: "SUBTRACT_SENT_AMOUNT",
  update_stats: "UPDATE_STATS",
};

export const reducer = (state, action) => {
  const updatedUser = { ...state.user };
  let totalFunds = updatedUser.totalFunds;
  let totalExpence = updatedUser.totalExpence;
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
    delete_account,
    send_funds,
    subtract_sent_amount,
    update_stats,
  } = types;
  switch (action.type) {
    // Expence control
    case add_expence:
      return {
        ...state,
        expenceList: state.expenceList.concat(action.recentExpence),
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
      const deductedPrevToCurr = action.currCost - action.prevCost;
      test.cost = action.editedExpence.cost;
      test.item = action.editedExpence.item;
      updatedUser.expenceList = newArr;
      // update expences after the edit
      updatedUser.totalExpence += deductedPrevToCurr;
      updatedUser.totalFunds -= deductedPrevToCurr;
      return {
        ...state,
        user: updatedUser,
      };
    }
    // balance
    case deposit: {
      totalFunds += action.deposit;
      updatedUser.totalFunds = totalFunds;
      return {
        ...state,
        user: updatedUser,
      };
    }
    case withdraw: {
      totalFunds -= action.withdraw;
      updatedUser.totalFunds = totalFunds;
      return {
        ...state,
        user: updatedUser,
      };
    }
    case get_total_expence: {
      updatedUser.totalExpence = state.expenceList
        .map(({ cost }) => cost)
        .reduce((prev, curr) => prev + curr);
      return {
        ...state,
        user: updatedUser,
      };
    }
    case subtract_expence_to_funds: {
      totalFunds -= state.totalExpence;
      updatedUser.totalFunds = totalFunds;
      return {
        ...state,
        user: updatedUser,
      };
    }
    case subtract_recent_cost_to_funds: {
      totalFunds -= action.cost;
      updatedUser.totalFunds = totalFunds;
      return {
        ...state,
        user: updatedUser,
      };
    }
    case add_recent_cost_to_total_expence: {
      totalExpence += action.cost;
      updatedUser.totalExpence = totalExpence;
      return {
        ...state,
        user: updatedUser,
      };
    }

    case add_deleted_cost_to_funds: {
      totalFunds += action.cost;
      updatedUser.totalFunds = totalFunds;
      return {
        ...state,
        user: updatedUser,
      };
    }

    case subtract_deleted_cost_to_expence: {
      totalExpence -= action.cost;
      updatedUser.totalExpence = totalExpence;
      return {
        ...state,
        user: updatedUser,
      };
    }
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
    case delete_account:
      return {
        ...state,
        accounts: state.accounts.filter(({ id }) => id !== action.id),
      };
    case send_funds: {
      const accounts = [...state.accounts];
      const accountToSendFundsArray = state.accounts.filter(
        ({ id }) => id === action.id
      );
      const accountToSendFunds = accountToSendFundsArray[0];

      accounts[accounts.indexOf(accountToSendFunds)].totalFunds +=
        action.amount;
      return {
        ...state,
        accounts: accounts,
      };
    }
    case subtract_sent_amount: {
      totalFunds -= action.amount;
      updatedUser.totalFunds = totalFunds;
      return {
        ...state,
        user: updatedUser,
      };
    }
    case update_stats: {
      const newExpenceListTotal = parseInt(
        action.expenceList
          .map(({ cost }) => cost)
          .reduce((prev, curr) => prev + curr)
      );
      updatedUser.totalExpence = newExpenceListTotal;
      updatedUser.totalFunds -= newExpenceListTotal;
      return {
        ...state,
        user: updatedUser,
      };
    }

    default:
      return {
        ...state,
      };
  }
};
