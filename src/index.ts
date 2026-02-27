import { Words } from './Words'
import { doPost } from './Post'

declare const global: {
  [x: string]: unknown
}

global.Words = Words
global.doPost = doPost
