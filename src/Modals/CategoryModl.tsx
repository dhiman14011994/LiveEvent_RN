export interface CategoryModl {
    id: number;
    category: string;
    createdDate: string;
    category_id: string;
}

export interface CategoryDataModl {
  id: number;
  tags:any;
  createdDate: string;
  category_id: string;
  description:any;
  duration: number;
  title:string;
  instructionName:string;
  featured:boolean;
  userId:string;
  plan:any;
  v:number;
  uploadedFile:any;
  lesson:any;
  thubmnailUrl:any
}



export interface FeatureModl {
      _id: string,
      tags: string[],
      category: string,
      description: any,
      duration: number,
      title: string,
      userId: string,
      createdDate: any,
      plan: string[],
      __v: number,
      uploadedFile?: any,
      thumbnailUrl: string,
      featured: any,
      questions:string[],
      favourite: string[],
}
export interface WatchingModl {
  _id: string,
  tags: string[],
  category: string,
  description: any,
  duration: any,
  duration1: any,
  instructionName: string,
  userId: string,
  title: string,
  createdDate: any,
  plan: string[],
  __v: number,
  uploadedFile?: any,
  thumbnailUrl: string,
  featured: boolean,
  favourite: string[],
  totalWatched:any,
}
export interface TrendingModl {
  _id: string,
  tags: string[],
  category: string,
  description: any,
  duration: any,
  instructionName: string,
  userId: string,
  title: string,
  createdDate: any,
  plan: string[],
  __v: number,
  uploadedFile?: any,
  thumbnailUrl: string,
  featured: boolean,
  favourite: string[],
  duration1:any,
  totalWatched:any,
}