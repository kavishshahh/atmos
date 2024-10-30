import { allData } from "@/app/utils/data";
import { useEffect, useState } from "react";
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const PriceChart = () => {
  const [selectedPeriod, setSelectedPeriod] = useState<
    "1H" | "24H" | "1W" | "1M" | "1Y"
  >("1W");
  const data = allData[selectedPeriod];

  const [chartDimensions, setChartDimensions] = useState({
    width: 500,
    height: 400,
  });

  const formatPrice = (value: number) => {
    return `$${value.toLocaleString()}`;
  };

  useEffect(() => {
    const updateDimensions = () => {
      const width = window.innerWidth < 768 ? window.innerWidth - 50 : 700;
      const height = window.innerWidth < 768 ? 300 : 400;
      setChartDimensions({ width, height });
    };

    updateDimensions();
    window.addEventListener("resize", updateDimensions);

    return () => {
      window.removeEventListener("resize", updateDimensions);
    };
  }, []);

  const calculateEMA = (data: { price: number }[], period: number) => {
    const k = 2 / (period + 1);
    return data.reduce((acc, current, index) => {
      if (index === 0) {
        acc.push(current.price);
      } else {
        const ema = (current.price - acc[index - 1]) * k + acc[index - 1];
        acc.push(ema);
      }
      return acc;
    }, [] as number[]);
  };

  const emaPeriod1 = 10;
  const emaData = calculateEMA(data, emaPeriod1);


  const chartData = data.map((item, index) => ({
    ...item,
    ema: emaData[index], 
  }));

  return (
    <div className="w-full max-w-6xl mx-auto p-4 bg-gray-800 rounded-lg shadow-lg">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-white mb-4">Price Chart</h2>
        <div className="flex flex-wrap gap-2">
          {["1H", "24H", "1W", "1M", "1Y"].map((period) => (
            <button
              key={period}
              onClick={() =>
                setSelectedPeriod(period as "1H" | "24H" | "1W" | "1M" | "1Y")
              }
              className={`px-4 py-2 rounded-md transition-colors duration-200 ${
                selectedPeriod === period
                  ? "bg-[#0bd790] text-white"
                  : "bg-gray-700 text-gray-300 hover:bg-[#0dbbac]"
              }`}
            >
              {period}
            </button>
          ))}
        </div>
      </div>

      <div className="w-full h-[300px] md:h-[400px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            width={chartDimensions.width}
            height={chartDimensions.height}
            data={chartData}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#0dbbac" />
            <XAxis dataKey="name" stroke="#0ea7bf" />
            <YAxis stroke="#0ea7bf" />
            <Tooltip
              contentStyle={{ backgroundColor: "#0dbbac", color: "white" }}
            />
            <Legend />
            <Line
              type="monotone"
              dataKey="price"
              stroke="#0bd790"
              activeDot={{ r: 8 }}
            />
            <Line
              type="monotone"
              dataKey="ema"
              stroke="#0ea7bf"
              activeDot={{ r: 8 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-4 bg-gray-700 rounded-lg">
          <h3 className="text-sm font-medium text-gray-300">Current Price</h3>
          <p className="text-xl font-bold text-white">
            {formatPrice(data[data.length - 1].price)}
          </p>
        </div>
        <div className="p-4 bg-gray-700 rounded-lg">
          <h3 className="text-sm font-medium text-gray-300">24h Volume</h3>
          <p className="text-xl font-bold text-white">
            {formatPrice(data[data.length - 1].volume)}
          </p>
        </div>
        <div className="p-4 bg-gray-700 rounded-lg">
          <h3 className="text-sm font-medium text-gray-300">Market Cap</h3>
          <p className="text-xl font-bold text-white">
            {formatPrice(data[data.length - 1].marketCap)}
          </p>
        </div>
      </div>
    </div>
  );
};

export default PriceChart;
