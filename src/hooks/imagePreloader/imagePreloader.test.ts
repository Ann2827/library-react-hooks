import { renderHook } from '@testing-library/react-hooks';

import { useImagePreloader } from '.';

// TODO: add more tests

describe('imagePreloader.hook function:', () => {
  beforeEach(() => {
    const { result } = renderHook(() => useImagePreloader());
    result.current.reset();
  });

  test('fnName: should ...', () => {
    const { result } = renderHook(() => useImagePreloader());
    expect(result.current.images).toEqual({});
  });

  // test('fnName: should upload from external', async () => {
  //   const { result } = renderHook(() =>
  //     useImagePreloader(
  //       {
  //         'logo.svg': () =>
  //           new Promise<{ default: string }>((resolve) =>
  //             resolve({ default: 'https://ann2827.github.io/PushWorldTest/private/img/logoGiftmio.svg' }),
  //           ),
  //       },
  //       'base64',
  //     ),
  //   );
  //   await new Promise<boolean>((resolve) => {
  //     setTimeout(() => {
  //       resolve(true);
  //     }, 3000);
  //   });
  //   expect(result.current.images['logo.svg']).toEqual(null);
  //   expect.assertions(1);
  // });
});
