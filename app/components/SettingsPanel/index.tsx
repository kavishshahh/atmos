"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import { Info, X } from "lucide-react"
import * as React from "react"

export default function SettingsPanel({isSettingsOpen, setIsSettingsOpen}:any) {
  const [customValue, setCustomValue] = React.useState("0.00")
  const [selectedValue, setSelectedValue] = React.useState("auto")

  if (!isSettingsOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="absolute inset-0 bg-black opacity-50" onClick={() => setIsSettingsOpen(false)}></div>
      <Card className="w-full max-w-md bg-black border-gray-800 z-10">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
          <CardTitle className="text-xl font-semibold text-white flex items-center gap-2">
            Swap Settings
            <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
          </CardTitle>
          <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white" onClick={() => setIsSettingsOpen(false)}>
            <X className="h-4 w-4" />
            <span className="sr-only">Close</span>
          </Button>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-gray-200">Slippage Tolerance</span>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-5 w-5 text-gray-400 hover:text-white"
                >
                  <Info className="h-4 w-4" />
                  <span className="sr-only">More information</span>
                </Button>
              </div>
              <span className="text-gray-400">Auto</span>
            </div>
            <ToggleGroup
              type="single"
              value={selectedValue}
              onValueChange={(value:any) => value && setSelectedValue(value)}
              className="flex justify-between bg-gray-900 rounded-lg p-1"
            >
              <ToggleGroupItem
                value="auto"
                className="text-white flex-1 h-8 rounded data-[state=on]:bg-emerald-500 data-[state=on]:text-white"
              >
                Auto
              </ToggleGroupItem>
              <ToggleGroupItem
                value="0.1"
                className="text-white flex-1 h-8 rounded data-[state=on]:bg-emerald-500 data-[state=on]:text-white"
              >
                0.1%
              </ToggleGroupItem>
              <ToggleGroupItem
                value="0.5"
                className="text-white flex-1 h-8 rounded data-[state=on]:bg-emerald-500 data-[state=on]:text-white"
              >
                0.5%
              </ToggleGroupItem>
              <ToggleGroupItem
                value="1"
                className="text-white flex-1 h-8 rounded data-[state=on]:bg-emerald-500 data-[state=on]:text-white"
              >
                1%
              </ToggleGroupItem>
              <ToggleGroupItem
                value="custom"
                className="text-white flex-1 h-8 rounded data-[state=on]:bg-emerald-500 data-[state=on]:text-white"
              >
                Custom {selectedValue === "custom" && `${customValue}%`}
              </ToggleGroupItem>
            </ToggleGroup>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <label htmlFor="different-wallet" className="text-gray-200">
                Send to a different wallet
              </label>
              <Switch
                id="different-wallet"
                className="data-[state=checked]:bg-emerald-500"
              />
            </div>
            <div className="flex items-center justify-between">
              <label htmlFor="show-charts" className="text-gray-200">
                Show charts & order routing
              </label>
              <Switch
                id="show-charts"
                className="data-[state=checked]:bg-emerald-500"
              />
            </div>
          </div>

          <div className="flex gap-4 pt-4">
            <Button
              variant="outline"
              className="flex-1 border-emerald-500 text-emerald-500 hover:bg-emerald-500/10"
            >
              Reset To Default
            </Button>
            <Button
              className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white"
            >
              Save Settings
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}