import { Component } from "@angular/core"
import { CommonModule } from "@angular/common"
import { FormsModule } from "@angular/forms"
import { RouterLink, RouterLinkActive } from "@angular/router"

interface Product {
  id: number
  name: string
  artist: string
  category: string
  price: number
  boughtPrice: number // Add bought price
  status: string
  type: string
}

@Component({
  selector: "app-products",
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink, RouterLinkActive],
  template: `
    <div class="space-y-6">
      <!-- Header -->
      <div class="flex flex-col md:flex-row md:items-center md:justify-between">
        <div>
          <h1 class="text-2xl font-semibold">Products</h1>
          <p class="text-gray-500 mt-1">Manage your inventory of vinyl records, antiques, and equipment</p>
        </div>
        <div class="mt-4 md:mt-0">
          <button class="bg-teal hover:bg-teal/90 text-white px-4 py-2 rounded-lg flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            Add New Product
          </button>
        </div>
      </div>

      <!-- Product Type Navigation -->
      <div class="bg-white rounded-lg shadow-sm p-4">
        <nav class="flex space-x-2 border-b">
          <button 
            (click)="setProductType('all')" 
            class="px-4 py-2 font-medium text-sm transition-colors relative"
            [class.text-teal]="selectedProductType === 'all'"
            [class.text-gray-600]="selectedProductType !== 'all'"
          >
            All Products
            <span 
              *ngIf="selectedProductType === 'all'" 
              class="absolute bottom-0 left-0 w-full h-0.5 bg-teal"
            ></span>
          </button>
          <button 
            (click)="setProductType('vinyl')" 
            class="px-4 py-2 font-medium text-sm transition-colors relative"
            [class.text-teal]="selectedProductType === 'vinyl'"
            [class.text-gray-600]="selectedProductType !== 'vinyl'"
          >
            Vinyl Records
            <span 
              *ngIf="selectedProductType === 'vinyl'" 
              class="absolute bottom-0 left-0 w-full h-0.5 bg-teal"
            ></span>
          </button>
          <button 
            (click)="setProductType('antique')" 
            class="px-4 py-2 font-medium text-sm transition-colors relative"
            [class.text-teal]="selectedProductType === 'antique'"
            [class.text-gray-600]="selectedProductType !== 'antique'"
          >
            Antiques
            <span 
              *ngIf="selectedProductType === 'antique'" 
              class="absolute bottom-0 left-0 w-full h-0.5 bg-teal"
            ></span>
          </button>
          <button 
            (click)="setProductType('equipment')" 
            class="px-4 py-2 font-medium text-sm transition-colors relative"
            [class.text-teal]="selectedProductType === 'equipment'"
            [class.text-gray-600]="selectedProductType !== 'equipment'"
          >
            Equipment
            <span 
              *ngIf="selectedProductType === 'equipment'" 
              class="absolute bottom-0 left-0 w-full h-0.5 bg-teal"
            ></span>
          </button>
        </nav>
      </div>

      <!-- Filters -->
      <div class="bg-white rounded-lg shadow-sm p-6">
        <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label for="search" class="block text-sm font-medium text-gray-700 mb-1">Search</label>
            <input
              type="text"
              id="search"
              [(ngModel)]="filters.search"
              placeholder="Search products..."
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal focus:border-transparent"
            />
          </div>
          <div>
            <label for="category" class="block text-sm font-medium text-gray-700 mb-1">Category</label>
            <select
              id="category"
              [(ngModel)]="filters.category"
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal focus:border-transparent"
            >
              <option value="">All Categories</option>
              <option value="Rock">Rock</option>
              <option value="Jazz">Jazz</option>
              <option value="Pop">Pop</option>
              <option value="Hip Hop">Hip Hop</option>
              <option value="Classical">Classical</option>
              <option value="Equipment">Equipment</option>
              <option value="Antique">Antique</option>
            </select>
          </div>
          <div>
            <label for="status" class="block text-sm font-medium text-gray-700 mb-1">Status</label>
            <select
              id="status"
              [(ngModel)]="filters.status"
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal focus:border-transparent"
            >
              <option value="">All Statuses</option>
              <option value="Available">Available</option>
              <option value="Sold Out">Sold Out</option>
            </select>
          </div>
          <div>
            <label for="sort" class="block text-sm font-medium text-gray-700 mb-1">Sort By</label>
            <select
              id="sort"
              [(ngModel)]="filters.sort"
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal focus:border-transparent"
            >
              <option value="name">Name</option>
              <option value="price">Price</option>
            </select>
          </div>
        </div>
        <div class="mt-4 flex justify-end">
          <button
            (click)="applyFilters()"
            class="bg-teal hover:bg-teal/90 text-white px-4 py-2 rounded-md flex items-center gap-2"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
            </svg>
            Apply Filters
          </button>
        </div>
      </div>

      <!-- Products Table -->
      <div class="bg-white rounded-lg shadow-sm overflow-hidden">
        <div class="overflow-x-auto">
          <table class="min-w-full divide-y divide-gray-200">
            <thead class="bg-gray-50">
              <tr>
                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product</th>
                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Bought Price</th>
                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Selling Price</th>
                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Profit</th>
                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th scope="col" class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-200">
              @for (product of filteredProducts; track product.id) {
                <tr>
                  <td class="px-6 py-4 whitespace-nowrap">
                    <div class="flex items-center">
                      <div class="h-10 w-10 flex-shrink-0 bg-gray-100 rounded-md flex items-center justify-center">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
                        </svg>
                      </div>
                      <div class="ml-4">
                        <div class="text-sm font-medium text-gray-900">{{ product.name }}</div>
                        <div class="text-sm text-gray-500">{{ product.artist }}</div>
                      </div>
                    </div>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap">
                    <span
                      class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full"
                      [ngClass]="{
                        'bg-blue-100 text-blue-800': product.type === 'vinyl',
                        'bg-yellow-100 text-yellow-800': product.type === 'antique',
                        'bg-green-100 text-green-800': product.type === 'equipment'
                      }"
                    >
                      {{ product.type | titlecase }}
                    </span>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{{ product.category }}</td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">£{{ product.boughtPrice.toFixed(2) }}</td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">£{{ product.price.toFixed(2) }}</td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm" [ngClass]="{'text-green-600': product.price - product.boughtPrice > 0, 'text-red-600': product.price - product.boughtPrice < 0}">
                    £{{ (product.price - product.boughtPrice).toFixed(2) }}
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap">
                    <span
                      class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full"
                      [ngClass]="{
                        'bg-green-100 text-green-800': product.status === 'Available',
                        'bg-red-100 text-red-800': product.status === 'Sold Out'
                      }"
                    >
                      {{ product.status }}
                    </span>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button class="text-teal hover:text-teal/80 mr-3">Edit</button>
                    <button class="text-red-600 hover:text-red-800">Delete</button>
                  </td>
                </tr>
              }
            </tbody>
          </table>
        </div>
        <div class="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
          <div class="flex-1 flex justify-between sm:hidden">
            <button class="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
              Previous
            </button>
            <button class="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
              Next
            </button>
          </div>
          <div class="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
            <div>
              <p class="text-sm text-gray-700">
                Showing <span class="font-medium">1</span> to <span class="font-medium">{{ filteredProducts.length }}</span> of <span class="font-medium">{{ filteredProducts.length }}</span> results
              </p>
            </div>
            <div>
              <nav class="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                <button class="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                  <span class="sr-only">Previous</span>
                  <svg class="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                    <path fill-rule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clip-rule="evenodd" />
                  </svg>
                </button>
                <button class="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50">
                  1
                </button>
                <button class="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                  <span class="sr-only">Next</span>
                  <svg class="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                    <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd" />
                  </svg>
                </button>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
})
export class ProductsComponent {
  filters = {
    search: "",
    category: "",
    status: "",
    sort: "name",
  }

  selectedProductType = "all"

  products: Product[] = [
    {
      id: 1,
      name: "Dark Side of the Moon",
      artist: "Pink Floyd",
      category: "Rock",
      price: 29.99,
      boughtPrice: 15.0,
      status: "Available",
      type: "vinyl",
    },
    {
      id: 2,
      name: "Kind of Blue",
      artist: "Miles Davis",
      category: "Jazz",
      price: 24.99,
      boughtPrice: 12.5,
      status: "Available",
      type: "vinyl",
    },
    {
      id: 3,
      name: "Abbey Road",
      artist: "The Beatles",
      category: "Rock",
      price: 27.99,
      boughtPrice: 14.0,
      status: "Available",
      type: "vinyl",
    },
    {
      id: 4,
      name: "Thriller",
      artist: "Michael Jackson",
      category: "Pop",
      price: 22.99,
      boughtPrice: 11.5,
      status: "Sold Out",
      type: "vinyl",
    },
    {
      id: 5,
      name: "Back in Black",
      artist: "AC/DC",
      category: "Rock",
      price: 25.99,
      boughtPrice: 13.0,
      status: "Available",
      type: "vinyl",
    },
    {
      id: 6,
      name: "Vintage Clock",
      artist: "N/A",
      category: "Antique",
      price: 299.99,
      boughtPrice: 150.0,
      status: "Available",
      type: "antique",
    },
    {
      id: 7,
      name: "Art Deco Lamp",
      artist: "N/A",
      category: "Antique",
      price: 450.0,
      boughtPrice: 225.0,
      status: "Available",
      type: "antique",
    },
    {
      id: 8,
      name: "Tube Amplifier",
      artist: "Marshall",
      category: "Equipment",
      price: 899.99,
      boughtPrice: 450.0,
      status: "Available",
      type: "equipment",
    },
    {
      id: 9,
      name: "Vintage Turntable",
      artist: "Technics",
      category: "Equipment",
      price: 1299.99,
      boughtPrice: 650.0,
      status: "Available",
      type: "equipment",
    },
    {
      id: 10,
      name: "Professional Microphone",
      artist: "Shure",
      category: "Equipment",
      price: 249.99,
      boughtPrice: 125.0,
      status: "Sold Out",
      type: "equipment",
    },
  ]

  filteredProducts: Product[] = [...this.products]

  setProductType(type: string) {
    this.selectedProductType = type
    this.applyFilters()
  }

  applyFilters() {
    this.filteredProducts = this.products.filter((product) => {
      // Product type filter
      const typeMatch = this.selectedProductType === "all" || product.type === this.selectedProductType

      // Search filter
      const searchMatch =
        this.filters.search === "" ||
        product.name.toLowerCase().includes(this.filters.search.toLowerCase()) ||
        (product.artist && product.artist.toLowerCase().includes(this.filters.search.toLowerCase()))

      // Category filter
      const categoryMatch = this.filters.category === "" || product.category === this.filters.category

      // Status filter
      const statusMatch = this.filters.status === "" || product.status === this.filters.status

      return typeMatch && searchMatch && categoryMatch && statusMatch
    })

    // Sort
    if (this.filters.sort === "name") {
      this.filteredProducts.sort((a, b) => a.name.localeCompare(b.name))
    } else if (this.filters.sort === "price") {
      this.filteredProducts.sort((a, b) => a.price - b.price)
    }
  }
}

