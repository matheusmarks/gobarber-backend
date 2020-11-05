import { container } from 'tsyringe';

import IHashProvider from './HashProvider/models/IHashProvider';
import BcriptHashProvider from './HashProvider/implementations/BcryptHashProvider';

container.registerSingleton<IHashProvider>('HashProvider', BcriptHashProvider);
