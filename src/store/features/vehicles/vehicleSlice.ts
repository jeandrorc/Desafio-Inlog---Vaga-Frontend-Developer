import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Http from "config/Http";
import { Vehicle } from "types/vehicle";

interface VehiclesState {
  items: Vehicle[];
  fetchStatus: "idle" | "loading" | "succeeded" | "failed";
  searchStatus: "idle" | "loading" | "succeeded" | "failed";
  addStatus: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: VehiclesState = {
  items: [],
  fetchStatus: "idle",
  searchStatus: "idle",
  addStatus: "idle",
  error: null,
};

interface SearchVehiclesOptions {
  query?: string;
  lat?: number;
  lng?: number;
}

interface CreateVehicleResponse {
  vehicle: Vehicle;
}

export const fetchVehicles = createAsyncThunk(
  "vehicles/fetchVehicles",
  async ({ lat, lng }: SearchVehiclesOptions) => {
    const response = await Http.get<Vehicle[]>(`/vehicles`, {
      params: {
        lat,
        lng,
      },
    });
    return response.data;
  }
);

export const searchVehicles = createAsyncThunk(
  "vehicles/searchVehicles",
  async ({ lat, lng, query }: SearchVehiclesOptions) => {
    const response = await Http.get<Vehicle[]>("/vehicles", {
      params: { query, lat, lng },
    });
    return response.data;
  }
);

export const addVehicle = createAsyncThunk(
  "vehicles/addVehicle",
  async (vehicle: Vehicle) => {
    const response = await Http.post<CreateVehicleResponse>(
      "/vehicle",
      vehicle
    );
    return response.data;
  }
);

const vehiclesSlice = createSlice({
  name: "vehicles",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchVehicles.pending, (state) => {
        state.fetchStatus = "loading";
      })
      .addCase(fetchVehicles.fulfilled, (state, action) => {
        state.fetchStatus = "succeeded";
        state.items = action.payload;
      })
      .addCase(fetchVehicles.rejected, (state, action) => {
        state.fetchStatus = "failed";
        state.error = action.error.message || null;
      })
      .addCase(searchVehicles.fulfilled, (state, action) => {
        state.searchStatus = "succeeded";
        state.items = action.payload;
      })
      .addCase(searchVehicles.rejected, (state, action) => {
        state.searchStatus = "failed";
        state.error = action.error.message || null;
      })
      .addCase(searchVehicles.pending, (state, action) => {
        state.searchStatus = "loading";
      })
      .addCase(addVehicle.pending, (state) => {
        state.addStatus = "loading";
      })
      .addCase(addVehicle.fulfilled, (state, action) => {
        state.addStatus = "succeeded";
        state.items.push(action.payload.vehicle);
      })
      .addCase(addVehicle.rejected, (state, action) => {
        state.addStatus = "failed";
        state.error = action.error.message || null;
      });
  },
});

export default vehiclesSlice.reducer;
