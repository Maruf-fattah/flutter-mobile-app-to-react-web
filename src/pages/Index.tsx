import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { 
  Wallet, 
  TrendingUp, 
  PiggyBank, 
  BarChart3,
  Shield,
  Smartphone,
  ArrowRight,
  CheckCircle
} from "lucide-react";

const features = [
  {
    icon: Wallet,
    title: "Expense Tracking",
    description: "Track daily expenses with smart categorization and vendor-specific tracking"
  },
  {
    icon: TrendingUp,
    title: "Income Management",
    description: "Monitor multiple income sources and analyze earning patterns"
  },
  {
    icon: PiggyBank,
    title: "Savings Goals",
    description: "Set and track savings goals with progress visualization"
  },
  {
    icon: BarChart3,
    title: "Analytics & Insights",
    description: "Generate detailed reports and gain insights into spending habits"
  },
  {
    icon: Shield,
    title: "Secure & Private",
    description: "Your financial data is encrypted and stored securely"
  },
  {
    icon: Smartphone,
    title: "Mobile Optimized",
    description: "Responsive design that works perfectly on all devices"
  }
];

const benefits = [
  "Real-time expense tracking",
  "Budget analysis and forecasting",
  "Loan installment management",
  "Data export capabilities",
  "Dark mode support",
  "Offline functionality"
];

export default function Index() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary/5 via-background to-accent/5">
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center space-y-8">
            <Badge variant="secondary" className="mb-4">
              Personal Finance Made Simple
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold text-foreground">
              Daily <span className="text-primary">Expenses</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Take control of your finances with our intuitive expense tracking app. 
              Monitor spending, manage budgets, and achieve your financial goals with ease.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link to="/dashboard">
                <Button size="lg" className="gap-2 px-8">
                  Get Started
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              <Button variant="outline" size="lg">
                Learn More
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Everything You Need
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Comprehensive financial management tools designed for modern users
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Card key={index} className="card-hover">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="p-3 rounded-lg bg-primary/10">
                        <Icon className="h-6 w-6 text-primary" />
                      </div>
                      <h3 className="text-xl font-semibold text-foreground">
                        {feature.title}
                      </h3>
                    </div>
                    <p className="text-muted-foreground">
                      {feature.description}
                    </p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
                Why Choose Daily Expenses?
              </h2>
              <p className="text-lg text-muted-foreground mb-8">
                Our app combines powerful features with an intuitive interface to make 
                financial management effortless and effective.
              </p>
              
              <div className="space-y-4">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-success flex-shrink-0" />
                    <span className="text-foreground">{benefit}</span>
                  </div>
                ))}
              </div>
              
              <div className="mt-8">
                <Link to="/dashboard">
                  <Button size="lg" className="gap-2">
                    Start Managing Your Finances
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </div>
            
            <div className="relative">
              <Card className="p-8 bg-gradient-to-br from-primary/5 to-accent/5">
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Total Balance</span>
                    <Badge variant="secondary">Live Preview</Badge>
                  </div>
                  <div className="text-3xl font-bold text-foreground">$12,450.00</div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 rounded-lg bg-success/10">
                      <div className="text-sm text-muted-foreground">Income</div>
                      <div className="text-xl font-semibold text-success">+$4,250</div>
                    </div>
                    <div className="p-4 rounded-lg bg-destructive/10">
                      <div className="text-sm text-muted-foreground">Expenses</div>
                      <div className="text-xl font-semibold text-destructive">-$2,890</div>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex justify-between text-sm">
                      <span>Monthly Budget</span>
                      <span>72% used</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div className="bg-primary h-2 rounded-full" style={{ width: '72%' }}></div>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-primary/5">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
            Ready to Take Control?
          </h2>
          <p className="text-xl text-muted-foreground mb-8">
            Join thousands of users who have transformed their financial habits with Daily Expenses
          </p>
          <Link to="/dashboard">
            <Button size="lg" className="gap-2 px-8">
              Start Your Journey
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}