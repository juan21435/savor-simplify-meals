
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { Progress } from '@/components/ui/progress';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { Search, Plus, Package, AlertCircle, Check } from 'lucide-react';

// Sample inventory data - in a real app, this would come from a database
const inventoryItems = [
  {
    id: '1',
    name: 'Flour',
    category: 'Baking',
    quantity: 1500,
    unit: 'g',
    minQuantity: 500,
    expiryDate: '2025-12-31'
  },
  {
    id: '2',
    name: 'Sugar',
    category: 'Baking',
    quantity: 800,
    unit: 'g',
    minQuantity: 250,
    expiryDate: '2025-11-15'
  },
  {
    id: '3',
    name: 'Rice',
    category: 'Grains',
    quantity: 2000,
    unit: 'g',
    minQuantity: 500,
    expiryDate: '2025-10-01'
  },
  {
    id: '4',
    name: 'Olive Oil',
    category: 'Oils & Vinegars',
    quantity: 500,
    unit: 'ml',
    minQuantity: 100,
    expiryDate: '2025-06-30'
  },
  {
    id: '5',
    name: 'Pasta',
    category: 'Pasta & Rice',
    quantity: 200,
    unit: 'g',
    minQuantity: 200,
    expiryDate: '2025-08-15'
  },
  {
    id: '6',
    name: 'Canned Tomatoes',
    category: 'Canned Goods',
    quantity: 2,
    unit: 'cans',
    minQuantity: 2,
    expiryDate: '2025-12-31'
  }
];

const categories = [
  "All",
  "Baking", 
  "Canned Goods", 
  "Dairy", 
  "Fruits & Vegetables", 
  "Grains", 
  "Herbs & Spices", 
  "Meat & Seafood", 
  "Oils & Vinegars",
  "Pasta & Rice",
  "Snacks"
];

const Inventory = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortBy, setSortBy] = useState('name');
  
  const filteredItems = inventoryItems.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });
  
  const sortedItems = [...filteredItems].sort((a, b) => {
    if (sortBy === 'name') {
      return a.name.localeCompare(b.name);
    } else if (sortBy === 'quantity') {
      return b.quantity - a.quantity;
    } else if (sortBy === 'expiry') {
      return new Date(a.expiryDate).getTime() - new Date(b.expiryDate).getTime();
    }
    return 0;
  });
  
  // Low stock calculation
  const lowStockItems = inventoryItems.filter(item => item.quantity <= item.minQuantity).length;
  
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">
              Total Items
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{inventoryItems.length}</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">
              Categories
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{new Set(inventoryItems.map(item => item.category)).size}</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-orange-500 flex items-center gap-2">
              <AlertCircle size={16} />
              Low Stock Items
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-500">{lowStockItems}</div>
          </CardContent>
        </Card>
      </div>
      
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-4 justify-between mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input 
                placeholder="Search inventory..." 
                className="pl-9" 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <div className="flex gap-3">
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="All categories" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category}>{category}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-[150px]">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="name">Name</SelectItem>
                  <SelectItem value="quantity">Quantity</SelectItem>
                  <SelectItem value="expiry">Expiry Date</SelectItem>
                </SelectContent>
              </Select>
              
              <Button className="bg-herb-600 hover:bg-herb-700">
                <Plus size={16} className="mr-2" />
                Add Item
              </Button>
            </div>
          </div>
          
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Item</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Quantity</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Expiry Date</TableHead>
                  <TableHead className="w-[100px]">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {sortedItems.map((item) => {
                  const percentage = (item.quantity / item.minQuantity) * 100;
                  const isLowStock = item.quantity <= item.minQuantity;
                  
                  return (
                    <TableRow key={item.id}>
                      <TableCell className="font-medium">{item.name}</TableCell>
                      <TableCell>
                        <Badge variant="outline">{item.category}</Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <span>{item.quantity} {item.unit}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex flex-col gap-1">
                          <div className="flex items-center gap-2">
                            {isLowStock ? (
                              <Badge variant="outline" className="text-orange-500 border-orange-500">Low Stock</Badge>
                            ) : (
                              <Badge variant="outline" className="text-green-500 border-green-500">In Stock</Badge>
                            )}
                          </div>
                          <Progress 
                            value={Math.min(percentage, 100)} 
                            className={isLowStock ? "h-2 bg-orange-100" : "h-2 bg-green-100"}
                          />
                        </div>
                      </TableCell>
                      <TableCell>{new Date(item.expiryDate).toLocaleDateString()}</TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button variant="outline" size="icon" className="h-8 w-8">
                            <Plus size={14} />
                          </Button>
                          <Button variant="outline" size="icon" className="h-8 w-8">
                            <Check size={14} />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Inventory;
