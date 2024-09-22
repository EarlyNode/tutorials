import { Spinner } from '@/components/spinner';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

import { useAddPostMutation } from './posts-api';

export function AddPostComponent() {
  const [addPost, { isLoading }] = useAddPostMutation();

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const formData = new FormData(event.currentTarget);
      const title = formData.get('post-title') as string;
      const body = formData.get('post-body') as string;

      await addPost({ title, body }).unwrap();
    } catch (error) {
      console.error('Failed to save the post:', error);
    }
  };

  return (
    <form onSubmit={onSubmit}>
      <fieldset className="space-y-4" disabled={isLoading}>
        <div>
          <Label htmlFor="post-title">Title</Label>
          <Input id="post-title" name="post-title" required />
        </div>

        <div>
          <Label htmlFor="post-body">Body</Label>
          <Input id="post-body" name="post-body" required />
        </div>

        <Button type="submit">
          {isLoading ? (
            <span className="flex items-center">
              Saving...
              <Spinner className="ml-2 h-4 w-4 animate-spin" />
            </span>
          ) : (
            'Add Post'
          )}
        </Button>
      </fieldset>
    </form>
  );
}
