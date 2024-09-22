'use client';
import { PostsPageComponent } from '@/features/posts/posts-page-component';
import authenticatedPage from '@/hocs/authenticated-page';

export default authenticatedPage(PostsPageComponent);
