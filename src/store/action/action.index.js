import { thisYear, thisWeek, getWeek, numToText } from './dateCalculator.js';
import useLogin from './action.login.js';
import useSave from './action.save.js';
import useGetPlans from './action.plans.js';
import {useDrag,giveBox} from './drag.js';
import {
    addKeys,
    removeKeys,
    dataToTree,
    doneToKeys,
    keysToDone,
    defaultExpandParent,
    weekdaysIsDone,
    toDelTree,
    addWorkToWhole,
    addToHalfday,
    delHalfday,
    weekendIsDone,
    addToWeekend,
    delWeekend,
    fillDates 
} from './dataMethods.js';

export {
    thisYear, thisWeek, getWeek, numToText,
    useLogin,
    useGetPlans,
    useSave,
    useDrag,giveBox,
    addKeys,
    removeKeys,
    dataToTree,
    keysToDone,
    doneToKeys,
    defaultExpandParent,
    weekdaysIsDone,
    toDelTree,
    addWorkToWhole,
    addToHalfday,
    delHalfday,
    weekendIsDone,
    addToWeekend,
    delWeekend,
    fillDates 
}

