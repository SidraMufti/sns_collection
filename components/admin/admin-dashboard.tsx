"use client"

import { DashboardOverview } from "./dashboard-overview"
import { ProductManagement } from "./product-management"
import { OrderManagement } from "./order-management"
import { CustomerManagement } from "./customer-management"
import { Analytics } from "./analytics"
import { AdminSettings } from "./admin-settings"

interface AdminDashboardProps {
  activeTab: string
}

export function AdminDashboard({ activeTab }: AdminDashboardProps) {
  switch (activeTab) {
    case "dashboard":
      return <DashboardOverview />
    case "products":
      return <ProductManagement />
    case "orders":
      return <OrderManagement />
    case "customers":
      return <CustomerManagement />
    case "analytics":
      return <Analytics />
    case "settings":
      return <AdminSettings />
    default:
      return <DashboardOverview />
  }
}
