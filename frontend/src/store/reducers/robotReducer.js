const initialState = {
  robots: [],
  currRobot: null,
  filterBy: null,
};

export function robotReducer(state = initialState, action) {
  switch (action.type) {
    case 'SET_ROBOTS':
      return {
        ...state,
        robots: action.robots
      };
    case 'SET_ROBOT':
      return {
        ...state,
        currRobot: action.robot
      };
    case 'ADD_ROBOT':
      return {
        ...state,
        robots: [...state.robots, action.robot]
      };
    case 'REMOVE_ROBOT':
      return {
        ...state,
        robots: state.robots.filter(robot => robot._id !== action.robotId)
      };
    case 'UPDATE_ROBOT':
      return {
        ...state,
        robots: state.robots && state.robots.map(robot => robot._id === action.robot._id ? action.robot : robot)
      };
    default:
      return state;
  }
}