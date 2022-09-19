# Toast hook

This hook stores, received and dispatches messages. It is written according to the Singleton pattern.
Therefore, access to a single instance of the stored state is carried out without
prop transfers or provider wrapping.

<img width="349" alt="toast" src="https://user-images.githubusercontent.com/32645809/151684893-775dd2a3-6e22-4244-8f5e-4236b0f39900.png">

[Back](https://github.com/Ann2827/library-react-hooks/blob/main/README.md)

## Table of Contents

- [Usage](#usage)
- [Properties](#properties)
- [Demo](https://ann2827.github.io/library-react-hooks/toast)

## Usage <a name = "usage"></a>

Place for message dispatch:

```ts
import { fnToast } from 'library-react-hooks';

const { alert, clear } = fnToast();

alert({ text: 'Some error message', type: 'error', tag: 'tag1' })
clear();
```

or

```tsx
import React from 'react';
import { useToast } from 'library-react-hooks';

const Example: React.FC = () => {
  const { alert } = useToast();

  return (
    <div>
      <button onClick={() => alert({ text: 'Some error message', type: 'error', tag: 'tag1' })}>Push</button>
      <button onClick={() => alert({ text: 'Some warning message', type: 'warning' })}>Push</button>
    </div>
  );
};
```

Toast component:

```tsx
import React from 'react';
import { useToast, ToastDataObject } from 'library-react-hooks';

const Toast: React.FC = () => {
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

### Set Once `toastSettings`

```ts
toastSettings({ sticky: true, ... });
```

| name | type | default | what`s doing |
| ------ | ------ | ------ | ------ |
| sticky | bool | false | The message will hang until it is closed manually. You can override this for individual message. |
| duration | number (ms) | 3000 | Sets the auto-close timeout. If sticky = false. You can override this for individual message. |
| duplicate | bool | true | Allows you to duplicate a message while the same is already hanging. When is false, you need to set tag for alert. If the tag is not specified, the message will be duplicated. |
| limit | number or undefined | undefined | Max visible notifications. |
| types | [object](#settings-by-types) | ... | Permanent settings for messages by type. |

### Property types for toastSettings <a name = "settings-by-types"></a>

The type is an object and contains the keys by message type: error, warning, info, success.
Every message type is object:

| name | type | default | what`s doing |
| ------ | ------ | ------ | ------ |
| title | string | '' | The message title. You can override it for individual message. |
| icon | string or ReactNode | 3000 | Icon name or icon component. |
| console | bool | different | Allows you to additionally output a message to the console. |
| color | string | '' | You can pass the color, name, class or something else. |

Console true for error and warning by default. And false for info and success.

### Fn: `alert`

```ts
const { alert } = useToast();

alert({ text: 'Message', type: 'error', ... });
```

| name | type | required | what`s doing |
| ------ | ------ | ------ | ------ |
| text | string | true | Message text |
| type | error, warning, info, success | true | Message type. |
| duration | number (ms) | false | Display duration. |
| sticky | bool | false | The message will hang until it is closed manually. |
| title | string | false | Title for this message. |
| actions | [array](#alert-actions) | false | Buttons. |
| tag | string | false | This tag marks the message. This works with duplicate = false. |

### Property actions for alert <a name = "alert-actions"></a>

The type is an objects array.

| name | type | required | what`s doing |
| ------ | ------ | ------ | ------ |
| text | string | true | Button text. |
| action | fn | true | On click button. |

### Fn: `clear`

```ts
const { clear } = useToast();

clear(id?: number);
```
If you do not pass the id, it will clear all hanging messages. With id it will clear one message.

### Fn: `on`

```ts
const { on } = useToast();

on((data: ToastDataObject[]) => {
  ...
});
```

This function listens for the events of adding and deleting messages.
Data contains: id, icon, text, color, type, title, actions, tag.

### Const: `data`

```ts
const { data } = useToast();
```

Contains an array of active messages. Object: id, icon, text, color, type, title, actions, tag.
(Data will not trigger in useEffect dependencies.)

### Fn: `setTypes`

```ts
const { setTypes } = useToast();

setTypes({ error: { title: i18next.t('error.title') } });
```
Dynamic updating of settings: title, icon, color
