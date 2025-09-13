import { FlexMessage, FlexBubble } from '@line/bot-sdk'
import { textColor } from '../constants/semantic-colors'
type DataType = { id: number; [key: string]: string | number | boolean }

const createCard = (data: DataType[]): FlexMessage[] => {
  return [
    {
      type: 'flex',
      altText: `${data[0].title} : ${data[0].desc}`,
      contents: {
        type: 'carousel',
        contents: data.map(({ id, title, url }) => {
          const shortTitle =
            typeof title === 'string' && title.length > 50
              ? title.substring(0, 20) + '...'
              : String(title)

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
                text: 'ー Words',
                size: 'xxs',
                color: textColor.subtle,
                wrap: true,
              },
              {
                type: 'text',
                text: String(title),
                size: 'lg',
                color: textColor.primary,
                weight: 'bold',
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
                        sheet: 'Words',
                        type: 'Done',
                        id: id + 1,
                        label: shortTitle,
                      }),
                    },
                  },
                  {
                    type: 'box',
                    layout: 'vertical',
                    maxWidth: '40px',
                    contents: [
                      {
                        type: 'image',
                        url: 'https://thumbs.lateensail.net/randamin/btn-web.png',
                        aspectMode: 'fit',
                      },
                    ],
                    action: {
                      type: 'uri',
                      label: 'action',
                      uri: String(url),
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
                        sheet: 'Words',
                        type: 'lowerVisibility',
                        id: id + 1,
                        label: shortTitle,
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
                        sheet: 'Words',
                        type: 'raiseVisibility',
                        id: id + 1,
                        label: shortTitle,
                      }),
                    },
                  },
                ],
              },
            ],
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
