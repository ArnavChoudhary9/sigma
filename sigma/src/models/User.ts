export interface User {
  id: string;
  
  name: string;
  email: string;
  phone_no: string;

  role: 'Employee' | 'Admin' | 'Client';
  department: string | null;

  active: boolean;

  createdAt: string;
  updatedAt: string;
}
