import { Books } from './Books'
import { English } from './English'
import { Messages } from './Messages'
import { Words } from './Words'
import { doArchive } from './Archive'
import { doPost } from './Post'

declare const global: {
  [x: string]: unknown
}

global.Books = Books
global.English = English
global.Messages = Messages
global.Words = Words
global.doArchive = doArchive
global.doPost = doPost
