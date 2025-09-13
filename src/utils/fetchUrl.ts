const fetchUrl = (url: string) => {
  try {
    const response = UrlFetchApp.fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; GoogleAppsScript)',
      },
      muteHttpExceptions: true,
    })

    if (response.getResponseCode() !== 200) {
      return { title: url }
    }

    const html = response.getContentText()

    // Open Graphタイトルを優先
    let titleMatch = html.match(
      /<meta[^>]*property=["']og:title["'][^>]*content=["']([^"']+)["']/i,
    )
    if (!titleMatch) {
      // 通常のtitleタグ
      titleMatch = html.match(/<title[^>]*>([^<]+)/i)
    }

    const title = titleMatch ? titleMatch[1].trim().replace(/\s+/g, ' ') : url

    return { title }
  } catch (error) {
    Logger.log('Error fetching URL: ' + error)
    return { title: url }
  }
}

export default fetchUrl
