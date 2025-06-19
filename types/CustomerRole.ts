
export interface CustomerRole {
    name: string;
    free_shipping?: boolean;
    tax_exempt?: boolean;
    active?: boolean;
    is_system_role?: boolean;
    system_name: string;
    enable_password_lifetime?: boolean;
    purchased_with_product_id?: number;
  }


  export interface CustomerRoleResponse {
    customerRole: CustomerRole[]
  }
  