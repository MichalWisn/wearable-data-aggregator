export type TSleepData = {
  summary_date: string;
  period_id: number;
  is_longest: number;
  timezone: number;
  bedtime_start: string;
  bedtime_end: string;
  score: number;
  score_total: number;
  score_disturbances: number;
  score_efficiency: number;
  score_latency: number;
  score_rem: number;
  score_deep: number;
  score_alignment: number;
  total: number;
  duration: number;
  awake: number;
  light: number;
  rem: number;
  deep: number;
  onset_latency: number;
  restless: number;
  efficiency: number;
  midpoint_time: number;
  hr_lowest: number;
  hr_average: number;
  rmssd: number;
  breath_average: number;
  temperature_delta: number;
  hypnogram_5min: string;
  hr_5min: number[];
  rmssd_5min: number[];
};

export type TSleepResponse = {
  sleep: TSleepData[];
};

export type TReadiness = {
  summary_date: string;
  period_id: number;
  score: number;
  score_previous_night: number;
  score_sleep_balance: number;
  score_previous_day: number;
  score_activity_balance: number;
  score_resting_hr: number;
  score_hrv_balance: number;
  score_recovery_index: number;
  score_temperature: number;
  rest_mode_state: number;
};
