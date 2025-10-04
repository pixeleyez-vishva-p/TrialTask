import { API_ENDPOINTS, MOCK_CONFIG, IMAGE_URLS } from '../../../constants';
import RequestWrapper from '../request-wrapper';

// Since JSONPlaceholder doesn't have the exact structure we need,
// we'll create a mock service that transforms the data
export class ItemService {
  static async fetchItems(): Promise<ItemsResponse> {
    try {
      // Fetch posts from JSONPlaceholder using axios wrapper
      const response = await RequestWrapper.get<
        Array<{ id: number; title: string; body: string }>
      >(API_ENDPOINTS.POSTS);
      const posts = response.data;
      // Transform posts to our Item structure
      const items: Item[] = posts
        .slice(0, MOCK_CONFIG.ITEMS_LIMIT)
        .map((post, index: number) => ({
          id: post.id,
          title: post.title,
          description: post.body,
          price: Math.floor(
            Math.random() *
              (MOCK_CONFIG.PRICE_RANGE.MAX - MOCK_CONFIG.PRICE_RANGE.MIN) +
              MOCK_CONFIG.PRICE_RANGE.MIN
          ),
          category:
            MOCK_CONFIG.CATEGORIES[index % MOCK_CONFIG.CATEGORIES.length],
          image: IMAGE_URLS.ITEM_IMAGE(post.id),
          rating: {
            rate:
              Math.round(
                (Math.random() *
                  (MOCK_CONFIG.RATING_RANGE.MAX -
                    MOCK_CONFIG.RATING_RANGE.MIN) +
                  MOCK_CONFIG.RATING_RANGE.MIN) *
                  10
              ) / 10,
            count: Math.floor(
              Math.random() *
                (MOCK_CONFIG.RATING_COUNT_RANGE.MAX -
                  MOCK_CONFIG.RATING_COUNT_RANGE.MIN) +
                MOCK_CONFIG.RATING_COUNT_RANGE.MIN
            ),
          },
        }));

      return {
        items,
        total: items.length,
        skip: 0,
        limit: MOCK_CONFIG.ITEMS_LIMIT,
      };
    } catch {
      throw new Error('Failed to fetch items');
    }
  }

  static async fetchItemById(id: number): Promise<Item> {
    try {
      const response = await RequestWrapper.get<{
        id: number;
        title: string;
        body: string;
      }>(API_ENDPOINTS.POST_BY_ID(id));
      const post = response.data;

      // Transform post to our Item structure
      const item: Item = {
        id: post.id,
        title: post.title,
        description: post.body,
        price: Math.floor(
          Math.random() *
            (MOCK_CONFIG.PRICE_RANGE.MAX - MOCK_CONFIG.PRICE_RANGE.MIN) +
            MOCK_CONFIG.PRICE_RANGE.MIN
        ),
        category:
          MOCK_CONFIG.CATEGORIES[post.id % MOCK_CONFIG.CATEGORIES.length],
        image: IMAGE_URLS.DETAIL_IMAGE(post.id),
        rating: {
          rate:
            Math.round(
              (Math.random() *
                (MOCK_CONFIG.RATING_RANGE.MAX - MOCK_CONFIG.RATING_RANGE.MIN) +
                MOCK_CONFIG.RATING_RANGE.MIN) *
                10
            ) / 10,
          count: Math.floor(
            Math.random() *
              (MOCK_CONFIG.RATING_COUNT_RANGE.MAX -
                MOCK_CONFIG.RATING_COUNT_RANGE.MIN) +
              MOCK_CONFIG.RATING_COUNT_RANGE.MIN
          ),
        },
      };

      return item;
    } catch {
      throw new Error('Failed to fetch item details');
    }
  }
}
