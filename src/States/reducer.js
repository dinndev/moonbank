import uniqid from "uniqid";
export const initialState = {
  expenceList: [
    {
      item: "Grocery",
      cost: 200,
      id: uniqid(),
    },
    {
      item: "Rent",
      cost: 250,
      id: uniqid(),
    },
    {
      item: "Water Bill",
      cost: 600,
      id: uniqid(),
    },
    {
      item: "Electric Bill",
      cost: 300,
      id: uniqid(),
    },
  ],
  totalFunds: 10000,
  totalExpence: 0,
  depositVal: 0,
  withdrawVal: 0,
  toEditExpence: {},
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
  }
};
