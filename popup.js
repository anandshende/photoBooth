export const PopUp = {

    showPopup: function () {
        const configForm = document.getElementById('config-form');
        configForm.style.display = 'block';
    },

    readConfig: function () {
        const configForm = document.getElementById('config-form');
        const textContinuous = document.getElementById('text-continuous');
        const textOffset = document.getElementById('text-offset');
        const textQrTimeout = document.getElementById('text-qr-timeout');

        window.CONTINUOUS_RECOGNITION_TIMEOUT = parseInt(textContinuous.value) || window.CONTINUOUS_RECOGNITION_TIMEOUT;
        window.COUNTDOWN_OFFSET = parseInt(textOffset.value) || window.COUNTDOWN_OFFSET;
        window.QR_DISPLAY_TIMEOUT = parseInt(textQrTimeout.value) || window.QR_DISPLAY_TIMEOUT;

        configForm.style.display = 'none';
    }

};

window.submitForm = function () {
    PopUp.readConfig();
};