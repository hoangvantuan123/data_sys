import Cookies from 'js-cookie'

/* export const accessToken = () => {
  return Cookies.get('a_a')
} */

export const accessToken = async () => {
  let token = Cookies.get('a_a')

  if (!token && window.electron) {
    const filePath = 'key.json'
    try {
      const fileData = await window.electron.readFromFile(filePath)
      token = fileData.token
    } catch (fileError) {
      console.log('Error reading from file', fileError)
    }
  }

  return token
}

export const getEmployeeCode = () => {
  const userInfo = localStorage.getItem('userInfo')

  if (userInfo) {
    const parsedUserInfo = JSON.parse(userInfo)
    return parsedUserInfo.employee_code || null
  }

  return null
}
export const getId = () => {
  const userInfo = localStorage.getItem('userInfo')

  if (userInfo) {
    const parsedUserInfo = JSON.parse(userInfo)
    return parsedUserInfo.id || null
  }

  return null
}
