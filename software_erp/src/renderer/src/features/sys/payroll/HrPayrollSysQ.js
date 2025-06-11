import axios from 'axios'
import { HOST_API_SERVER_2 } from '../../../services'


export const HrPayrollSysQ = async (result) => {
  try {
    const token = '';
    const response = await axios.post(
      `${HOST_API_SERVER_2}/sys/HrPayrollSysQ`,
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
