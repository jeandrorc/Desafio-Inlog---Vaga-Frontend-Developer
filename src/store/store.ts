import { Action, AnyAction, ThunkAction, ThunkDispatch, configureStore } from '@reduxjs/toolkit';
import vehiclesReducer from './features/vehicles/vehicleSlice';

const store = configureStore({
  reducer: {
    vehicles: vehiclesReducer,
  }
});


export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch & ThunkDispatch<RootState, any, AnyAction>;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;
export default store;
