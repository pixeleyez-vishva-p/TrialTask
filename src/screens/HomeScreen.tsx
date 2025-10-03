import React, { useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, RefreshControl } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList, Item } from '../types';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import {
  fetchItems,
  selectItems,
  selectItemsLoading,
  selectItemsError,
  clearError,
} from '../store/itemsSlice';
import { logoutUser } from '../store/authSlice';
import { ItemCard } from '../components/ItemCard';
import { ItemCardSkeleton } from '../components/ItemCardSkeleton';
import { CustomButton } from '../components/CustomButton';
import { useToast } from '../hooks/useToast';
import { Colors } from '../constants';

type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Home'>;

interface Props {
  navigation: HomeScreenNavigationProp;
}

export const HomeScreen: React.FC<Props> = ({ navigation }) => {
  const dispatch = useAppDispatch();
  const items = useAppSelector(selectItems);
  const isLoading = useAppSelector(selectItemsLoading);
  const error = useAppSelector(selectItemsError);
  const { showError, showSuccess } = useToast();

  useEffect(() => {
    // Fetch items when component mounts
    dispatch(fetchItems());
  }, [dispatch]);

  useEffect(() => {
    // Show error toast if there's an error
    if (error) {
      showError(error);
      dispatch(clearError());
    }
  }, [error, showError, dispatch]);

  const handleItemPress = (item: Item) => {
    navigation.navigate('Detail', { item });
  };

  const handleRefresh = () => {
    dispatch(fetchItems());
  };

  const handleLogout = async () => {
    try {
      await dispatch(logoutUser()).unwrap();
    } catch {
      showError('Logout failed. Please try again.');
    }
  };

  const renderItem = ({ item }: { item: Item }) => (
    <ItemCard item={item} onPress={handleItemPress} />
  );

  const renderSkeletonList = () => (
    <View style={styles.listContainer}>
      {Array.from({ length: 6 }).map((_, index) => (
        <ItemCardSkeleton key={index} />
      ))}
    </View>
  );

  if (isLoading && items.length === 0) {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>Feeds</Text>
          <CustomButton
            title='Logout'
            onPress={handleLogout}
            variant='outline'
            size='small'
            style={styles.logoutButton}
          />
        </View>
        {renderSkeletonList()}
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Feeds</Text>
        <CustomButton
          title='Logout'
          onPress={handleLogout}
          variant='outline'
          size='small'
          style={styles.logoutButton}
        />
      </View>

      <FlatList
        data={items}
        renderItem={renderItem}
        keyExtractor={item => item.id.toString()}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={isLoading}
            onRefresh={handleRefresh}
            colors={[Colors.primary]}
            tintColor={Colors.primary}
          />
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    backgroundColor: Colors.white,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: Colors.textPrimary,
    marginBottom: 4,
    flex: 1,
  },
  logoutButton: {
    marginLeft: 16,
  },
  listContainer: {
    padding: 20,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 60,
  },
  emptyText: {
    fontSize: 18,
    color: Colors.textSecondary,
    marginBottom: 20,
  },
  refreshButton: {
    paddingHorizontal: 32,
  },
});
