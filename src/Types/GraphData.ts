export interface TimeSeriesPoint {
  x: number; // timestamp (Unix ms)
  y: number; // value
}

export interface GraphDataset {
  label: string;
  data: TimeSeriesPoint[];
  color?: string;
  dashed?: boolean;
  fill?: boolean;
  threshold?: boolean;
}
