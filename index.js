import { calculations } from './test.js';



const COUNTDOWN_OFFSET = 6;





// const videoElement = document.getElementsByClassName('input_video')[0];
const videoElement = document.createElement('video');
videoElement.style.transform = "rotateY(180deg)";
videoElement.style.position = "fixed";
videoElement.style.top = 0;
videoElement.style.bottom = 0;
videoElement.style.left = 0;
videoElement.style.right = 0;
videoElement.style.visibility = 'hidden';
document.body.appendChild(videoElement);

const canvasElement = document.getElementById('output_canvas');
const canvasCtx = canvasElement.getContext('2d');

const canvasCountDownElement = document.getElementById('countdown');
const canvasCountDownCtx = canvasCountDownElement.getContext('2d');

window.palmDetectedStartTime = null;

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

    if (results.multiHandLandmarks && results.multiHandLandmarks.length > 0) {
        // console.log(results.multiHandLandmarks);
        let landmarks = results.multiHandLandmarks[0];
        drawConnectors(canvasCtx, landmarks, HAND_CONNECTIONS, { color: '#00FF00', lineWidth: 5 });
        drawLandmarks(canvasCtx, landmarks, { color: '#FF0000', lineWidth: 2 });
        let bool = calculations(landmarks, canvasCtx);
        if (bool) {
            if (!window.palmDetectedStartTime) {
                window.palmDetectedStartTime = new Date();
            } else {
                let currentTime = new Date();
                let diffTime = Math.abs(currentTime - window.palmDetectedStartTime);
                if (diffTime >= 2000) {
                    window.palmDetectedStartTime = null;

                    let countDownNumber = COUNTDOWN_OFFSET;

                    let countdown = setInterval(() => {
                        countDownNumber--;
                        canvasCountDownCtx.clearRect(0, 0, canvasCountDownCtx.canvas.width, canvasCountDownCtx.canvas.height);
                        canvasCountDownCtx.fillStyle = 'white';
                        canvasCountDownCtx.globalAlpha = 0.5;
                        canvasCountDownCtx.fillRect(0, 0, canvasElement.width, canvasElement.height);
                        canvasCountDownCtx.fillStyle = 'black';
                        canvasCountDownCtx.font = '250px serif';
                        canvasCountDownCtx.lineWidth = 100;
                        canvasCountDownCtx.fillText(countDownNumber, canvasCountDownCtx.canvas.width / 2, canvasCountDownCtx.canvas.height / 2);
                        if (countDownNumber <= 0) {
                            clearInterval(countdown);
                            countDownNumber = COUNTDOWN_OFFSET;
                            canvasCountDownCtx.clearRect(0, 0, canvasCountDownCtx.canvas.width, canvasCountDownCtx.canvas.height);

                            var dataURL = canvasCtx.canvas.toDataURL("image/png");
                            var newTab = window.open('about:blank', 'image from canvas');
                            newTab.document.write("<img src='" + dataURL + "' alt='from canvas'/>");

                            return;
                        }
                    }, 1 * 1000);

                    // alert('Start Timer to click a picture');
                }
            }
        }

        // for (const landmarks of results.multiHandLandmarks) {
        //     drawConnectors(canvasCtx, landmarks, HAND_CONNECTIONS,
        //         { color: '#00FF00', lineWidth: 5 });
        //     drawLandmarks(canvasCtx, landmarks, { color: '#FF0000', lineWidth: 2 });
        // }
    } else {
        window.palmDetectedStartTime = null;
    }

    if (results.multiHandedness && results.multiHandedness.length > 0) {
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
    width: 1280,
    height: 720,
    facingMode: 'user'
});
camera.start();


