const devFlag = localStorage.getItem('DEV');
window.DEV = false;
if (devFlag == 'true') {
    window.DEV = true;
}
localStorage.setItem('DEV', window.DEV);

import { calculations } from './test.js';
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.8.3/firebase-app.js";
import { getStorage, ref, uploadString, getDownloadURL } from "https://www.gstatic.com/firebasejs/9.8.3/firebase-storage.js";
import { PopUp } from './popup.js';



window.CONTINUOUS_RECOGNITION_TIMEOUT = 2;
window.COUNTDOWN_OFFSET = 5;
window.QR_DISPLAY_TIMEOUT = 20;



const firebaseConfig = {
    storageBucket: 'gs://photobooth-870b7.appspot.com'
};
const app = initializeApp(firebaseConfig);


// const videoElement = document.getElementsByClassName('input_video')[0];
const videoElement = document.createElement('video');
videoElement.style.transform = "rotateY(180deg)";
videoElement.style.position = "fixed";
videoElement.style.top = 0;
videoElement.style.bottom = 0;
videoElement.style.left = 0;
videoElement.style.right = 0;
videoElement.style.visibility = 'hidden';
videoElement.autoplay = true;
videoElement.playsInline = true;
document.body.appendChild(videoElement);

const qrContainer = document.getElementById('qr-container');
const qrCode = document.getElementById('qrcode');
const imagePreview = document.getElementById('image-preview');
const canvasElement = document.getElementById('output_canvas');
const canvasCtx = canvasElement.getContext('2d');

const canvasCountDownElement = document.getElementById('countdown');
const canvasCountDownCtx = canvasCountDownElement.getContext('2d');

let countDownNumber = window.COUNTDOWN_OFFSET + 1;
window.palmDetectedStartTime = null;
window.isQrDisplayed = false;

function drawImageScaled(img, ctx) {
    var canvas = ctx.canvas;
    var hRatio = canvas.width / img.width;
    var vRatio = canvas.height / img.height;
    var ratio = Math.min(hRatio, vRatio);
    var centerShift_x = (canvas.width - img.width * ratio) / 2;
    var centerShift_y = (canvas.height - img.height * ratio) / 2;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(img, 0, 0, img.width, img.height,
        centerShift_x, centerShift_y, img.width * ratio, img.height * ratio);
}

