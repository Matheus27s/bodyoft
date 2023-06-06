import {Realm} from '@realm/react';
import CardSchema from './models/Cards';

const getRealm = async () =>
  await Realm.open({
    path: 'myrealm',
    schema: [CardSchema],
  });

export default getRealm;
