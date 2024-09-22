import { Spinner } from '@/components/spinner';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export function AppLoadingComponent() {
  return (
    <div className="w-full p-4">
      <Card className="mx-auto w-[350px]">
        <CardHeader>
          <CardTitle className="mx-auto">Loading ...</CardTitle>
        </CardHeader>

        <CardContent>
          <Spinner className="mx-auto animate-spin" />
        </CardContent>
      </Card>
    </div>
  );
}
