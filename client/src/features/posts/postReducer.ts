import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

type Post = {
  id?: number;
  nickname: string;
  description: string;
};

type PostState = {
  posts: Post[];
  error: boolean | string;
  success: boolean;
  loading: boolean;
};

const initialState: PostState = {
  posts: [],
  error: "",
  success: false,
  loading: true,
};

//get post
export const getPosts = createAsyncThunk<Post[]>(
  "posts/getPosts",
  async (_, thunkAPI) => {
    try {
      const response = await axios.get("http://localhost:3000/posts");
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const getPostById = createAsyncThunk<Post, string>(
  "games/getGameById",
  async (id, thunkAPI) => {
    try {
      const response = await axios.get(`http://localhost:3000/posts/${id}`);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const createPost = createAsyncThunk<Object, Post>(
  "posts/createPost",
  async (data, thunkAPI) => {
    try {
      const response = await axios.post("http://localhost:3000/posts", data);
      thunkAPI.dispatch(getPosts());
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const updatePost = createAsyncThunk<Post, Object | any>(
  "posts/updatePost",
  async (data, thunkAPI) => {
    try {
      const response = await axios.put(
        `http://localhost:3000/posts/${data.id}`,
        data
      );
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const deletePost = createAsyncThunk<number, number>(
  "posts/deletePost",
  async (id, thunkAPI) => {
    try {
      const response = await axios.delete(`http://localhost:3000/posts/${id}`);
      thunkAPI.dispatch(getPosts());
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

const PostSlice = createSlice({
  name: "post",
  initialState,
  reducers: {
    setPosts: (state, action: PayloadAction<Post[]>) => {
      state.posts = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getPosts.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(
      getPosts.fulfilled,
      (state, action: PayloadAction<Post[]>) => {
        state.loading = false;
        state.success = true;
        state.posts = action.payload;
      }
    );
    builder.addCase(getPosts.rejected, (state) => {
      state.loading = false;
      state.error = true;
    });

    //create Post
    builder.addCase(createPost.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(
      createPost.rejected,
      (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.posts = [];
        state.error = action.payload.message || "Something went wrong";
      }
    );

    //Delete post
    builder.addCase(deletePost.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(deletePost.fulfilled, (state, action) => {
      state.loading = false;
      state.success = true;
      state.posts = state.posts.filter((post) => post.id !== action.payload);
    });
    builder.addCase(deletePost.rejected, (state, action) => {
      state.loading = false;
      state.error = true;
    });
  },
});

export default PostSlice.reducer;
export const { setPosts } = PostSlice.actions;
