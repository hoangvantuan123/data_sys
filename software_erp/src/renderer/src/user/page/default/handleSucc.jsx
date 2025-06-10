import { notification } from 'antd';

const notificationStyle = {
    padding: '12px 12px',
    fontSize: 13,
};

export function HandleSucces(result) {
    if (!result || result.success !== true) return;

    notification.success({
        message: 'Thành công',
        description: result.message || 'Dữ liệu đã được xử lý thành công.',
        placement: 'topRight',
        style: notificationStyle,
    });
}