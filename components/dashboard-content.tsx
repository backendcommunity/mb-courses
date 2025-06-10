import type React from "react"

const DashboardContent: React.FC = () => {
  return (
    <div className="space-y-4 md:space-y-6 p-4 md:p-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-xl md:text-3xl font-semibold">Dashboard</h1>
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold h-8 md:h-10 px-2 md:px-4 rounded text-xs md:text-sm">
          Add New
        </button>
      </div>

      {/* Stats Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Stat Card 1 */}
        <div className="bg-white shadow rounded p-4 md:p-6">
          <h2 className="text-base md:text-lg font-semibold">Total Revenue</h2>
          <p className="text-xl md:text-3xl font-bold">$12,500</p>
        </div>

        {/* Stat Card 2 */}
        <div className="bg-white shadow rounded p-4 md:p-6">
          <h2 className="text-base md:text-lg font-semibold">New Customers</h2>
          <p className="text-xl md:text-3xl font-bold">245</p>
        </div>

        {/* Stat Card 3 */}
        <div className="bg-white shadow rounded p-4 md:p-6">
          <h2 className="text-base md:text-lg font-semibold">Orders Placed</h2>
          <p className="text-xl md:text-3xl font-bold">567</p>
        </div>

        {/* Stat Card 4 */}
        <div className="bg-white shadow rounded p-4 md:p-6">
          <h2 className="text-base md:text-lg font-semibold">Website Visits</h2>
          <p className="text-xl md:text-3xl font-bold">1,200</p>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Chart 1 */}
        <div className="bg-white shadow rounded p-4 md:p-6">
          <h2 className="text-base md:text-lg font-semibold">Revenue Chart</h2>
          {/* Placeholder for chart */}
          <div className="h-48 bg-gray-100 rounded"></div>
        </div>

        {/* Chart 2 */}
        <div className="bg-white shadow rounded p-4 md:p-6">
          <h2 className="text-base md:text-lg font-semibold">Sales Chart</h2>
          {/* Placeholder for chart */}
          <div className="h-48 bg-gray-100 rounded"></div>
        </div>
      </div>

      {/* Recent Activity Section */}
      <div className="bg-white shadow rounded p-4 md:p-6">
        <h2 className="text-base md:text-lg font-semibold">Recent Activity</h2>
        <ul className="mt-4 space-y-2">
          <li>New order placed by John Doe</li>
          <li>Payment received from Jane Smith</li>
          <li>Product X restocked</li>
        </ul>
      </div>

      {/* Products Section */}
      <div className="bg-white shadow rounded p-4 md:p-6">
        <h2 className="text-base md:text-lg font-semibold">Products</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
          {/* Product Card 1 */}
          <div className="border rounded p-2">
            <h3 className="text-base md:text-lg font-semibold">Product A</h3>
            <p className="text-sm">Price: $25</p>
          </div>

          {/* Product Card 2 */}
          <div className="border rounded p-2">
            <h3 className="text-base md:text-lg font-semibold">Product B</h3>
            <p className="text-sm">Price: $30</p>
          </div>

          {/* Product Card 3 */}
          <div className="border rounded p-2">
            <h3 className="text-base md:text-lg font-semibold">Product C</h3>
            <p className="text-sm">Price: $40</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DashboardContent
