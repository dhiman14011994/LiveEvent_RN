export interface QuestionModl {
    id: string;
}

export interface AnswerModl {
    id: string;
    user: string;
    answer: string;
    question: string;
    createdDate: string;
    user_id: string;
    email: string;
    role: string;
    hash: string;
    image: string;
    name: string;
}

export interface SaveQuestionModl {
    id: string;
    user: string;
    answer: string;
    question: string;
    createdDate: string;
    user_id: string;
    email: string;
    role: string;
    hash: string;
    image: string;
    name: string;
}
