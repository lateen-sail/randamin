import fetchUrl from '../utils/fetchUrl'

export const writeSheet = (message: any, sheetName: string) => {
  // URLでない場合は早期リターン
  if (!/http/.test(message)) return

  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(sheetName)
  if (!sheet) return

  const nextRow = sheet.getLastRow() + 1
  const formattedDate = Utilities.formatDate(
    new Date(),
    Session.getScriptTimeZone(),
    'yyyy-MM-dd',
  )

  // 日付を1列目に設定
  sheet.getRange(nextRow, 1).setValue(formattedDate)

  // URLから情報を取得して設定
  const { title } = fetchUrl(message)
  sheet.getRange(nextRow, 2).setValue(title) // タイトルを2列目
  sheet.getRange(nextRow, 3).setValue(message) // URLを3列目
}
