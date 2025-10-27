
import Layout from "@/components/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export default function Balance() {
  return (
    <Layout>
      <div className="space-y-6 animate-fade-in">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Balance</h1>
            <p className="text-muted-foreground">View and manage your account balances</p>
          </div>
          <Button>Update Balance</Button>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Balance Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center py-12">
              <p className="text-muted-foreground">Balance management features coming soon...</p>
              <Badge variant="secondary" className="mt-2">Under Development</Badge>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
}