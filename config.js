const express = require('express');
const cors = require('cors');
const { initializeApp, cert } = require('firebase-admin/app');
const { getFirestore } = require('firebase-admin/firestore');

const app = express();
app.use(cors());
app.use(express.json());

const serviceAccount = {
  "type": "service_account",
  "project_id": "file-97d76",
  "private_key_id": "f1b8388c3bf94556e386fe6d257343a9ca9edb65",
  "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQDt84ovwo0UhdHl\nx7Jpg97cXH3cUykmZMnarI4yTvzE+kZ6xllkWluwvoZswK8y2cV/Nxo+9Pjc+FiP\nW9xmLT+09Wi4eCDS+BD6Av73+hjcz5rwPR7DmFv5FLZamkuCZuiToAJXj1quHSBS\nR1+K18lRfpQyrbj5Dmfv9BIRhv2WbGUV4sNmKjrPSdlDydZ6VttYP0wzkUNyq+AU\n5xGFZLyrJXo40vQVO7rT607+8fdNJ3e7R51DboOeIc6I7LYW9kICWSp/m0vLtK4K\nyzUbNUosDiOpLyuVOgBnAT/WLY4Y5GPkH/s5Yz09YfsazlwUPjWUPQTRPWFiBn1Z\n6JxmGAHVAgMBAAECggEAJUD2VxDiDp7+5Dc2Jw/m0eBHMjnw3Np1wd83Kgg0ydAX\nPbyVHUGKTmsd16P5KgBvS8IAQXAQEGRvVQ6APJ0D9txfJ1ZjaTQ+UC4s5f0JbHSy\nYL9o9B2D9MS54gh7HvDmo8ou46+FdnIH7+nNuwqascAcCq0pIxEO08IGHClixWxo\nwdbnyvh/k939EauWOTOmRll8KP+XfKW1PqG2Jru/TpI3gzwia41pULaKgT/eEt1+\nXRe1CGsiJig/K9ID1EipfL+honRkQwgY05pVTxV/kFqKfTIp3wICbhCcNHT4JhQO\nwrfS+8mTmRW4qZMtANwgU/s4+gncsmyiW5p+9AzkZwKBgQD7DpWYEa9yjeTDphGI\nSVOc5xD+uF7W2xuVLu9JtMZ9yFoU4vJ2PDoaRJ3zxi/dk6NNvhkCJEXEE9CDYJko\nfvruAEHSjD0DxrAIqJfbzDMeMrC7RYdDxT2Wfg06PmKv3tuzenwAvmzOkR0LriEN\nPse18+Udj+hUiNwk7s6E8p23jwKBgQDyouX8Kj6QaHo7L9k3mr3e8iD0QqEA0HhH\n5VUvu7ZopPSJUIvh0WA3VG+lDdwaVIRLqCzrLuxnok9Dsh7xMwWGpYLUz6BuVRLr\nxnImfMi+29V4qcyUlleFN0hrz8apTnNOALYDJc59egyhGVKplrkF7gYrA1Xa7bdL\nLSrE8KseWwKBgQCXODKtFUH7mzJHEpmO4LQHVzrqYr1lZzbXBh1F5SiGDQ8Nc6Gd\nzCsnNVt6wU6FhW8g3bcMjjKjp1e6Oo4mUU3t26PKIYSC6MORg5Ns5jOIJfpD4t5V\n2NF++1AWXAtvaaomEkns3MaHKes35NutsbnzhAPmaY8ElCcd6+XjOIv9SwKBgQCL\nA2GY8+sceX9uYZ+mB/Y4wai3yWTNPqNrLa18x6NemQOxmIBMRNVHXg0JF8O/IiUZ\n46S4qg2v4oJfWrH3py/HURSAMOTN0dghVXUZL+0jzHelxkL77pb+MApCGqzLW7Mc\nQbQGYabIpSCPPB7sIvqmtxS5mBOcdw3I+HvEkc64eQKBgEdlq+eFvyHD0V0MZJT3\nqUdk1zhEDNP6dedeBm5Ieh/r7RJmkI95AeQdjh3LTA16TXafmOcXcm1jW9RolySI\ns2gbNIkt9kB4JmWWImeH8n4ue3lsMHx8qzVnLl6CnUPFcctK1xnsqS8NgpRA76td\n7Zwd2oDNl+L6R+lNsmn/Y7Ra\n-----END PRIVATE KEY-----\n",
  "client_email": "firebase-adminsdk-mvm9a@file-97d76.iam.gserviceaccount.com",
  "client_id": "105869320668436147283",
  "auth_uri": "https://accounts.google.com/o/oauth2/auth",
  "token_uri": "https://oauth2.googleapis.com/token",
  "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
  "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-mvm9a%40file-97d76.iam.gserviceaccount.com",
  "universe_domain": "googleapis.com"
};

initializeApp({
  credential: cert(serviceAccount)
});

const db = getFirestore();
const usersCollection = db.collection('users');

const validateUserInput = (req, res, next) => {
  const { name, email, age, weight, height, healthGoals } = req.body;
  if (!name || !email || !age || !weight || !height || !healthGoals) {
    return res.status(400).json({ error: 'All fields are required' });
  }
  
  if (typeof age !== 'number' || age < 0 || age > 120) {
    return res.status(400).json({ error: 'Invalid age' });
  }
  
  if (typeof weight !== 'number' || weight <= 0) {
    return res.status(400).json({ error: 'Invalid weight' });
  }
  
  if (typeof height !== 'number' || height <= 0) {
    return res.status(400).json({ error: 'Invalid height' });
  }
  next();
};

module.exports = { app, usersCollection, validateUserInput };