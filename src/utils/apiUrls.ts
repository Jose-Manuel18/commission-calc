export const apiUrls = {
  user: {
    getUser: "/api/login",
    createUser: "/api/user",
  },
  employee: {
    getEmployee: (id: number) => `/api/employee/${id}`,
    createEmployee: "/api/employee",
    deleteEmployee: "/api/employee",
  },
  payment: {
    getPayment: (id: number) => `/api/payment/${id}`,
    createPayment: "/api/payment",
    deletePayment: "/api/payment",
  },
} as const;
