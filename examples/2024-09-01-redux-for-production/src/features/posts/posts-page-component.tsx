import { AddPostComponent } from './add-post-component';
import { PostsListComponent } from './posts-list-component';

export function PostsPageComponent() {
  return (
    <main>
      <div className="mx-auto max-w-xl">
        <AddPostComponent />
      </div>

      <div className="mx-auto mt-10 max-w-xl">
        <PostsListComponent />
      </div>
    </main>
  );
}
