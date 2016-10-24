const initialState = {
  count: 9526,
  sub: {
    hello: 'world'
  }
};

const testReducer = (state = initialState, action) => {
  console.log(`Reducer got an action:`, action);
  switch(action.type){
  case 'ADD':
    return {
      ...state,
      count: state.count + 1
    };
  }
  return state;
};

export default testReducer;