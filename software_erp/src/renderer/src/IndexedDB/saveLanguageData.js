import { openDB } from 'idb'

export const saveLanguageData = async (languageData) => {
  try {
    const db = await openDB('languageDatabase', 1, {
      upgrade(db, oldVersion, newVersion) {
        if (!db.objectStoreNames.contains('languages')) {
          db.createObjectStore('languages', { keyPath: 'typeLanguage' })
        }
      }
    })

    const tx = db.transaction('languages', 'readwrite')
    const store = tx.objectStore('languages')

    await store.delete(languageData.typeLanguage)

    await store.add(languageData)

    await tx.done

    console.log('Data saved successfully.')
    return true
  } catch (error) {
    console.error('Error saving language data:', error)
    return false
  }
}
