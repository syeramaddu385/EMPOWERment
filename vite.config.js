import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

const initialHousingData = [
  { id: 1, year: 2021, medianHomeValue: 285000, medianRent: 1050 },
  { id: 2, year: 2022, medianHomeValue: 297500, medianRent: 1090 },
  { id: 3, year: 2023, medianHomeValue: 310000, medianRent: 1150 },
];

function parseJsonBody(req) {
  return new Promise((resolve, reject) => {
    let data = '';
    req.on('data', (chunk) => {
      data += chunk;
    });
    req.on('end', () => {
      if (!data) {
        resolve(null);
        return;
      }
      try {
        resolve(JSON.parse(data));
      } catch (error) {
        reject(error);
      }
    });
    req.on('error', reject);
  });
}

export default defineConfig({
  plugins: [
    react(),
    {
      name: 'local-housing-rest-api',
      configureServer(server) {
        let housingData = [...initialHousingData];

        server.middlewares.use(async (req, res, next) => {
          if (!req.url.startsWith('/api/housing')) {
            next();
            return;
          }

          res.setHeader('Access-Control-Allow-Origin', '*');
          res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
          res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

          if (req.method === 'OPTIONS') {
            res.statusCode = 204;
            res.end();
            return;
          }

          const url = new URL(req.url, 'http://localhost');
          const segments = url.pathname.split('/').filter(Boolean);
          const idParam = segments[2];
          const recordId = idParam ? Number.parseInt(idParam, 10) : null;

          const sendJson = (statusCode, payload) => {
            res.statusCode = statusCode;
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify(payload));
          };

          try {
            if (req.method === 'GET') {
              if (recordId) {
                const record = housingData.find((entry) => entry.id === recordId);
                if (!record) {
                  sendJson(404, { message: 'Record not found' });
                  return;
                }
                sendJson(200, record);
                return;
              }

              sendJson(200, housingData);
              return;
            }

            const body = (await parseJsonBody(req)) || {};

            if (req.method === 'POST') {
              const requiredFields = ['year', 'medianHomeValue', 'medianRent'];
              const hasAllFields = requiredFields.every((field) => body[field] !== undefined);
              if (!hasAllFields) {
                sendJson(400, { message: 'Missing fields: year, medianHomeValue, and medianRent are required' });
                return;
              }

              const nextId = housingData.reduce((max, entry) => Math.max(max, entry.id), 0) + 1;
              const newRecord = {
                id: nextId,
                year: Number(body.year),
                medianHomeValue: Number(body.medianHomeValue),
                medianRent: Number(body.medianRent),
              };
              housingData.push(newRecord);
              sendJson(201, newRecord);
              return;
            }

            if (req.method === 'PUT') {
              if (!recordId) {
                sendJson(400, { message: 'Record id is required for updates' });
                return;
              }

              const index = housingData.findIndex((entry) => entry.id === recordId);
              if (index === -1) {
                sendJson(404, { message: 'Record not found' });
                return;
              }

              housingData[index] = {
                ...housingData[index],
                year: body.year ?? housingData[index].year,
                medianHomeValue: body.medianHomeValue ?? housingData[index].medianHomeValue,
                medianRent: body.medianRent ?? housingData[index].medianRent,
              };

              sendJson(200, housingData[index]);
              return;
            }

            if (req.method === 'DELETE') {
              if (!recordId) {
                sendJson(400, { message: 'Record id is required for deletion' });
                return;
              }

              const index = housingData.findIndex((entry) => entry.id === recordId);
              if (index === -1) {
                sendJson(404, { message: 'Record not found' });
                return;
              }

              const [removed] = housingData.splice(index, 1);
              sendJson(200, removed);
              return;
            }

            sendJson(405, { message: 'Method not allowed' });
          } catch (error) {
            sendJson(500, { message: 'Unexpected server error', detail: error.message });
          }
        });
      },
    },
  ],
});
