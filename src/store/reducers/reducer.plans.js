import { keysToDone, toDelTree, weekdaysIsDone,addWorkToWhole,addToHalfday,delHalfday,weekendIsDone,addToWeekend,delWeekend } from "../action/action.index";

function plans(plans = {
    data: {},
    loading: true,
}, action) {
    switch (action.type) {
        case 'PLANS-LOADING':
            return {
                data: {},
                loading: true,
            }
        case 'PLANS-LOAD':
            return {
                data: action.data,
                loading: false,
            }
        case 'KEYS-TO-DONE':
            return {
                ...plans,
                data: {
                    ...plans.data,
                    wholeWeek: keysToDone(plans.data.wholeWeek, action.keys)
                }
            }
        case 'WEEKDAYS-ISDONE':
            return {
                ...plans,
                data: {
                    ...plans.data,
                    weekdays: weekdaysIsDone(plans.data.weekdays, action.date, action.time, action.target)
                }
            }
        case 'TO-DEL-TREE':
            return {
                ...plans,
                data: {
                    ...plans.data,
                    wholeWeek: toDelTree(plans.data.wholeWeek, action.key)
                }
            }
            
        case 'ADD-WORK-TO-MAIN':
            return {
                ...plans,
                data: {
                    ...plans.data,
                    wholeWeek: plans.data.wholeWeek.concat([{
                        work: action.work,
                        done: false,
                        key: Date.now()
                    }])
                }
            }
        case 'ADD-WORK-TO-WHOLE':
            return {
                ...plans,
                data: {
                    ...plans.data,
                    wholeWeek: addWorkToWhole(plans.data.wholeWeek,action.key,action.work)
                }
            }
        case 'ATT-TO-HALFDAY':
            return {
                ...plans,
                data:{
                    ...plans.data,
                    weekdays:addToHalfday(plans.data.weekdays,action.time,action.date,action.work)
                }
            }
        case 'DEL-HALFDAY':
            return {
                ...plans,
                data:{
                    ...plans.data,
                    weekdays:delHalfday(plans.data.weekdays,action.date,action.time,action.target)
                }
            }
        case 'WEEKEND-ISDONE':
            return {
                ...plans,
                data:{
                    ...plans.data,
                    weekdays:weekendIsDone(plans.data.weekdays,action.date,action.target)
                }
            }
        case 'ADD-TO-WEEKEND':
            return {
                ...plans,
                data:{
                    ...plans.data,
                    weekdays:addToWeekend(plans.data.weekdays,action.date,action.work)
                }
            }
        case 'DEL-WEEKEND':
            return {
                ...plans,
                data:{
                    ...plans.data,
                    weekdays:delWeekend(plans.data.weekdays,action.date,action.target)
                }
            }
        default:
            return plans;
    }


}

export default plans;