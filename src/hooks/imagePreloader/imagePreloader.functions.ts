export const imageLoader = <T extends string>(lazyImage: () => Promise<{ default: T }>): Promise<T> =>
  new Promise<T>((resolve, reject) => {
    lazyImage()
      .then((response) => {
        resolve(response.default);
      })
      .catch((error) => {
        console.error(error);
        reject(null);
      });
  });

export const createImage = (src: string, onLoad: (img: HTMLImageElement) => void, onError: () => void) => {
  const img = new Image();
  img.addEventListener('load', () => {
    onLoad(img);
  });
  img.addEventListener('error', () => {
    onError();
  });
  img.addEventListener('abort', () => {
    onError();
  });
  img.src = src;
};

export const createBase64 = (url: string, onLoad: (dataUrl: string) => void, onError: () => void) => {
  const xhr = new XMLHttpRequest();
  xhr.addEventListener('load', function () {
    const reader = new FileReader();
    reader.onloadend = function () {
      if (reader.result && typeof reader.result === 'string') {
        onLoad(reader.result);
      } else onError();
    };
    reader.addEventListener('error', function () {
      onError();
    });
    reader.addEventListener('abort', function () {
      onError();
    });
    reader.readAsDataURL(xhr.response);
  });
  xhr.open('GET', url);
  xhr.responseType = 'blob';
  xhr.send();
};
