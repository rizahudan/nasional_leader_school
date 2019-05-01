import 'babel-polyfill';
import routes from 'imports/routes/server/index.js';

const mongoose = require('mongoose');
const express = require('express');
const bodyParser = require('body-parser');
const logger = require('morgan');
const { spawnSync, spawn } = require('child_process');
const fs = require('fs');
const os = require('os');

const mongod = (mongoDirPath) => {
  const mongoServer = spawn(`${mongoDirPath}/mongodb/bin/mongod --dbpath ${mongoDirPath}/data`, { shell: true, windowsHide: true });

  mongoServer.stdout.on('data', (data) => {
    // process.stdout.write(`${data}`);
    const index = data.indexOf('pid');
    const obj = {};
    if (data.indexOf('MongoDB starting :') > -1) {
      data.toString('utf-8').substr(index).split(' ').map((d) => {
        const split = d.split('\n')[0].split('=');
        if (split.length > 1) {
          const name = split[0];
          const val = split[1];
          obj[name] = val;
        }
        return true;
      });
    }
    if (data.indexOf('waiting for connections on port') > -1) {
      mongoose.connect('mongodb://localhost/nasional_leader_school', { useNewUrlParser: true }, (err) => {
        if (typeof err === 'undefined' || err === null) {
          console.log('Mongo connected');
        }
      });
    }
  });

  mongoServer.on('close', (code) => {
    if (String(code) === '48') {
      mongoose.connect('mongodb://localhost/nasional_leader_school', { useNewUrlParser: true }, (err) => {
        if (typeof err === 'undefined' || err === null) {
          console.log('Mongo connected');
        }
      });
    }
  });
};

console.log(process.platform, os.arch());
// const p = __dirname;
// const chmod = spawn()

// const killMongo = () => {
//   // pid windows tasklist /svc | findstr /spin "string we search"
//   // kill pid windows taskkill /F /PID 123

//   let check = null;
//   let pidMongo = null;
//   switch (process.platform) {
//     case 'darwin':
//       check = spawnSync('pgrep mongod', { shell: true, windowsHide: true });
//       pidMongo = check.stdout.toString('utf8');
//       if (pidMongo) {
//         spawnSync(`kill ${pidMongo}`, { shell: true, windowsHide: true });
//         check = spawnSync('pgrep mongod', { shell: true, windowsHide: true });
//         pidMongo = check.stdout.toString('utf8');
//         if (pidMongo) {
//           killMongo();
//         }
//       }
//       break;
//     default:
//   }
// };

// const getPid = () => {
//   let check = null;
//   let pidMongo = null;
//   switch (process.platform) {
//     case 'darwin':
//       check = spawnSync('db.runCommand( { serverStatus: 1 } )', { shell: true, windowsHide: true });
//       pidMongo = check.stdout.toString('utf8');
//       console.log('db command', pidMongo);
//       check = spawnSync('pgrep mongod', { shell: true, windowsHide: true });
//       pidMongo = check.stdout.toString('utf8');
//       break;
//     default:
//   }
//   return pidMongo;
// };

// const connectMongo = () => {
//   if (getPid()) {
//     mongoose.connect('mongodb://127.0.0.1/nasional_leader_school', { useNewUrlParser: true });
//   } else {
//     connectMongo();
//   }
// };

const prepareMongo = () => {
  try {
    const mongoDirPath = 'mongo';
    console.log('exist', fs.existsSync(mongoDirPath));
    if (!fs.existsSync(mongoDirPath)) {
      const mongoDir = fs.mkdirSync(mongoDirPath);
      console.log('mongo', mongoDir);
    }

    // url windows https://fastdl.mongodb.org/win32/mongodb-win32-x86_64-2008plus-ssl-4.0.9-signed.msi
    if (!fs.existsSync(`${mongoDirPath}/mongodb`)) {
      console.log('Downloading mongo');
      switch (process.platform) {
        case 'darwin':
          spawnSync('curl -O https://fastdl.mongodb.org/osx/mongodb-osx-ssl-x86_64-4.0.9.tgz', { shell: true, windowsHide: true });
          spawnSync('tar -zxvf mongodb-osx-ssl-x86_64-4.0.9.tgz', { shell: true, windowsHide: true });
          spawnSync('cp -R -n mongodb-osx-x86_64-4.0.9/ mongo/mongodb', { shell: true, windowsHide: true });
          spawnSync('rm -rf mongodb-osx-ssl-x86_64-4.0.9.tgz mongodb-osx-x86_64-4.0.9', { shell: true, windowsHide: true });
          break;
        case 'win32':
          switch (process.arch) {
            case 'x64':
              break;
            default:
              console.log('Windows not supported');
          }
          break;
        default:
          console.log('OS not supportted');
      }
    }

    if (fs.existsSync(`${mongoDirPath}/mongodb`)) {
      if (!fs.existsSync(`${mongoDirPath}/data`)) {
        fs.mkdirSync(`${mongoDirPath}/data`);
      }

      mongod(mongoDirPath);
    }
  } catch (error) {
    console.log('err prepare', error);
  }
};

prepareMongo();

// ls.stdout.on('data', (data) => {
//   console.log(`stdout: ${data}`, p);
// });

// ls.stderr.on('data', (data) => {
//   console.log(`stderr: ${data}`);
// });

// ls.on('close', (code) => {
//   console.log(`child process exited with code ${code}`);
// });

const app = express();
const PORT = process.env.PORT || 8080;
// mongoose.connect('mongodb://192.168.137.1/nasional_leader_school', { useNewUrlParser: true });
// mongoose.connect('mongodb://192.168.137.1:27017/react', { useNewUrlParser: true });

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(logger('dev'));

app.use(express.static('.build/client'));
routes(app);
app.get('/getUsername', (req, res) => res.send({ username: 'hudan' }));
app.listen(PORT, () => {
  console.log(`test Listening on port ${PORT}!`);
});
