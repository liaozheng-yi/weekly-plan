import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import PageLogin from '../views/login/pageLogin.js';
import PagePlans from '../views/plans/pagePlans.js';
import Page404 from '../views/404/page404.js'
import qs from 'qs'

function IndexRouter() {
    return <Switch>
        <Route
            path='/'
            exact
            render={() => {
                return <Redirect to={'/login'} />
            }}
        />
        <Route
            path='/login'
            exact
            render={() => {
                let memory = localStorage.getItem('weekly-plan-login')
                if (memory) {
                    memory = JSON.parse(memory);
                }
                return <PageLogin memory={memory} />
            }}
        />
        <Route
            path='/plans'
            exact
            render={(props) => {
                //只能有2个参数，参数只能是数字，年份是2020-3006，周数限制在1-53
                const { search } = props.location;
                const { year, week,...others } = qs.parse(search.slice(1))
                // console.log(others);
                let other = JSON.stringify(others)
                if (
                    (year === undefined & week === undefined&other==="{}")
                    || (+year > 2019 & +year < 3006 & Number.isInteger(+year) &
                        +week > 0 & +week < 54 & Number.isInteger(+week)&other==="{}")
                ) {
                    return <PagePlans />
                } else {
                    return <Page404 />
                }
            }}
        />
        <Route
            path='/'
            component={Page404}
        />
    </Switch>
}

export { IndexRouter };