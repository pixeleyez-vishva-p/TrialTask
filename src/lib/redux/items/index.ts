// Export slice
export { default as itemsReducer } from './slice';
export {
  clearError as clearItemsError,
  setSelectedItem,
  clearItems,
} from './slice';
export {
  selectItems,
  selectSelectedItem,
  selectItemsLoading,
  selectItemsError,
  selectItemsTotal,
} from './slice';

// Export thunks
export { fetchItems, fetchItemById } from './thunks';
