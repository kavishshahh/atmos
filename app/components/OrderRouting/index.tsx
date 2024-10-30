"use client"

import { DollarSign, X } from "lucide-react"
import * as React from "react"

const Card = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={`rounded-lg border border-gray-200 bg-white text-gray-950 shadow-sm dark:border-gray-800 dark:bg-gray-950 dark:text-gray-50 ${className}`}
      {...props}
    />
  )
)
Card.displayName = "Card"

export default function OrderRouting({ isOpen, onClose }: any) {
  const svgCoords = {
    mobile: {
      topPath: "M 40,50 L 150,50 L 260,50",
      bottomPath: "M 40,200 L 150,200 L 260,200",
      leftVertical: "M 40,50 L 40,200",
      rightVertical: "M 260,50 L 260,200"
    },
    desktop: {
      topPath: "M 100,50 L 400,50 L 700,50",
      bottomPath: "M 100,200 L 400,200 L 700,200",
      leftVertical: "M 100,50 L 100,200",
      rightVertical: "M 700,50 L 700,200"
    }
  }

  return (
    isOpen && (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-start md:items-center justify-center z-50 overflow-y-auto rounded-lg">
        <div className="w-full h-[75%] bg-black text-white p-4 modal relative max-w-[95%] md:max-w-4xl mx-auto rounded-2xl">
          {/* Header */}
          <div className="flex items-center gap-2 mb-8">
            <div className="w-6 h-6 rounded bg-emerald-500 flex items-center justify-center">
              <DollarSign className="w-4 h-4" />
            </div>
            <h1 className="text-xl font-semibold">Order Routing</h1>
            <button 
              onClick={onClose} 
              className="ml-auto p-2 rounded-full hover:bg-gray-800 transition-colors"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Main Routing Display */}
          <div className="relative mx-auto">
            {/* SVG Paths - Visible on both mobile and desktop */}
            <svg 
              className="absolute inset-0 w-full h-full" 
              style={{ minHeight: "400px" }}
              preserveAspectRatio="xMidYMid meet"
            >
              {/* Top Route Path */}
              <path
                d={svgCoords.mobile.topPath}
                className="stroke-gray-600 stroke-[1.5] md:hidden"
                strokeDasharray="4 4"
                fill="none"
              />
              <path
                d={svgCoords.desktop.topPath}
                className="stroke-gray-600 stroke-[1.5] hidden md:block"
                strokeDasharray="4 4"
                fill="none"
              />
              {/* Bottom Route Path */}
              <path
                d={svgCoords.mobile.bottomPath}
                className="stroke-gray-600 stroke-[1.5] md:hidden"
                strokeDasharray="4 4"
                fill="none"
              />
              <path
                d={svgCoords.desktop.bottomPath}
                className="stroke-gray-600 stroke-[1.5] hidden md:block"
                strokeDasharray="4 4"
                fill="none"
              />
              {/* Connecting Vertical Lines */}
              <path
                d={svgCoords.mobile.leftVertical}
                className="stroke-gray-600 stroke-[1.5] md:hidden"
                strokeDasharray="4 4"
                fill="none"
              />
              <path
                d={svgCoords.desktop.leftVertical}
                className="stroke-gray-600 stroke-[1.5] hidden md:block"
                strokeDasharray="4 4"
                fill="none"
              />
              <path
                d={svgCoords.mobile.rightVertical}
                className="stroke-gray-600 stroke-[1.5] md:hidden"
                strokeDasharray="4 4"
                fill="none"
              />
              <path
                d={svgCoords.desktop.rightVertical}
                className="stroke-gray-600 stroke-[1.5] hidden md:block"
                strokeDasharray="4 4"
                fill="none"
              />
            </svg>

            <div className="relative" style={{ minHeight: "400px" }}>
              <div className="flex justify-between mb-4">
                <span className="text-gray-400">1 APT</span>
                <div className="flex items-center gap-2">
                  <span className="text-gray-400">10.10184 izUSDC</span>
                  <div className="w-5 h-5 rounded-full bg-blue-500 flex items-center justify-center">
                    <span className="text-xs">$</span>
                  </div>
                </div>
              </div>

              <div className="absolute left-0 md:left-0 top-8">
                <div className="bg-gray-800/50 px-3 py-2 rounded-lg text-sm">
                  0.84 APT (84%)
                </div>
              </div>
              <div className="absolute left-0 md:left-0 top-44">
                <div className="bg-gray-800/50 px-3 py-2 rounded-lg text-sm">
                  0.16 APT (16%)
                </div>
              </div>

              <Card className="absolute left-1/3 md:left-1/2 top-[2rem] -translate-x-1/2 bg-gray-800 border-gray-700 p-4">
                <div className="flex flex-col items-center gap-2 min-w-[150px]">
                  <div className="w-full flex items-center gap-2 text-sm">
                    <div className="w-5 h-5 rounded-full bg-cyan-500/20 flex items-center justify-center">
                      <span className="text-cyan-500">P</span>
                    </div>
                    <span className="font-medium">APT/izUSDC</span>
                  </div>
                  <div className="w-full flex flex-col gap-1.5">
                    <div className="flex items-center gap-2 text-sm">
                      <div className="w-4 h-4 rounded-full bg-purple-500/20 flex items-center justify-center">
                        <span className="text-purple-500 text-xs">L</span>
                      </div>
                      <span className="text-gray-400">Liquidswap (25.48%)</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <div className="w-4 h-4 rounded-full bg-blue-500/20 flex items-center justify-center">
                        <span className="text-blue-500 text-xs">A</span>
                      </div>
                      <span className="text-gray-400">Aux (0.26%)</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <div className="w-4 h-4 rounded-full bg-orange-500/20 flex items-center justify-center">
                        <span className="text-orange-500 text-xs">P</span>
                      </div>
                      <span className="text-gray-400">PancakeSwap (0.26%)</span>
                    </div>
                  </div>
                </div>
              </Card>

              <Card className="absolute left-1/3 md:left-1/2 top-44 -translate-x-1/2 bg-[#0ea7bf] border-gray-700 p-4">
                <div className="flex flex-col items-center gap-2 min-w-[150px]">
                  <div className="w-full flex items-center gap-2 text-sm">
                    <div className="w-5 h-5 rounded-full bg-purple-500/20 flex items-center justify-center">
                      <span className="text-purple-500">L</span>
                    </div>
                    <span className="font-medium">APT/stAPT</span>
                  </div>
                  <div className="w-full flex flex-col gap-1.5">
                    <div className="flex items-center gap-2 text-sm">
                      <div className="w-4 h-4 rounded-full bg-purple-500/20 flex items-center justify-center">
                        <span className="text-purple-500 text-xs">L</span>
                      </div>
                      <span className="text-gray-400">Liquidswap (25.48%)</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <div className="w-4 h-4 rounded-full bg-blue-500/20 flex items-center justify-center">
                        <span className="text-blue-500 text-xs">A</span>
                      </div>
                      <span className="text-gray-400">Aux (0.26%)</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <div className="w-4 h-4 rounded-full bg-orange-500/20 flex items-center justify-center">
                        <span className="text-orange-500 text-xs">P</span>
                      </div>
                      <span className="text-gray-400">PancakeSwap (0.26%)</span>
                    </div>
                  </div>
                </div>
              </Card>

              <Card className="absolute right-0 top-8 bg-gray-800 border-gray-700 p-4">
                <div className="flex flex-col items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-emerald-500/20 flex items-center justify-center">
                    <span className="text-emerald-500">C</span>
                  </div>
                  <span className="text-sm font-medium">Cellana (100%)</span>
                </div>
              </Card>

              <Card className="absolute right-0 top-44 bg-gray-800 border-gray-700 p-4">
                <div className="flex flex-col items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-emerald-500/20 flex items-center justify-center">
                    <span className="text-emerald-500">C</span>
                  </div>
                  <span className="text-sm font-medium">Cellana (100%)</span>
                </div>
              </Card>

              <div className="absolute right-32 md:right-44 top-8">
                <div className="bg-gray-800/50 px-3 py-2 rounded-lg text-sm">
                  8.485546 izUSDC
                </div>
              </div>
              <div className="absolute right-32 md:right-44 top-44">
                <div className="bg-gray-800/50 px-3 py-2 rounded-lg text-sm">
                  1.616294 izUSDC
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  )
}