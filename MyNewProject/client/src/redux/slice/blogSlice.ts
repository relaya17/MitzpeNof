import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// הממשקים
interface Post {
  id: string;
  content: string;
  author: string;
  comments: Comment[];
}

interface Comment {
  id: string;
  text: string;
  author: string;
}

interface BlogState {
  posts: Post[];
}

// מצב התחלתי
const initialState: BlogState = {
  posts: [],
};

// יצירת ה-slice
const blogSlice = createSlice({
  name: 'blog',
  initialState,
  reducers: {
    addPost: (state, action: PayloadAction<{ content: string; author: string }>) => {
      const newPost: Post = {
        id: Date.now().toString(),
        content: action.payload.content,
        author: action.payload.author,
        comments: [],
      };
      state.posts.push(newPost);
    },
    addComment: (state, action: PayloadAction<{ postId: string; text: string; author: string }>) => {
      const post = state.posts.find((p) => p.id === action.payload.postId);
      if (post) {
        const newComment: Comment = {
          id: Date.now().toString(),
          text: action.payload.text,
          author: action.payload.author,
        };
        post.comments.push(newComment);
      }
    },
  },
});

export const { addPost, addComment } = blogSlice.actions;
export default blogSlice.reducer;
