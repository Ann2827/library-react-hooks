import { HttpAnswer } from 'library-react-hooks';

export type AnswerGetUsers =
  | [{
  id: number;
  name: string;
  username: string;
  email: string;
  address: {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
    geo: {
      lat: string;
      lng: string;
    }
  },
  phone: string;
  website: string;
  company: {
    name: string;
    catchPhrase: string;
    bs: string;
  }
    }]
  | HttpAnswer;

export type AnswerGetPostsComments =
  | [{
  id: number;
  postId: number;
  name: string;
  email: string;
  body: string;
}]
  | HttpAnswer;
