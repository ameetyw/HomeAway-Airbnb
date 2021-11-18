import { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loadRobots, setRobotById, setFilterBy } from '../store/actions/robotActions';
import { getNextRobotId } from '../services/robot.service';
import { RobotFilter } from './RobotFilter';

export const HooksSamples = () => {
    // store
    const { robots, currRobot } = useSelector(state => state.robotModule);
    const dispatch = useDispatch();

    // local states
    const [input, setInput] = useState('');
    const robotChangeCount = useRef(0);

    // hooks with empty array as dependency (nothing to compare further) execute once

    // componentWillMount runs before first render
    useMemo(() => { }, []);

    // componentDidMount
    useEffect(() => {
        dispatch(loadRobots());
        // componentWillUnmount
        return () => { };
    }, []);

    useEffect(() => {
        // this runs when component mounts and when dependency changes..
        if (input) {
            // inputDidUpdate
        } else {
            // on mount..
        }
    }, [input]);

    const onChangeFilter = (filterBy) => {
        dispatch(setFilterBy(filterBy));
        dispatch(loadRobots());
    };

    const onChangeRobot = useCallback(() => {
        const nextRobotId = getNextRobotId(currRobot._id);
        dispatch(setRobotById(nextRobotId));
        robotChangeCount.current++;
    }, []);
    // prevents function from being re-assigned (and trigger render) (can add dependency),
    // otherwise- re-assigned (trigger render) on every render and can cause infinite loop

    const complicatedCalcValue = useMemo(() => {
        // time-consuming process
    }, [currRobot]);
    // value will only get calculated when currRobot changes, and cached 
    // otherwise- calculated on every render

    return (
        <div className="hooks-samples">
            <button onClick={onChangeRobot}>Next robot</button>
            <a href="">link</a>
            <RobotFilter onChangeFilter={onChangeFilter} />
        </div>
    );
};