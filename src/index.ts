import * as functions from 'firebase-functions';

// unfortunately, TS requires .js extensions https://github.com/microsoft/TypeScript/issues/40878#issuecomment-702508785
import gqlServer from './graphql-server/index.js';
import { fetchSleepData } from './data-upload/index.js';

const cloudFunctions = {
  // TODO: create proper resolvers
  graphql: functions.https.onRequest(gqlServer),
  // TODO: once it persists data, run on CRON
  fetchData: functions.https.onRequest(async (req, res) => {
    const data = await fetchSleepData();
    res.send(data);
  }),
  helloWorld: functions.https.onRequest((req, res) => {
    functions.logger.info('Hello logs!', { structuredData: true });
    res.send('Hello from Firebase!');
  }),
};

export default cloudFunctions;
