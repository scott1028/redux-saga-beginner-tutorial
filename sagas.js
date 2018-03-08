// all sagas is generator function

import { delay } from 'redux-saga'
import { put, takeEvery, all, call, take } from 'redux-saga/effects'

export function* helloSaga() {
    console.log('Hello Sagas!')
}

// Our worker Saga: will perform the async increment task
export function* incrementAsync() {
    yield delay(1000)
    
    // test normal function
    var result1 = yield call(function(val){ return val + 10 }, 100)
    console.log(result1);

    // test normal function return a promise
    var result2 = yield call(function(val){
        return new Promise(function(res, rej){
            res(val + 200)
        }).then(function(data){
            return data + 50
        })
    }, 100)
    console.log(result2);

    // test generator function
    var result3 = yield call(function*(val){
        var result = yield val + 10;
        return result;
    }, -100)
    console.log(result3);

    yield put({ type: 'INCREMENT' })  // equals store.dispatch({ type: 'INCREMENT' })
}

// Our watcher Saga: spawn a new incrementAsync task on each INCREMENT_ASYNC
export function* watchIncrementAsync() {
    yield takeEvery('INCREMENT_ASYNC', incrementAsync)
    // or
    // using synchronous func take
    // while(true){
    //     yield take('INCREMENT_ASYNC')
    //     yield delay(1000)
    //     yield put({ type: 'INCREMENT' })
    // }
}

// notice how we now only export the rootSaga
// single entry point to start all Sagas at once
export function* rootSaga() {
    yield all([
        helloSaga(),
        watchIncrementAsync()
    ])
}