import {ObjectSchema} from 'realm';

const CardSchema: ObjectSchema = {
  name: 'Card',
  properties: {
    _id: 'int',
    imageUrl: 'string',
    descriptions: 'string[]',
    comments: 'string[]',
    checked: 'bool',
    bodyRegion: 'string',
    group: 'string',
    dateCreated: 'string',
  },
  primaryKey: '_id',
};

export default CardSchema;
