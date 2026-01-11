import { Books } from './Books'
import { Words } from './Words'
import { doArchive } from './Archive'
import { doPost } from './Post'

declare const global: {
  [x: string]: unknown
}

global.Books = Books
global.Words = Words
global.doArchive = doArchive
global.doPost = doPost
