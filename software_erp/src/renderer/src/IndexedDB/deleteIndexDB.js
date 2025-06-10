import { deleteDB } from 'idb'

export const deleteDatabase = async () => {
  try {
    /*  await deleteDB('languageDatabase', {
      blocked() {
        console.warn('Database deletion blocked');
      },
    });
    console.log('Database deleted successfully'); */
  } catch (error) {
    console.error('Error deleting database:', error)
  }
}
