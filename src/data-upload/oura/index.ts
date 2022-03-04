import 'dotenv/config';
import admin from 'firebase-admin';

import { fetchData } from '../utils.js';

import { OURA_API_V1_URL } from './consts.js';
import { TSleepResponse } from './types.js';

if (!process.env.OURA_ACCESS_TOKEN) throw new Error('OURA Access Token needed in .env');

const db = admin.firestore();

const fetchAllSleepData = async (): Promise<string> => {
  try {
    const collection = await db.collection('oura').doc('sleep').collection('data');
    const docs = await (await collection.get()).docs.map((doc) => doc.data());

    const sleepData = await fetchData<TSleepResponse>(
      `${OURA_API_V1_URL}/sleep`,
      process.env.OURA_ACCESS_TOKEN!,
    );
    const dataRecords = sleepData.sleep;

    const operations = dataRecords.map((record) => {
      if (docs.find(({ summary_date }) => summary_date === record.summary_date)) {
        // eslint-disable-next-line no-console
        console.log(`Record ${record.summary_date} exists, skipping.`);
        return Promise.resolve();
      }
      // eslint-disable-next-line no-console
      console.log(`Adding record ${record.summary_date}.`);
      return collection.add(record);
    });
    await Promise.all(operations);
    return JSON.stringify(sleepData);
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error(err);
    return String(err);
  }
};

// eslint-disable-next-line no-unused-vars
const fetchLastDayData = async (): Promise<string> => Promise.resolve('TODO');

export default fetchAllSleepData;
