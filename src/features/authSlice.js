import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  users: [
    {
      id: 'default-admin',
      username: 'admin',
      email: 'admin@palletrent.com',
      password: 'admin', // standard default
      role: 'admin',
    },
    {
      id: 'default-user',
      username: 'user',
      email: 'user@palletrent.com',
      password: 'user', // standard default
      role: 'user',
    }
  ],
  currentUser: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    registerUser: (state, action) => {
      const { username, email, password, role, adminKey } = action.payload;
      
      // Double check if username/email already exists
      const exists = state.users.find(u => u.username === username || u.email === email);
      if (exists) {
        throw new Error('Username or Email already registered');
      }

      if (role === 'admin' && adminKey !== '4Pl!k@s1pROTotYp3') {
        throw new Error('Invalid Admin Code!');
      }

      const newUser = {
        id: 'user-' + Date.now(),
        username,
        email,
        password,
        role: role || 'user',
      };

      state.users.push(newUser);
    },
    loginUser: (state, action) => {
      const { username, password } = action.payload;
      const user = state.users.find(
        u => u.username === username && u.password === password
      );
      
      if (!user) {
        throw new Error('Invalid username or password');
      }
      
      state.currentUser = {
        id: user.id,
        username: user.username,
        email: user.email,
        role: user.role
      };
    },
    logoutUser: (state) => {
      state.currentUser = null;
    },
    updateUserRole: (state, action) => {
      const { userId, newRole } = action.payload;
      const user = state.users.find(u => u.id === userId);
      if (user) {
        user.role = newRole;
        // If updating currently logged in user
        if (state.currentUser && state.currentUser.id === userId) {
          state.currentUser.role = newRole;
        }
      }
    }
  }
});

export const { registerUser, loginUser, logoutUser, updateUserRole } = authSlice.actions;
export default authSlice.reducer;
