const sendPushNotification = async ( pushToken, title, body) => {
    const message = {
        to: pushToken, 
        sound: 'default',
        title, 
        body,
    };

    await fetch('https://exp.host/--/api/v2/push/send',{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(message),
    });
}

module.exports = sendPushNotification;