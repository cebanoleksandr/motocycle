import { combineReducers, createStore, Store } from 'redux';
import bykeReducer from './bykeReducer';

const reducers = combineReducers({
  bikes: bykeReducer,
});

const store: Store<RootState> = createStore(reducers);

export type RootState = ReturnType<typeof reducers>;
export type AppDispatch = typeof store.dispatch;

export default store;
