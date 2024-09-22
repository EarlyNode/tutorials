import { Spinner } from '@/components/spinner';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

import { useGetPostsQuery } from './posts-api';

export function PostsListComponent() {
  const { data: posts, error, isLoading, refetch } = useGetPostsQuery();

  if (isLoading) {
    return <Spinner className="mx-auto animate-spin" />;
  }

  if (error) {
    // Determine the error message based on the type of error
    let errorMessage = 'An unknown error occurred';
    if ('status' in error) {
      errorMessage = `An error occurred: ${error.status} ${error.data ? JSON.stringify(error.data) : 'Unknown error'}`;
    } else if ('message' in error) {
      errorMessage = `An error occurred: ${error.message}`;
    }

    return (
      <div className="text-red-500">
        {errorMessage}
        <Button onClick={refetch}>Retry</Button>
      </div>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Latest Posts</CardTitle>
      </CardHeader>

      <CardContent>
        <ul className="list-disc pl-5">
          {posts?.slice(0, 5).map(post => (
            <li key={post.id}>
              <strong>{post.title}</strong>
              <p>{post.body}</p>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}
