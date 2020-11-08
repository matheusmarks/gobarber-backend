import { container } from 'tsyringe';

import IStorageProvider from './StorageProviders/models/IStorageProvider';
import DiskStorageProvider from './StorageProviders/implementations/DiskStorageProvider';

// import IUserTokenRepository from '@modules/users/repositories/IUserTokenRepository';
// import UserTokenRepository from '@modules/users/'

container.registerSingleton<IStorageProvider>(
  'storageProvider',
  DiskStorageProvider,
);
