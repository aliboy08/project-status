import { get_user } from 'src/lib/functions';
import Hooks from '../lib/hooks';

export const hooks = new Hooks([]);
export const user = get_user();