// Mock authentication service
// In a real app, this would make API calls to your backend
export class AuthService {
  private static users: User[] = [
    {
      id: '1',
      email: 'test@example.com',
      name: 'Test User',
    },
  ];

  static async login(
    email: string,
    password: string
  ): Promise<ApiResponse<User>> {
    // Simulate API delay

    // Mock validation - in real app, this would be server-side
    const user = this.users.find(u => u.email === email);

    if (!user) {
      return {
        data: null,
        message: 'User not found',
        success: false,
      };
    }

    // Mock password validation - in real app, this would be server-side
    if (password !== 'password123') {
      return {
        data: null,
        message: 'Invalid password',
        success: false,
      };
    }

    return {
      data: user,
      message: 'Login successful',
      success: true,
      token: `mock-jwt-token-${user.id}-${Date.now()}`, // Mock JWT token
    };
  }

  static async logout(): Promise<void> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(() => resolve(undefined), 500));
    // In a real app, this would clear server-side sessions
  }
}
