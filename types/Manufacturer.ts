export interface Manufacturer {
  id: number;
  name: string;
  description: string;
  manufacturerTemplateId: number;
  metaKeywords?: string;
  metaDescription?: string;
  metaTitle?: string;
  pictureId: number;
  pageSize: number;
  allowCustomersToSelectPageSize: boolean;
  pageSizeOptions?: string;
  subjectToAcl: boolean;
  limitedToStores: boolean;
  published: boolean;
  deleted: boolean;
  displayOrder: number;
  createdOnUtc: string;
  updatedOnUtc: string;
  priceRangeFiltering: boolean;
  priceFrom: number;
  priceTo: number;
  manuallyPriceRange: boolean;
}

  export interface ManufacturerResponse {
    manufacturers: Manufacturer[]
  }
  