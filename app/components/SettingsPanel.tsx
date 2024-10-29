import React from "react";

interface SettingsPanelProps {
  settings: {
    slippageTolerance: number;
    transactionDeadline: number;
    routeVisualization: boolean;
    chartDisplay: boolean;
    gasPrice: number;
  };
  setSettings: React.Dispatch<React.SetStateAction<{
    slippageTolerance: number;
    transactionDeadline: number;
    routeVisualization: boolean;
    chartDisplay: boolean;
    gasPrice: number;
  }>>;
}

const SettingsPanel: React.FC<SettingsPanelProps> = ({ settings, setSettings }) => {
  return (
    <div className="bg-[#2c2c2e] p-4 rounded-xl mb-4">
      <h2 className="text-gray-500 text-lg mb-2">Settings</h2>
      <div>
        <label>Slippage Tolerance (%)</label>
        <input
          type="number"
          value={settings.slippageTolerance}
          onChange={(e) => setSettings({ ...settings, slippageTolerance: parseFloat(e.target.value) })}
          className="w-full mb-2"
        />
      </div>
      <div>
        <label>Transaction Deadline (minutes)</label>
        <input
          type="number"
          value={settings.transactionDeadline}
          onChange={(e) => setSettings({ ...settings, transactionDeadline: parseInt(e.target.value) })}
          className="w-full mb-2"
        />
      </div>
      <div>
        <label>
          <input
            type="checkbox"
            checked={settings.routeVisualization}
            onChange={() => setSettings({ ...settings, routeVisualization: !settings.routeVisualization })}
          />
          Route Visualization
        </label>
      </div>
      <div>
        <label>
          <input
            type="checkbox"
            checked={settings.chartDisplay}
            onChange={() => setSettings({ ...settings, chartDisplay: !settings.chartDisplay })}
          />
          Chart Display
        </label>
      </div>
      <div>
        <label>Gas Price (Gwei)</label>
        <input
          type="number"
          value={settings.gasPrice}
          onChange={(e) => setSettings({ ...settings, gasPrice: parseFloat(e.target.value) })}
          className="w-full mb-2"
        />
      </div>
    </div>
  );
};

export default SettingsPanel; 