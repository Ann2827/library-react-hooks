import { httpInit, HttpRequest } from 'library-react-hooks';
import { API_GET_USERS, API_GET_POSTS_COMMENTS } from '../constants/api';
import { AnswerGetPostsComments, AnswerGetUsers } from './answer.types';

declare namespace HttpHook {
  type Requests = {
    getUsers: () => HttpRequest<AnswerGetUsers>;
    getPostsComments: (props: { postId: number }) => HttpRequest<AnswerGetPostsComments>;
  };
}

const requests: HttpHook.Requests = {
  getUsers: () => ({
    url: API_GET_USERS,
  }),
  getPostsComments: ({ postId }) => ({
    url: API_GET_POSTS_COMMENTS,
    query: {
      postId,
    },
  }),
};

const apiInit = () => {
  return httpInit({
    loader: true,
    toast: true,
    blockRepeatWhenPending: true,
    toastWhenBackendUnavailable: false,
    tokens: {
      main: null,
    },
    // @ts-ignore
    requests,
  });
};

export default apiInit;

// const Actions = {
//   foo: ['bar', 'baz'],
// }
//
// type Mutable<T> = {-readonly [K in keyof T]: Mutable<T[K]>}
// // type T1 = Mutable<typeof Actions>
//
// function foo(a: Record<string, string[]>) {}
// foo(Actions as Mutable<typeof Actions>)

/// //////

// declare namespace GGG {
//   type Keys = keyof typeof requests;
//   type Requests = {
//     fn1: () => boolean;
//     fn2: (props: { val: boolean }) => boolean;
//   };
// }
//
// type P = Record<string, unknown>;
// type R = (props?: P) => boolean;
// type TR = Record<GGG.Keys, R>;
// type TT = {
//   requests: GGG.Requests | {
//     [K in GGG.Keys]: R;
//   } | null;
//   get: (name: GGG.Keys, props?: P) => boolean | undefined;
//   put: (data: TR) => void;
// }
// const MyData: TT = {
//   requests: null,
//   put(data) {
//     this.requests = data;
//   },
//   get(name, props) {
//     if (this.requests && name in this.requests) return this.requests[name](props);
//     return undefined;
//   },
// };
// const requests = {
//   fn1: () => { return true },
//   fn2: ({ val }: { val: boolean }) => { return val },
// };
// MyData.put(requests);
// const f = MyData.get('fn1', { val: '123' });
// f;

// const text = {
//   t1: '123',
//   t2: '123'
// }
// type W = keyof typeof text;
// const s: W = 't5';
// s;
// function f1(d: W): W {
//   return d;
// }
// f1('t1')
// function f2<G>(d: any): (k: G) => string {
//   return function(k): string {
//     return d[k];
//   };
// }
// const q = f2<keyof typeof text>(text);
// q('t4');
