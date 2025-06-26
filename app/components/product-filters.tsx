"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { getCategories } from "@/services/categoryservice";
import { getManufacturer } from "@/services/categoryservice";

interface FilterProps {
  onFiltersChange: (filters: any) => void
}

export function ProductFilters({ onFiltersChange }: FilterProps) {
  const [priceRange, setPriceRange] = useState({ min: "", max: "" })
  const [selectedBrands, setSelectedBrands] = useState<string[]>([])
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [categories, setCategories] = useState<{ id: string; name: string }[]>([])
  const [brands, setBrands] = useState<{ id: string; name: string }[]>([])

  useEffect(() => {
    async function fetchManufacturers() {
      const fetchedManufacturers =  await getManufacturer()
   
      setBrands(
        fetchedManufacturers.map((manufacturer) => ({
          id: manufacturer.id.toString(),
          name: manufacturer.name,
        }))
      )
    }
    fetchManufacturers()
  }, [])

  useEffect(() => {
    async function fetchCategories() {
      const fetchedCategories = await getCategories()

      setCategories(
        fetchedCategories.map((category) => ({
          id: category.id.toString(),
          name: category.name,
        }))
      )
    }
    fetchCategories()
  }, [])

  useEffect(() => {
    onFiltersChange({
      minPrice: priceRange.min,
      maxPrice: priceRange.max,
      brands: selectedBrands,
      categories: selectedCategories,
    })
  }, [priceRange, selectedBrands, selectedCategories, onFiltersChange])

  const handleBrandChange = (brand: string, checked: boolean) => {
    if (checked) {
      setSelectedBrands([...selectedBrands, brand])
    } else {
      setSelectedBrands(selectedBrands.filter((b) => b !== brand))
    }
  }

  const handleCategoryChange = (category: string, checked: boolean) => {
    if (checked) {
      setSelectedCategories([...selectedCategories, category])
    } else {
      setSelectedCategories(selectedCategories.filter((c) => c !== category))
    }
  }

  const clearFilters = () => {
    setPriceRange({ min: "", max: "" })
    setSelectedBrands([])
    setSelectedCategories([])
  }

  return (
    <div className="">
      <Card>

        <CardContent className="space-y-6 p-4">
          {/* Price Range */}
          <div>
            <Label className="text-sm font-medium mb-3 block">Цена</Label>
            <div className="flex space-x-2">
              <Input
                type="number"
                placeholder="От"
                value={priceRange.min}
                onChange={(e) => setPriceRange({ ...priceRange, min: e.target.value })}
              />
              <Input
                type="number"
                placeholder="До"
                value={priceRange.max}
                onChange={(e) => setPriceRange({ ...priceRange, max: e.target.value })}
              />
            </div>
          </div>
          <div>
            
            <Label className="text-sm font-medium mb-3 block">Категории</Label>
            <div className="space-y-2">
              {categories.map((category) => (
                <div key={category.id} className="flex items-center space-x-2">
                  <Checkbox
                    id={category.id}
                    checked={selectedCategories.includes(category.id)}
                    onCheckedChange={(checked: boolean) => handleCategoryChange(category.id, checked)}
                  />
                  <Label htmlFor={category.id} className="text-sm">
                    {category.name}
                  </Label>
                </div>
              ))}
            </div>
          </div>

          {/* Brands */}
          <div>
            <Label className="text-sm font-medium mb-3 block">Производител</Label>
            <div className="space-y-2">
              {brands.map((brand) => (
                <div key={brand.id} className="flex items-center space-x-2">
                  <Checkbox
                  id={brand.id}
                    checked={selectedBrands.includes(brand.id)}
                    onCheckedChange={(checked: boolean) => handleBrandChange(brand.id, checked as boolean)}
                  />
                  <Label htmlFor={brand.id} className="text-sm">
                    {brand.name}
                  </Label>
                </div>
              ))}
            </div>
          </div>

          <Button onClick={clearFilters} variant="outline" className="w-full">
            Изчисти филтрите
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
