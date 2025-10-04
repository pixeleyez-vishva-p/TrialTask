import { createAsyncThunk } from '@reduxjs/toolkit';
import { ItemService } from '../../../common/api/services/item-service';

// Async thunk for fetching items
export const fetchItems = createAsyncThunk(
  'items/fetchItems',
  async (_, { rejectWithValue }) => {
    try {
      const response = await ItemService.fetchItems();
      return response;
    } catch {
      return rejectWithValue('Failed to fetch items');
    }
  }
);

// Async thunk for fetching item by ID
export const fetchItemById = createAsyncThunk(
  'items/fetchItemById',
  async (id: number, { rejectWithValue }) => {
    try {
      const item = await ItemService.fetchItemById(id);
      return item;
    } catch {
      return rejectWithValue('Failed to fetch item details');
    }
  }
);
