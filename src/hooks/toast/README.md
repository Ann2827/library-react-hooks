# Toast hook

Хук хранит, принимает и диспатчит сообщения. Написан по паттерну Singleton.
Поэтому доступ к единственному экземпляру хранимого состояния осуществляется без
прокидывания пропсов или оборачивания в провайдеры.

<img width="360" alt="toast" src="https://user-images.githubusercontent.com/32645809/150703071-70e25985-ee9b-47ac-99ef-c9a8362c79fa.png">

## Table of Contents

- [Usage](#usage)
- [Properties](#properties)

## Usage <a name = "usage"></a>

Место диспатча сообщения:

```tsx
import React from 'react';
import { useToast } from 'library-react-hooks';

const Example = () => {
  const { alert } = useToast();

  return (
    <div>
      <button onClick={() => alert({ text: 'Message text1', type: 'error', tag: 'error1' })}>Сообщение1</button>
      <button onClick={() => alert({ text: 'Message text2', type: 'warning' })}>Сообщение2</button>
    </div>
  );
};
```

Toast компонент:

```tsx
import React from 'react';
import { useToast, ToastDataObject } from 'library-react-hooks';

const Toast = () => {
  const { on, clear } = useToast();

  const [messages, setMessages] = useState([]);
  useEffect(() => {
    on((data: ToastDataObject[]) => {
      setMessages(
        data.map((item) => ({
          title: item.title || '',
          text: item.text,
          onClose: () => clear(item.id),
        })),
      );
    });
  }, [on, clear]);

  if (!messages.length) return null;

  return <MyNotificationsComponent items={messages} />;
};
```

## Properties <a name = "properties"></a>

### Run Once Settings

| name | type | what`s doing |
| ------ | ------ | ------ |
| sticky | bool | ... |
| duplicate | bool | ... |
| ... | ... | ... |

### Alert
