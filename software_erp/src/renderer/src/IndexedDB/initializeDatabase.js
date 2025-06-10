import { openDB } from 'idb'

export const initializeDatabase = async () => {
  try {
    const db = await openDB('languageDatabase', 1, {
      upgrade(db) {
        if (!db.objectStoreNames.contains('languages')) {
          db.createObjectStore('languages', { keyPath: 'typeLanguage' })
        }
      }
    })

    const existingData = await db.get('languages', 1)
    if (!existingData) {
      await db.add('languages', {
        typeLanguage: 1,
        languageData: [
          {
            WordSeq: 1,
            LanguageSeq: 1,
            Word: 'Từ điển mẫu',
            Description: 'Từ điển'
          }
        ]
      })
    }

    return db
  } catch (error) {
    console.error('Error initializing database:', error)
  }
}
