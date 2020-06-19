/* import { combineReducers, createStore, Reducer } from 'redux';
import notifications, { NotificationState } from '@Store/notifications/index';
import reduerRegistry from '@Store/reducerRegistry';
import reducerRegistry from '@Store/reducerRegistry';

export type StoreState = {
  notifications?: Array<NotificationState>;
};
export const initialState: StoreState = {
  notifications: [],
};

const combine = reducers => {
  const reducerNames = Object.keys(reducers);
  Object.keys(initialState).forEach(item => {
    if (reducerNames.indexOf(item) === -1) {
      reducers[item] = (state = null) => state;
    }
  });
  return combineReducers(reducers);
};

// TODO 类型是不对的
// const reducer: Reducer = combineReducers({
//   notifications,
// });

const reducer = combine(reducerRegistry.getReducers());
export type RootState = ReturnType<typeof reducer>;
const store = createStore(reducer, initialState);
export default store;

reducerRegistry.setChangeListener(reducers =>
  store.replaceReducer(combine(reducers))
);
*/
