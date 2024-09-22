import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { Post } from './posts-types';

export const {
  middleware,
  reducer,
  reducerPath,
  useAddPostMutation,
  useGetPostsQuery,
  util,
} = createApi({
  reducerPath: 'postsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://jsonplaceholder.typicode.com/',
    // Can have more options, such as prepareHeaders, credentials etc.
  }),
  tagTypes: ['Posts'],
  endpoints: builder => ({
    getPosts: builder.query<Post[], void>({
      query: () => 'posts',
      providesTags: ['Posts'],
    }),
    addPost: builder.mutation<Post, Partial<Post>>({
      query: body => ({
        url: 'posts',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Posts'],
      async onQueryStarted(argument, { dispatch, queryFulfilled }) {
        const patchResult = dispatch(
          util.updateQueryData('getPosts', undefined, draft => {
            draft.unshift({ id: Date.now(), ...argument } as Post);
          }),
        );
        try {
          await queryFulfilled;
        } catch {
          patchResult.undo();
        }
      },
    }),
  }),
});
