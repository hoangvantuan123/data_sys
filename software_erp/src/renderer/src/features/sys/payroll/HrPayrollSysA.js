import axios from 'axios'
import { HOST_API_SERVER_1 } from '../../../services'


export const HrPayrollSysA = async (result) => {
  try {
    const token = '';
    const response = await axios.post(
      `${HOST_API_SERVER_1}/sys/HrPayrollSysA`,
      { result },
      {
        headers: {
          Authorization: `Bearer `,
          'Content-Type': 'application/json',
        },
      }
    );

    const { data } = response;
    const { success, message, errors } = data;

    if (success) {
      return {
        success: true,
        data: JSON.parse(data.data),
      };
    }

    return {
      success: false,
      message: message || ERROR_MESSAGES.ERROR,
      errors: Array.isArray(errors) ? errors : [errors || 'Unknown error'],
    };

  } catch (error) {
    return {
      success: false,
      message: error?.response?.data?.message || ERROR_MESSAGES.ERROR,
      errors: [error?.message || 'Unexpected error occurred'],
    };
  }
};
