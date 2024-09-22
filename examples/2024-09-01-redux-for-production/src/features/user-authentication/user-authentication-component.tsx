import { Spinner } from '@/components/spinner';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

import { UserAuthenticationPropsFromRedux } from './user-authentication-container';

export function UserAuthenticationComponent({
  isLoading,
  onLogin,
}: UserAuthenticationPropsFromRedux) {
  return (
    <main className="p-4">
      <Card className="mx-auto w-full max-w-sm">
        <CardHeader>
          <CardTitle className="text-2xl">Login</CardTitle>

          <CardDescription>
            Enter your email below to login to your account.
          </CardDescription>
        </CardHeader>

        <form
          onSubmit={event => {
            event.preventDefault();
            const formData = new FormData(event.currentTarget);
            onLogin({
              email: formData.get('email') as string,
              password: formData.get('password') as string,
            });
          }}
        >
          <fieldset disabled={isLoading}>
            <CardContent className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>

                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  required
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="password">Password</Label>

                <Input id="password" type="password" required />
              </div>
            </CardContent>

            <CardFooter>
              <Button className="w-full" type="submit">
                {isLoading ? (
                  <span className="flex items-center">
                    Authenticating ...
                    <Spinner className="ml-2 h-4 w-4 animate-spin" />
                  </span>
                ) : (
                  'Login'
                )}
              </Button>
            </CardFooter>
          </fieldset>
        </form>
      </Card>
    </main>
  );
}
