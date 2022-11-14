
export type User = {
  id: number;
  name: string;
  email: string;
  verify:string;
  password:string;
  role: {
    is_super: number;
    is_active: number;
    is_staff: number;
    is_admin:number
  }
};




