import Realm from 'realm';

export interface ICard {
  _id: Number;
  bodyRegion: String;
  descriptions: Array<string>[];
  comments: Array<string>[];
  imageUrl: String;
  checked: boolean;
  group: String;
  dateCreated: String;
}

export type ICardObject = ICard & Realm.Object;
