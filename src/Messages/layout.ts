import { FlexMessage, FlexBubble, FlexBox } from '@line/bot-sdk'
import { textColor } from '../constants/semantic-colors'
type DataType = { id: number; [key: string]: string | number | boolean }

const createCard = (data: DataType[]): FlexMessage[] => {
  return [
    {
      type: 'flex',
      altText: `${data[0].message} : ${data[0].from}`,
      contents: {
        type: 'carousel',
        contents: data.map(({ id, message, from, url = '' }) => {
          const shortMessage =
            typeof message === 'string' && message.length > 50
              ? message.substring(0, 20) + '...'
              : String(message)

          const body: FlexBubble['body'] = {
            type: 'box',
            layout: 'vertical',
            paddingTop: 'md',
            paddingBottom: 'md',
            paddingStart: 'lg',
            paddingEnd: 'lg',
            spacing: 'sm',
            contents: [
              {
                type: 'text',
                text: 'ー Message',
                size: 'xxs',
                color: textColor.subtle,
                wrap: true,
              },
              {
                type: 'text',
                text: String(message),
                size: 'lg',
                color: textColor.black,
                weight: 'bold',
                wrap: true,
              },
              {
                type: 'text',
                text: String(from),
                size: 'xs',
                color: textColor.subtle,
                wrap: true,
              },
            ],
          }
          const footer: FlexBubble['footer'] = {
            type: 'box',
            layout: 'vertical',
            paddingTop: '0px',
            paddingBottom: 'md',
            paddingStart: 'lg',
            paddingEnd: 'lg',
            contents: [
              {
                type: 'box',
                layout: 'horizontal',
                spacing: 'md',
                alignItems: 'flex-end',
                justifyContent: 'flex-end',
                contents: [
                  {
                    type: 'box',
                    layout: 'vertical',
                    maxWidth: '40px',
                    contents: [
                      {
                        type: 'image',
                        url: 'https://thumbs.lateensail.net/randamin/btn-delete.png',
                        aspectMode: 'fit',
                      },
                    ],
                    action: {
                      type: 'postback',
                      label: 'action',
                      data: JSON.stringify({
                        sheet: 'Messages',
                        type: 'Done',
                        id: id + 1,
                        label: shortMessage,
                      }),
                    },
                  },
                  {
                    type: 'box',
                    layout: 'vertical',
                    maxWidth: '56px',
                    contents: [
                      {
                        type: 'image',
                        url: 'https://thumbs.lateensail.net/randamin/btn-decrease.png',
                        aspectMode: 'fit',
                      },
                    ],
                    action: {
                      type: 'postback',
                      label: 'action',
                      data: JSON.stringify({
                        sheet: 'Messages',
                        type: 'lowerVisibility',
                        id: id + 1,
                        label: shortMessage,
                      }),
                    },
                  },
                  {
                    type: 'box',
                    layout: 'vertical',
                    maxWidth: '56px',
                    contents: [
                      {
                        type: 'image',
                        url: 'https://thumbs.lateensail.net/randamin/btn-increase.png',
                        aspectMode: 'fit',
                      },
                    ],
                    action: {
                      type: 'postback',
                      label: 'action',
                      data: JSON.stringify({
                        sheet: 'Messages',
                        type: 'raiseVisibility',
                        id: id + 1,
                        label: shortMessage,
                      }),
                    },
                  },
                ],
              },
            ],
          }

          if (url) {
            ;(footer.contents[0] as FlexBox).contents.splice(1, 0, {
              type: 'box',
              layout: 'vertical',
              maxWidth: '40px',
              contents: [
                {
                  type: 'image',
                  url: 'https://thumbs.lateensail.net/randamin/btn-book.png',
                  aspectMode: 'fit',
                },
              ],
              action: {
                type: 'uri',
                label: 'action',
                uri: String(url),
              },
            })
          }

          return {
            type: 'bubble',
            size: 'kilo',
            body,
            footer,
          }
        }),
      },
    },
  ]
}
export default createCard
