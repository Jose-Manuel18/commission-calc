"use client"
import { useState } from "react"
import { motion } from "framer-motion"

export function CommissionCalculator() {
  const [sales, setSales] = useState(0)
  const [commissionRate, setCommissionRate] = useState(0)
  const [commission, setCommission] = useState(0)

  const calculateCommission = () => {
    const commission = (sales * commissionRate) / 100
    setCommission(commission)
  }

  return (
    <motion.div
      className="container justify-center flex p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="w-full max-w-xs">
        <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="sales"
            >
              Sales Amount ($)
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="sales"
              type="number"
              placeholder="Sales amount"
              onChange={(e) => setSales(parseInt(e.target.value))}
            />
          </div>
          <div className="mb-6">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="commission-rate"
            >
              Commission Rate (%)
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="commission-rate"
              type="number"
              placeholder="Commission rate"
              onChange={(e) => setCommissionRate(parseInt(e.target.value))}
            />
          </div>
          <div className="flex items-center justify-between">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="button"
              onClick={calculateCommission}
            >
              Calculate
            </button>
          </div>
        </form>
        <p className="text-center text-white text-md">
          Your commission is: ${commission}
        </p>
      </div>
    </motion.div>
  )
}
