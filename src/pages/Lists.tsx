
import Layout from "@/components/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export default function Lists() {
  return (
    <Layout>
      <div className="space-y-6 animate-fade-in">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Lists</h1>
            <p className="text-muted-foreground">Create and manage grocery and product lists</p>
          </div>
          <Button>Create List</Button>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>List Management</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center py-12">
              <p className="text-muted-foreground">List management features coming soon...</p>
              <Badge variant="secondary" className="mt-2">Under Development</Badge>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
}