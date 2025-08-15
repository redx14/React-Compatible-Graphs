import { useRef, useState } from 'react';
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  TimeScale,
  Tooltip,
  Legend,
  Filler,
  ChartData,
  ChartOptions
} from 'chart.js';
import zoomPlugin from 'chartjs-plugin-zoom';
import 'chartjs-adapter-date-fns';
import { Line } from 'react-chartjs-2';
import { Box, FormGroup, FormControlLabel, Switch, Typography } from '@mui/material';
import { GraphDataset } from '../../Types/GraphData';

ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  TimeScale,
  Tooltip,
  Legend,
  Filler,
  zoomPlugin
);

const generateDummyData = () => {
  const now = Date.now();
  return Array.from({ length: 100 }).map((_, i) => {
    const timestamp = now - (100 - i) * 60 * 60 * 1000; // hourly data
    return {
      x: timestamp,
      y1: Math.sin(i / 10) * 20 + 50,
      y2: Math.cos(i / 15) * 15 + 50,
    };
  });
};

const ChartJSGraph = () => {
  const chartRef = useRef<any>(null);
  const [showY1, setShowY1] = useState(true);
  const [showY2, setShowY2] = useState(true);
  const [showTrend, setShowTrend] = useState(true);
  const data = generateDummyData();

  const trendLine = (field: 'y1' | 'y2') => {
    const points = data.map((_, i, arr) => {
      const window = arr.slice(Math.max(i - 5, 0), i + 1);
      const avg = window.reduce((sum, d) => sum + d[field], 0) / window.length;
      return { x: data[i].x, y: avg };
    });
    return points;
  };

  const datasets: GraphDataset[] = [];

    if (showY1) {
    datasets.push({
        label: 'Series A',
        data: data.map((d) => ({ x: d.x, y: d.y1 })),
        color: '#1976d2',
        fill: true,
    });
    }

    if (showY1 && showTrend) {
    datasets.push({
        label: 'Series A Trend',
        data: trendLine('y1'),
        color: '#1976d2',
        dashed: true,
    });
    }

    if (showY2) {
    datasets.push({
        label: 'Series B',
        data: data.map((d) => ({ x: d.x, y: d.y2 })),
        color: '#9c27b0',
        fill: true,
    });
    }

    if (showY2 && showTrend) {
    datasets.push({
        label: 'Series B Trend',
        data: trendLine('y2'),
        color: '#9c27b0',
        dashed: true,
    });
    }

    // Thresholds are always shown
    datasets.push({
    label: 'Warning Threshold',
    data: data.map((d) => ({ x: d.x, y: 65 })),
    color: 'orange',
    dashed: true,
    threshold: true,
    });
    datasets.push({
    label: 'Critical Threshold',
    data: data.map((d) => ({ x: d.x, y: 80 })),
    color: 'red',
    dashed: true,
    threshold: true,
    });


  const chartData: ChartData<'line', { x: number; y: number }[], unknown> = {
    datasets: datasets.map((ds) => ({
      label: ds.label,
      data: ds.data,
      borderColor: ds.color,
      backgroundColor: ds.fill ? ds.color + '33' : undefined,
      borderDash: ds.dashed ? [5, 5] : undefined,
      pointRadius: ds.threshold ? 0 : undefined,
      fill: ds.fill ?? false,
    })),
  };

  const options: ChartOptions<'line'> = {
    responsive: true,
    scales: {
      x: {
        type: 'time',
        time: {
          unit: 'hour',
        },
        ticks: {
          autoSkip: true,
          maxTicksLimit: 12,
        },
      },
      y: {
        beginAtZero: false,
        title: {
          display: true,
          text: 'Value',
        },
      },
    },
    plugins: {
      zoom: {
        pan: {
          enabled: true,
          mode: 'x',
        },
        zoom: {
          wheel: { enabled: true },
          pinch: { enabled: true },
          mode: 'x',
        },
      },
      legend: {
        position: 'top',
      },
    },
  };

  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        Chart.js Line Chart
      </Typography>
      <FormGroup row>
        <FormControlLabel
          control={<Switch checked={showY1} onChange={() => setShowY1((prev) => !prev)} />}
          label="Series A"
        />
        <FormControlLabel
          control={<Switch checked={showY2} onChange={() => setShowY2((prev) => !prev)} />}
          label="Series B"
        />
        <FormControlLabel
          control={<Switch checked={showTrend} onChange={() => setShowTrend((prev) => !prev)} />}
          label="Trend Line"
        />
      </FormGroup>
      <Line ref={chartRef} data={chartData} options={options} />
    </Box>
  );
};

export default ChartJSGraph;
