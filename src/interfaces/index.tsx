export interface IStudent {
  studentId: string;
  name: string;
  age: number;
  profession: string;
  creationDate: string;
  lastUpdateDate: string;
}

export interface ICard {
  _id: Number;
  bodyRegion: string;
  descriptions: Array<string>[];
  comments: Array<string>[];
  imageUrl: string;
  checked: boolean;
  group: string;
  dateCreated: string;
}

export interface IExercise {
  exerciseId: string;
  imageUrl: string;
  bodyRegion: string;
  descriptions: string;
  comments: string;
  hasDone: boolean;
  trainingDay: Number;
}

export interface IAssessment {
  assessmentId: string;
  valuationDate: string;
  dueDate: string;
  teacher: string;
  perimetry: IPerimetry;
}

export interface IPerimetry {
  stature: number;
  weight: number;
  fat: number;
  fatPercentage: number;
  leanMass: number;
  leanMassPercentage: number;
  basalMetabolism: number;
  bodyAge: number;
  visceralFatpercentage: number;
  rightArm: number;
  leftArm: number;
  shoulder: number;
  chest: number;
  waist: number;
  abdomen: number;
  hip: number;
  rightThigh: number;
  leftThigh: number;
  rightCalf: number;
  leftCalf: number;
}

export interface IPerfil {
  student: IStudent;
  assessment: IAssessment;
  perimetry: IPerimetry;
}
