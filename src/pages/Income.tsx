import { useState, useEffect } from 'react';
import Layout from "@/components/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { TransactionForm } from "@/components/forms/TransactionForm";
import { Transaction, Category, Shop } from '@/types';
import { 
  getTransactions, 
  saveTransaction, 
  deleteTransaction, 
  getCategories, 
  getShops 
} from '@/lib/storage';
import { formatCurrency, formatDate, searchTransactions } from '@/lib/utils';
import { 
  Plus, 
  Search, 
  Filter, 
  Edit, 
  Trash2, 
  Calendar,
  Tag,
  TrendingUp
} from 'lucide-react';

export default function Income() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [shops, setShops] = useState<Shop[]>([]);
  const [filteredTransactions, setFilteredTransactions] = useState<Transaction[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedPeriod, setSelectedPeriod] = useState<string>('all');
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingTransaction, setEditingTransaction] = useState<Transaction | undefined>();

  useEffect(() => {
    loadData();
  }, []);

  useEffect(() => {
    filterTransactions();
  }, [transactions, searchQuery, selectedCategory, selectedPeriod]);

  const loadData = () => {
    const allTransactions = getTransactions();
    const incomeTransactions = allTransactions.filter(t => t.type === 'income');
    setTransactions(incomeTransactions);
    setCategories(getCategories());
    setShops(getShops());
  };

  const filterTransactions = () => {
    let filtered = transactions;

    if (searchQuery) {
      filtered = searchTransactions(filtered, searchQuery);
    }

    if (selectedCategory !== 'all') {
      filtered = filtered.filter(t => t.category === selectedCategory);
    }

    if (selectedPeriod !== 'all') {
      const now = new Date();
      const startDate = new Date();

      switch (selectedPeriod) {
        case 'today':
          startDate.setHours(0, 0, 0, 0);
          filtered = filtered.filter(t => new Date(t.date) >= startDate);
          break;
        case 'week':
          startDate.setDate(now.getDate() - 7);
          filtered = filtered.filter(t => new Date(t.date) >= startDate);
          break;
        case 'month':
          startDate.setMonth(now.getMonth() - 1);
          filtered = filtered.filter(t => new Date(t.date) >= startDate);
          break;
        case 'year':
          startDate.setFullYear(now.getFullYear() - 1);
          filtered = filtered.filter(t => new Date(t.date) >= startDate);
          break;
      }
    }

    filtered.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    setFilteredTransactions(filtered);
  };

  const handleAddTransaction = (transaction: Transaction) => {
    saveTransaction(transaction);
    loadData();
    setIsFormOpen(false);
  };

  const handleEditTransaction = (transaction: Transaction) => {
    saveTransaction(transaction);
    loadData();
    setEditingTransaction(undefined);
    setIsFormOpen(false);
  };

  const handleDeleteTransaction = (id: string) => {
    if (confirm('Are you sure you want to delete this income entry?')) {
      deleteTransaction(id);
      loadData();
    }
  };

  const openEditForm = (transaction: Transaction) => {
    setEditingTransaction(transaction);
    setIsFormOpen(true);
  };

  const closeForm = () => {
    setIsFormOpen(false);
    setEditingTransaction(undefined);
  };

  const totalIncome = filteredTransactions.reduce((sum, t) => sum + t.amount, 0);
  const incomeCategories = categories.filter(c => c.type === 'income');

  return (
    <Layout>
      <div className="space-y-6 animate-fade-in">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Income</h1>
            <p className="text-muted-foreground">Track and manage your income sources</p>
          </div>
          
          <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
            <DialogTrigger asChild>
              <Button className="gap-2">
                <Plus className="h-4 w-4" />
                Add Income
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
              <TransactionForm
                transaction={editingTransaction}
                categories={categories}
                shops={shops}
                onSubmit={editingTransaction ? handleEditTransaction : handleAddTransaction}
                onCancel={closeForm}
              />
            </DialogContent>
          </Dialog>
        </div>

        {/* Summary Card */}
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-lg bg-success/10">
                <TrendingUp className="h-6 w-6 text-success" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Income</p>
                <p className="text-2xl font-bold text-foreground">
                  {formatCurrency(totalIncome)}
                </p>
                <p className="text-sm text-muted-foreground">
                  {filteredTransactions.length} income entries
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Filters */}
        <Card>
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search income..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger>
                  <SelectValue placeholder="All Categories" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  {incomeCategories.map(category => (
                    <SelectItem key={category.id} value={category.name}>
                      <div className="flex items-center gap-2">
                        <div 
                          className="w-3 h-3 rounded-full" 
                          style={{ backgroundColor: category.color }}
                        />
                        {category.name}
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              
              <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
                <SelectTrigger>
                  <SelectValue placeholder="All Time" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Time</SelectItem>
                  <SelectItem value="today">Today</SelectItem>
                  <SelectItem value="week">Last 7 Days</SelectItem>
                  <SelectItem value="month">Last 30 Days</SelectItem>
                  <SelectItem value="year">Last Year</SelectItem>
                </SelectContent>
              </Select>
              
              <Button variant="outline" className="gap-2">
                <Filter className="h-4 w-4" />
                More Filters
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Income List */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Income</CardTitle>
          </CardHeader>
          <CardContent>
            {filteredTransactions.length === 0 ? (
              <div className="text-center py-8">
                <TrendingUp className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">No income entries found</p>
                <p className="text-sm text-muted-foreground">
                  {searchQuery || selectedCategory !== 'all' || selectedPeriod !== 'all'
                    ? 'Try adjusting your filters'
                    : 'Add your first income entry to get started'
                  }
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {filteredTransactions.map(transaction => {
                  const category = categories.find(c => c.name === transaction.category);
                  return (
                    <div 
                      key={transaction.id}
                      className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors"
                    >
                      <div className="flex items-center gap-4">
                        <div 
                          className="w-10 h-10 rounded-lg flex items-center justify-center"
                          style={{ backgroundColor: `${category?.color}20` }}
                        >
                          <div 
                            className="w-4 h-4 rounded-full"
                            style={{ backgroundColor: category?.color }}
                          />
                        </div>
                        
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className="font-medium text-foreground">
                              {transaction.description}
                            </h3>
                            {transaction.recurring && (
                              <Badge variant="secondary" className="text-xs">
                                Recurring
                              </Badge>
                            )}
                          </div>
                          
                          <div className="flex items-center gap-4 text-sm text-muted-foreground">
                            <span className="flex items-center gap-1">
                              <Tag className="h-3 w-3" />
                              {transaction.category}
                            </span>
                            
                            <span className="flex items-center gap-1">
                              <Calendar className="h-3 w-3" />
                              {formatDate(transaction.date)}
                            </span>
                          </div>
                          
                          {transaction.tags && transaction.tags.length > 0 && (
                            <div className="flex gap-1 mt-2">
                              {transaction.tags.map(tag => (
                                <Badge key={tag} variant="outline" className="text-xs">
                                  {tag}
                                </Badge>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-3">
                        <div className="text-right">
                          <p className="font-semibold text-success">
                            +{formatCurrency(transaction.amount)}
                          </p>
                        </div>
                        
                        <div className="flex gap-1">
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => openEditForm(transaction)}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => handleDeleteTransaction(transaction.id)}
                            className="text-destructive hover:text-destructive"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
}