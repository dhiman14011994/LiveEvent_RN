export interface CourseModl {
    id: number;
    featured: boolean;
    tag: any[];
    title: string;
    category: string;
    description: string;
    instructionName: string;
    duration: number;
    createdDate: string;
    user_id: string;
    plan: any[];
    __V: number;
    uploadedFile: any;
    lessons: LessonsModl[];
    avgRating: any[];
  }
  export interface LessonsModl {
    id: number;
    videoUrl: string;
    title: string;
    course: string;
    description: string;
    duration: number;
    createdDate: string;
    user_id: string;
    __V: number;
    uploadedFile: any;
    userLessons:any
    // isBookMarked:any;
  }

  export interface AllCourseModl {
    id: number;
    completed: any;
    user: string;
    course: any,
    rating: number,
    createdDate: string;
    __V: number;
    courseDetail: any,
    courseLessons: any[],
    userLessons: any,
    totalWatched: number,
    totalLesson: number,
    totalWatchedLesson: number,
    
  }
  export interface InProgressModl {
    id: number;
    completed: any;
    user: string;
    course: any,
    rating: number,
    createdDate: string;
    __V: number;
    courseDetail: any,
    courseLessons: any[],
    userLessons: any,
    totalWatched: number,
    totalLesson: number,
    totalWatchedLesson: number,
    
  }