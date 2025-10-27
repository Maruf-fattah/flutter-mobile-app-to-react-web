
import { ReactNode } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Home, 
  BarChart3, 
  Wallet, 
  TrendingUp, 
  PiggyBank, 
  Store, 
  List, 
  Settings,
  Menu,
  Sun,
  Moon
} from "lucide-react";
import { useTheme } from "next-themes";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

interface LayoutProps {
  children: ReactNode;
}

const navigation = [
  { name: "Dashboard", href: "/dashboard", icon: Home },
  { name: "Expenses", href: "/expenses", icon: BarChart3 },
  { name: "Income", href: "/income", icon: TrendingUp },
  { name: "Balance", href: "/balance", icon: Wallet },
  { name: "Savings", href: "/savings", icon: PiggyBank },
  { name: "Shops", href: "/shops", icon: Store },
  { name: "Lists", href: "/lists", icon: List },
  { name: "Analytics", href: "/analytics", icon: BarChart3 },
  { name: "Settings", href: "/settings", icon: Settings },
];

export default function Layout({ children }: LayoutProps) {
  const location = useLocation();
  const { theme, setTheme } = useTheme();

  const NavContent = () => (
    <div className="flex flex-col h-full">
      <div className="p-6">
        <h1 className="text-2xl font-bold text-primary">Daily Expenses</h1>
        <p className="text-sm text-muted-foreground mt-1">Personal Finance Manager</p>
      </div>
      
      <nav className="flex-1 px-4 space-y-2">
        {navigation.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.href;
          
          return (
            <Link key={item.name} to={item.href}>
              <Button
                variant={isActive ? "default" : "ghost"}
                className="w-full justify-start gap-3 h-12"
              >
                <Icon className="h-5 w-5" />
                {item.name}
                {isActive && <Badge variant="secondary" className="ml-auto">Active</Badge>}
              </Button>
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t">
        <Button
          variant="outline"
          size="sm"
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          className="w-full gap-2"
        >
          {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          {theme === "dark" ? "Light Mode" : "Dark Mode"}
        </Button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-background">
      {/* Desktop Sidebar */}
      <div className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col">
        <Card className="flex grow flex-col gap-y-5 overflow-y-auto border-r bg-card">
          <NavContent />
        </Card>
      </div>

      {/* Mobile Header */}
      <div className="sticky top-0 z-40 flex h-16 shrink-0 items-center gap-x-4 border-b bg-card px-4 shadow-sm lg:hidden">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon">
              <Menu className="h-5 w-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-72 p-0">
            <NavContent />
          </SheetContent>
        </Sheet>
        
        <div className="flex-1">
          <h1 className="text-lg font-semibold text-foreground">Daily Expenses</h1>
        </div>
      </div>

      {/* Main Content */}
      <main className="lg:pl-72">
        <div className="px-4 py-6 lg:px-8">
          {children}
        </div>
      </main>
    </div>
  );
}