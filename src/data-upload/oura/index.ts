import 'dotenv/config';

import { fetchData } from '../utils.js';

import { OURA_API_V1_URL } from './consts.js';
import { TSleepResponse } from './types.js';

if (!process.env.OURA_ACCESS_TOKEN) throw new Error('OURA Access Token needed in .env');

const fetchSleepData = async () => {
  const sleepData = await fetchData<TSleepResponse>(
    `${OURA_API_V1_URL}/sleep`,
    process.env.OURA_ACCESS_TOKEN!
  );
  console.log({ sleepData });

  // TODO: write the data to persist the data in collection

  return JSON.stringify(sleepData);
};

export default fetchSleepData;
