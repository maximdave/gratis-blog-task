// import { connect, connection } from 'mongoose';
// import { MongoMemoryServer } from 'mongodb-memory-server';

// let mongod;
// export const testDbConnect = async () => {
//   console.log('testDbConnect', ' from testDbConnect');
//   mongod = await MongoMemoryServer.create();

//   const uri = await mongod.getUri();
//   const monogoDbOptions = {
//     useNewUrlParser: true,
//     useCreateIndex: true,
//     useFindAndModify: false,
//     useUnifiedTopology: true,
//   };
//   await connect(uri, monogoDbOptions, (err) => {
//     if (err) {
//       console.log(err);
//     } else {
//       console.log('connected');
//     }
//   });
// };
// export const dbDisconnect = async () => {
//   await connection.dropDatabase();
//   await connection.close();
//   await mongod.stop();
// };
