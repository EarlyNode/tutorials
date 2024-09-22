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

import { DashboardPagePropsFromRedux } from './dashboard-page-container';

export function DashBoardPageComponent({
  currentUsersName,
  isLoading,
  users,
  onLogout,
}: Omit<DashboardPagePropsFromRedux, 'fetchUserProfiles'>) {
  return (
    <main className="p-4">
      <Card className="mx-auto max-w-sm">
        <CardHeader>
          <CardTitle>Dashboard</CardTitle>
          <CardDescription>Welcome back, {currentUsersName}!</CardDescription>
        </CardHeader>

        <CardContent>
          {isLoading ? (
            <Spinner className="mx-auto animate-spin" />
          ) : (
            <ul>
              {users.map(user => (
                <li key={user.id}>{user.name}</li>
              ))}
            </ul>
          )}
        </CardContent>

        <CardFooter>
          <Button
            className="ml-auto"
            variant="destructive"
            onClick={() => {
              onLogout();
            }}
          >
            Logout
          </Button>
        </CardFooter>
      </Card>
    </main>
  );
}
