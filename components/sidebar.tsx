"use client"

import { useState } from "react"

const Sidebar = () => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false)

  const toggleSidebar = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed)
  }

  return (
    <div
      className={`border-r border-[#dcdddf] flex-shrink-0 transition-all duration-300 ${
        isSidebarCollapsed ? "w-[60px]" : "w-[220px]"
      }`}
    >
      <div className="h-full flex flex-col">
        <div className="p-3">
          <button
            onClick={toggleSidebar}
            className="w-full text-left text-sm hover:bg-gray-100 rounded py-2 px-3 transition-colors duration-200"
          >
            {isSidebarCollapsed ? "Expand Sidebar" : "Collapse Sidebar"}
          </button>
        </div>

        <div className="flex-grow overflow-y-auto">
          <div className="p-3">
            <h6 className="text-xs font-semibold text-gray-500 uppercase mb-2">Main</h6>
            <ul>
              <li className="mb-1">
                <a
                  href="#"
                  className="block text-sm hover:bg-gray-100 rounded py-2 px-3 transition-colors duration-200"
                >
                  Dashboard
                </a>
              </li>
              <li className="mb-1">
                <a
                  href="#"
                  className="block text-sm hover:bg-gray-100 rounded py-2 px-3 transition-colors duration-200"
                >
                  Analytics
                </a>
              </li>
            </ul>
          </div>

          <div className="p-3">
            <h6 className="text-xs font-semibold text-gray-500 uppercase mb-2">ALL FIXTURES</h6>
            <div>
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-1">
                  <div className="flex-shrink-0 w-5 h-5 bg-red-500 rounded-sm flex items-center justify-center text-white text-[10px] font-bold">
                    MA
                  </div>
                  <div>NYG @ DAL</div>
                </div>
                <div className="text-[#62c11e] text-xs">In Play</div>
              </div>
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-1">
                  <div className="flex-shrink-0 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center text-white text-[10px] font-bold">
                    MO
                  </div>
                  <div>LAL @ BOS</div>
                </div>
                <div className="text-[#62c11e] text-xs">In Play</div>
              </div>
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-1">
                  <div
                    className="flex-shrink-0 w-5 h-5 bg-red-500 flex items-center justify-center text-white"
                    style={{ clipPath: "polygon(50% 0%, 0% 100%, 100% 100%)" }}
                  >
                    <span className="text-[10px] font-bold translate-y-1">!</span>
                  </div>
                  <div>CHI @ GB</div>
                </div>
                <div className="text-[#62c11e] text-xs">In Play</div>
              </div>
            </div>
          </div>
        </div>

        <div className="p-3 border-t border-[#dcdddf]">
          <p className="text-xs text-gray-500">&copy; 2023 Your Company</p>
        </div>
      </div>
    </div>
  )
}

export default Sidebar
