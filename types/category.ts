export interface Category {
  id: number
  name: string
  description: string | null
  category_template_id: number
  meta_keywords: string | null
  meta_description: string | null
  meta_title: string | null
  parent_category_id: number
  page_size: number
  page_size_options: string
  price_ranges: string | null
  show_on_home_page: boolean | null
  include_in_top_menu: boolean
  has_discounts_applied: boolean | null
  published: boolean
  deleted: boolean
  display_order: number
  created_on_utc: string
  updated_on_utc: string
  role_ids: number[]
  discount_ids: number[]
  store_ids: number[]
  image: string | null
  se_name: string
}

export interface CategoriesResponse {
  categories: Category[]
}