function onResults(results) {
    // console.log(results);
    canvasCtx.save();
    // canvasCtx.clearRect(0, 0, canvasElement.width, canvasElement.height);
    // canvasCtx.drawImage(
    //     results.image, 0, 0, canvasElement.width, canvasElement.height);

    drawImageScaled(results.image, canvasCtx);

    if (window.isQrDisplayed) {
        return;
    }

    if (results.multiHandLandmarks && results.multiHandLandmarks.length > 0) {
        // console.log(results.multiHandLandmarks);
        let landmarks = results.multiHandLandmarks[0];
        if (window.DEV) {
            drawConnectors(canvasCtx, landmarks, HAND_CONNECTIONS, { color: '#00FF00', lineWidth: 5 });
            drawLandmarks(canvasCtx, landmarks, { color: '#FF0000', lineWidth: 2 });
        }
        let bool = calculations(landmarks, canvasCtx);
        if (bool) {

            if (!window.palmDetectedStartTime) {
                window.palmDetectedStartTime = new Date();
            } else {
                let currentTime = new Date();
                let diffTime = Math.abs(currentTime - window.palmDetectedStartTime);
                if (diffTime >= (CONTINUOUS_RECOGNITION_TIMEOUT * 1000)) {
                    window.palmDetectedStartTime = null;

                    let countdown = setInterval(() => {
                        window.isQrDisplayed = true;
                        countDownNumber--;
                        canvasCountDownCtx.clearRect(0, 0, canvasCountDownCtx.canvas.width, canvasCountDownCtx.canvas.height);
                        canvasCountDownCtx.fillStyle = 'white';
                        canvasCountDownCtx.globalAlpha = 0.8;
                        canvasCountDownCtx.fillRect(0, 0, canvasElement.width, canvasElement.height);
                        canvasCountDownCtx.fillStyle = 'black';
                        canvasCountDownCtx.font = '250px serif';
                        canvasCountDownCtx.lineWidth = 100;

                        let measuredText = canvasCountDownCtx.measureText(countDownNumber);

                        let overlayWidth = (canvasCountDownCtx.canvas.width / 2) - (measuredText.width / 2);
                        let overlayHeight = (canvasCountDownCtx.canvas.height / 2) + (125 / 2);

                        // console.log(measuredText, overlayWidth, overlayHeight);

                        canvasCountDownCtx.fillText(countDownNumber, overlayWidth, overlayHeight);
                        if (countDownNumber <= 0) {
                            clearInterval(countdown);
                            countDownNumber = window.COUNTDOWN_OFFSET + 1;
                            canvasCountDownCtx.clearRect(0, 0, canvasCountDownCtx.canvas.width, canvasCountDownCtx.canvas.height);

                            // var dataURL = canvasCtx.canvas.toDataURL("image/png");
                            // var newTab = window.open('about:blank', 'image from canvas');
                            // newTab.document.write("<img src='" + dataURL + "' alt='from canvas'/>");

                            const storage = getStorage(app);
                            const randomNum = Math.floor(Math.random() * Math.pow(10, 10));
                            const storageRef = ref(storage, randomNum + '.png');
                            // const message4 = 'data:text/plain;base64,5b6p5Y+344GX44G+44GX44Gf77yB44GK44KB44Gn44Go44GG77yB';
                            const imageDataUrl = canvasCtx.canvas.toDataURL("image/png");
                            uploadString(storageRef, imageDataUrl, 'data_url').then((snapshot) => {
                                // console.log(snapshot);
                                // console.log(storageRef);
                                getDownloadURL(storageRef)
                                    .then((url) => {
                                        qrcode.innerHTML = '';
                                        imagePreview.innerHTML = '';
                                        // console.log(url);

                                        let qrSize = {
                                            height: window.innerWidth * 0.25,
                                            width: window.innerWidth * 0.25
                                        }

                                        new QRCode(document.getElementById('qrcode'), {
                                            text: url,
                                            width: qrSize.width,
                                            height: qrSize.height,
                                            colorDark: '#000',
                                            colorLight: '#fff',
                                            correctLevel: QRCode.CorrectLevel.H
                                        });

                                        qrContainer.style.visibility = 'visible';

                                        let imagePreviewEl = document.createElement('img');
                                        imagePreviewEl.src = imageDataUrl;
                                        imagePreviewEl.classList.add('image-preview-el');

                                        imagePreview.appendChild(imagePreviewEl);

                                        setTimeout(() => {
                                            window.isQrDisplayed = false;
                                            qrContainer.style.visibility = 'hidden';
                                            qrcode.innerHTML = '';
                                            imagePreview.innerHTML = '';
                                        }, QR_DISPLAY_TIMEOUT * 1000);
                                    })
                            });

                            return;
                        }
                    }, 1 * 1000);

                    // alert('Start Timer to click a picture');
                }
            }
        } else {
            window.palmDetectedStartTime = null;
            window.isQrDisplayed = false;
        }

        // for (const landmarks of results.multiHandLandmarks) {
        //     drawConnectors(canvasCtx, landmarks, HAND_CONNECTIONS,
        //         { color: '#00FF00', lineWidth: 5 });
        //     drawLandmarks(canvasCtx, landmarks, { color: '#FF0000', lineWidth: 2 });
        // }
    } else {
        window.palmDetectedStartTime = null;
        window.isQrDisplayed = false;
    }

    if (window.DEV && results.multiHandedness && results.multiHandedness.length > 0) {
        let multiHandedness = results.multiHandedness[0];
        // console.log(multiHandedness.label);
        canvasCtx.font = '50px serif';
        var width = canvasCtx.measureText(multiHandedness.label);
        canvasCtx.fillText(multiHandedness.label, 100, 100);
    }

    canvasCtx.restore();
}

const hands = new Hands({
    locateFile: (file) => {
        return `https://cdn.jsdelivr.net/npm/@mediapipe/hands/${file}`;
    }
});
hands.setOptions({
    maxNumHands: 2,
    modelComplexity: 1,
    minDetectionConfidence: 0.5,
    minTrackingConfidence: 0.5
});
hands.onResults(onResults);

const camera = new Camera(videoElement, {
    onFrame: async () => {
        await hands.send({ image: videoElement });
    },
    // width: 1280,
    // height: 720,
    facingMode: 'user'
});
camera.start();


window.addEventListener('DOMContentLoaded', (event) => {
    canvasCtx.canvas.width = window.innerWidth;
    canvasCtx.canvas.height = window.innerHeight;
    canvasCountDownCtx.canvas.width = window.innerWidth;
    canvasCountDownCtx.canvas.height = window.innerHeight;
});

canvasCountDownElement.onclick = function () {
    PopUp.showPopup();
};