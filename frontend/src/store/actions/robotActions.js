import { robotService } from '../../services/robot.service';

export function loadRobots() {
  return async (dispatch, getState) => {
    const { filterBy } = getState().robotModule;
    try {
      const robots = await robotService.query(filterBy);
      dispatch({ type: 'SET_ROBOTS', robots });
    } catch (err) {
      console.log('Error loading robots:', err);
    }
  };
}

export function setRobotById(robotId) {
  return async dispatch => {
    try {
      const robot = await robotService.getById(robotId);
      dispatch({ type: 'SET_ROBOT', robot });
    } catch (err) {
      console.log('Error loading robot with ID:', robotId, err);
    }
  };
}

export function saveRobot(robotToSave) {
  return async dispatch => {
    try {
      const robot = await robotService.save(robotToSave);
      if (robotToSave._id) dispatch({ type: 'UPDATE_ROBOT', robot });
      else dispatch({ type: 'ADD_ROBOT', robot });
    } catch (err) {
      console.log('Error saving robot:', robotToSave, err);
    }
  };
};

export function removeRobot(robotId) {
  return async dispatch => {
    try {
      await robotService.remove(robotId);
      dispatch({ type: 'REMOVE_ROBOT', robotId });
    } catch (err) {
      console.log('Error removing robot with ID:', robotId, err);
    }
  };
};