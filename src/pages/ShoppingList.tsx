
import React, { useState } from 'react';
import { Check, Plus, ShoppingCart, Trash } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { Separator } from '@/components/ui/separator';
import { shoppingList as initialShoppingList } from '@/lib/data';

const ShoppingList = () => {
  const [shoppingList, setShoppingList] = useState(initialShoppingList);
  const [newItemName, setNewItemName] = useState('');
  const [newItemCategory, setNewItemCategory] = useState('Produce');
  
  // Group items by category
  const groupedItems = shoppingList.reduce((acc, item) => {
    if (!acc[item.category]) {
      acc[item.category] = [];
    }
    acc[item.category].push(item);
    return acc;
  }, {} as Record<string, typeof shoppingList>);
  
  // Sort categories
  const sortedCategories = Object.keys(groupedItems).sort();
  
  const handleAddItem = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!newItemName.trim()) return;
    
    const newItem = {
      id: Date.now().toString(),
      name: newItemName.trim(),
      checked: false,
      category: newItemCategory
    };
    
    setShoppingList([...shoppingList, newItem]);
    setNewItemName('');
  };
  
  const toggleItemCheck = (id: string) => {
    setShoppingList(
      shoppingList.map(item => 
        item.id === id ? { ...item, checked: !item.checked } : item
      )
    );
  };
  
  const removeItem = (id: string) => {
    setShoppingList(shoppingList.filter(item => item.id !== id));
  };
  
  const clearCheckedItems = () => {
    setShoppingList(shoppingList.filter(item => !item.checked));
  };

  return (
    <div className="container-custom py-12">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <h1 className="text-3xl md:text-4xl font-display font-bold mb-4 md:mb-0 flex items-center gap-3">
          <ShoppingCart className="text-savor-500" />
          Shopping List
        </h1>
        
        <Button 
          variant="outline" 
          className="text-tomato-500 border-tomato-500 hover:bg-tomato-50"
          onClick={clearCheckedItems}
        >
          <Trash size={16} className="mr-2" />
          Clear Checked Items
        </Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2">
          <Card className="overflow-hidden">
            <CardContent className="p-0">
              {sortedCategories.length > 0 ? (
                <div>
                  {sortedCategories.map((category, index) => (
                    <div key={category}>
                      <div className="bg-muted/30 p-4">
                        <h3 className="font-medium">{category}</h3>
                      </div>
                      <ul>
                        {groupedItems[category].map(item => (
                          <li key={item.id} className="flex items-center justify-between p-4 hover:bg-muted/20">
                            <div className="flex items-center">
                              <Checkbox 
                                id={`item-${item.id}`}
                                checked={item.checked}
                                onCheckedChange={() => toggleItemCheck(item.id)}
                                className="mr-4"
                              />
                              <label 
                                htmlFor={`item-${item.id}`}
                                className={`cursor-pointer ${item.checked ? 'line-through text-muted-foreground' : ''}`}
                              >
                                {item.name}
                              </label>
                            </div>
                            <Button 
                              variant="ghost" 
                              size="icon"
                              onClick={() => removeItem(item.id)}
                              className="text-muted-foreground hover:text-tomato-500"
                            >
                              <Trash size={16} />
                            </Button>
                          </li>
                        ))}
                      </ul>
                      {index < sortedCategories.length - 1 && <Separator />}
                    </div>
                  ))}
                </div>
              ) : (
                <div className="p-8 text-center">
                  <p className="text-muted-foreground">Your shopping list is empty</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
        
        <div>
          <Card>
            <CardContent className="p-6">
              <h2 className="text-xl font-display font-medium mb-4">Add New Item</h2>
              <form onSubmit={handleAddItem}>
                <div className="space-y-4">
                  <div>
                    <label htmlFor="item-name" className="block text-sm font-medium mb-1">
                      Item Name
                    </label>
                    <Input
                      id="item-name"
                      placeholder="Enter item name"
                      value={newItemName}
                      onChange={(e) => setNewItemName(e.target.value)}
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="item-category" className="block text-sm font-medium mb-1">
                      Category
                    </label>
                    <select
                      id="item-category"
                      value={newItemCategory}
                      onChange={(e) => setNewItemCategory(e.target.value)}
                      className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                    >
                      <option value="Produce">Produce</option>
                      <option value="Dairy">Dairy</option>
                      <option value="Meat">Meat</option>
                      <option value="Bakery">Bakery</option>
                      <option value="Canned Goods">Canned Goods</option>
                      <option value="Dry Goods">Dry Goods</option>
                      <option value="Freezer">Freezer</option>
                      <option value="Pasta & Rice">Pasta & Rice</option>
                      <option value="Snacks">Snacks</option>
                      <option value="Beverages">Beverages</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                  
                  <Button type="submit" className="w-full bg-herb-600 hover:bg-herb-700">
                    <Plus size={18} className="mr-2" />
                    Add Item
                  </Button>
                </div>
              </form>
              
              <div className="mt-8">
                <h3 className="text-lg font-medium mb-3">Shopping List Stats</h3>
                <div className="bg-muted/30 p-4 rounded-md">
                  <div className="flex justify-between mb-2">
                    <span className="text-muted-foreground">Total Items:</span>
                    <span className="font-medium">{shoppingList.length}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Items Checked:</span>
                    <span className="font-medium">{shoppingList.filter(item => item.checked).length}</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ShoppingList;
