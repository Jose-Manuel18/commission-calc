export const apiUrls = {
  user: {
    getUser: "/api/login",
    createUser: "/api/user",
  },
  employee: {
    getEmployee: (id: number) => `/api/employee/${id}`,
    createEmployee: "/api/employee/create",
    // updateEmployee: "/api/employee",
    deleteEmployee: "/api/delete",
  },
  payment: {
    getPayment: (id: number) => `/api/payment/${id}`,
    createPayment: "/api/payment/create",
  },
} as const;
