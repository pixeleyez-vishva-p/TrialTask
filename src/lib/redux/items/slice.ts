import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetchItems, fetchItemById } from './thunks';

// Initial state
const initialState: ItemsState = {
  items: [],
  selectedItem: null,
  isLoading: false,
  error: null,
  total: 0,
  skip: 0,
  limit: 20,
};

// Items slice
const itemsSlice = createSlice({
  name: 'items',
  initialState,
  reducers: {
    clearError: state => {
      state.error = null;
    },
    setSelectedItem: (state, action: PayloadAction<Item | null>) => {
      state.selectedItem = action.payload;
    },
    clearItems: state => {
      state.items = [];
      state.selectedItem = null;
      state.error = null;
    },
  },
  extraReducers: builder => {
    // Fetch items cases
    builder
      .addCase(fetchItems.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchItems.fulfilled, (state, action) => {
        state.isLoading = false;
        state.items = action.payload.items;
        state.total = action.payload.total;
        state.skip = action.payload.skip;
        state.limit = action.payload.limit;
        state.error = null;
      })
      .addCase(fetchItems.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })

      // Fetch item by ID cases
      .addCase(fetchItemById.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchItemById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.selectedItem = action.payload;
        state.error = null;
      })
      .addCase(fetchItemById.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});

// Export actions
export const { clearError, setSelectedItem, clearItems } = itemsSlice.actions;

// Export reducer
export default itemsSlice.reducer;

// Selectors
export const selectItems = (state: { items: ItemsState }) => state.items.items;
export const selectSelectedItem = (state: { items: ItemsState }) =>
  state.items.selectedItem;
export const selectItemsLoading = (state: { items: ItemsState }) =>
  state.items.isLoading;
export const selectItemsError = (state: { items: ItemsState }) =>
  state.items.error;
export const selectItemsTotal = (state: { items: ItemsState }) =>
  state.items.total;
