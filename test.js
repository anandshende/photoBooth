function distance(p1, p2) {
    return Math.hypot(p1.x - p2.x, p1.y - p2.y);
}

function middleFingerChecks(multiHandLandmarks, canvasCtx) {
    let wristpoint = { x: multiHandLandmarks[0].x, y: multiHandLandmarks[0].y };
    let middleFingerMcp = { x: multiHandLandmarks[9].x, y: multiHandLandmarks[9].y };
    let middleFingerKn1 = { x: multiHandLandmarks[10].x, y: multiHandLandmarks[10].y };
    let middleFingerKn2 = { x: multiHandLandmarks[11].x, y: multiHandLandmarks[11].y };
    let middleFingerTip = { x: multiHandLandmarks[12].x, y: multiHandLandmarks[12].y };

    let flag = true;

    // wrist to middle finger base
    if (wristpoint.y > middleFingerMcp.y) {
        let x = 0;
        let y = wristpoint.y * 768;
        let width = 1200;
        let height = (wristpoint.y - middleFingerMcp.y) * 768;

        canvasCtx.fillStyle = 'green';
        canvasCtx.globalAlpha = 0.5;

        // canvasCtx.fillRect(x, y - height, width, height);
    } else {
        flag = false;
    }

    // middle finger base to knuckle 1
    if (middleFingerMcp.y > middleFingerKn1.y) {
        let x = 0;
        let y = middleFingerMcp.y * 768;
        let width = 1200;
        let height = (middleFingerMcp.y - middleFingerKn1.y) * 768;

        canvasCtx.fillStyle = 'yellow';
        canvasCtx.globalAlpha = 0.5;

        // canvasCtx.fillRect(x, y - height, width, height);
    } else {
        flag = false;
    }

    // middle knucle 1 to knuckle 2
    if (middleFingerKn1.y > middleFingerKn2.y) {
        let x = 0;
        let y = middleFingerKn1.y * 768;
        let width = 1200;
        let height = (middleFingerKn1.y - middleFingerKn2.y) * 768;

        canvasCtx.fillStyle = 'red';
        canvasCtx.globalAlpha = 0.5;

        // canvasCtx.fillRect(x, y - height, width, height);
    } else {
        flag = false;
    }

    // middle knucle 2 to tip
    if (middleFingerKn2.y > middleFingerTip.y) {
        let x = 0;
        let y = middleFingerKn2.y * 768;
        let width = 1200;
        let height = (middleFingerKn2.y - middleFingerTip.y) * 768;

        canvasCtx.fillStyle = 'blue';
        canvasCtx.globalAlpha = 0.5;

        // canvasCtx.fillRect(x, y - height, width, height);
    } else {
        flag = false;
    }
    return flag;
}

function indexFingerChecks(multiHandLandmarks, canvasCtx) {
    let wristpoint = { x: multiHandLandmarks[0].x, y: multiHandLandmarks[0].y };
    let middleFingerMcp = { x: multiHandLandmarks[5].x, y: multiHandLandmarks[5].y };
    let middleFingerKn1 = { x: multiHandLandmarks[6].x, y: multiHandLandmarks[6].y };
    let middleFingerKn2 = { x: multiHandLandmarks[7].x, y: multiHandLandmarks[7].y };
    let middleFingerTip = { x: multiHandLandmarks[8].x, y: multiHandLandmarks[8].y };

    let flag = true;

    // wrist to middle finger base
    if (wristpoint.y > middleFingerMcp.y) {
        let x = 0;
        let y = wristpoint.y * 768;
        let width = 1200;
        let height = (wristpoint.y - middleFingerMcp.y) * 768;

        canvasCtx.fillStyle = 'green';
        canvasCtx.globalAlpha = 0.5;

        // canvasCtx.fillRect(x, y - height, width, height);
    } else {
        flag = false;
    }

    // middle finger base to knuckle 1
    if (middleFingerMcp.y > middleFingerKn1.y) {
        let x = 0;
        let y = middleFingerMcp.y * 768;
        let width = 1200;
        let height = (middleFingerMcp.y - middleFingerKn1.y) * 768;

        canvasCtx.fillStyle = 'yellow';
        canvasCtx.globalAlpha = 0.5;

        // canvasCtx.fillRect(x, y - height, width, height);
    } else {
        flag = false;
    }

    // middle knucle 1 to knuckle 2
    if (middleFingerKn1.y > middleFingerKn2.y) {
        let x = 0;
        let y = middleFingerKn1.y * 768;
        let width = 1200;
        let height = (middleFingerKn1.y - middleFingerKn2.y) * 768;

        canvasCtx.fillStyle = 'red';
        canvasCtx.globalAlpha = 0.5;

        // canvasCtx.fillRect(x, y - height, width, height);
    } else {
        flag = false;
    }

    // middle knucle 2 to tip
    if (middleFingerKn2.y > middleFingerTip.y) {
        let x = 0;
        let y = middleFingerKn2.y * 768;
        let width = 1200;
        let height = (middleFingerKn2.y - middleFingerTip.y) * 768;

        canvasCtx.fillStyle = 'blue';
        canvasCtx.globalAlpha = 0.5;

        // canvasCtx.fillRect(x, y - height, width, height);
    } else {
        flag = false;
    }
    return flag;
}

function ringFingerChecks(multiHandLandmarks, canvasCtx) {
    let wristpoint = { x: multiHandLandmarks[0].x, y: multiHandLandmarks[0].y };
    let middleFingerMcp = { x: multiHandLandmarks[13].x, y: multiHandLandmarks[13].y };
    let middleFingerKn1 = { x: multiHandLandmarks[14].x, y: multiHandLandmarks[14].y };
    let middleFingerKn2 = { x: multiHandLandmarks[15].x, y: multiHandLandmarks[15].y };
    let middleFingerTip = { x: multiHandLandmarks[16].x, y: multiHandLandmarks[16].y };

    let flag = true;

    // wrist to middle finger base
    if (wristpoint.y > middleFingerMcp.y) {
        let x = 0;
        let y = wristpoint.y * 768;
        let width = 1200;
        let height = (wristpoint.y - middleFingerMcp.y) * 768;

        canvasCtx.fillStyle = 'green';
        canvasCtx.globalAlpha = 0.5;

        // canvasCtx.fillRect(x, y - height, width, height);
    } else {
        flag = false;
    }

    // middle finger base to knuckle 1
    if (middleFingerMcp.y > middleFingerKn1.y) {
        let x = 0;
        let y = middleFingerMcp.y * 768;
        let width = 1200;
        let height = (middleFingerMcp.y - middleFingerKn1.y) * 768;

        canvasCtx.fillStyle = 'yellow';
        canvasCtx.globalAlpha = 0.5;

        // canvasCtx.fillRect(x, y - height, width, height);
    } else {
        flag = false;
    }

    // middle knucle 1 to knuckle 2
    if (middleFingerKn1.y > middleFingerKn2.y) {
        let x = 0;
        let y = middleFingerKn1.y * 768;
        let width = 1200;
        let height = (middleFingerKn1.y - middleFingerKn2.y) * 768;

        canvasCtx.fillStyle = 'red';
        canvasCtx.globalAlpha = 0.5;

        // canvasCtx.fillRect(x, y - height, width, height);
    } else {
        flag = false;
    }

    // middle knucle 2 to tip
    if (middleFingerKn2.y > middleFingerTip.y) {
        let x = 0;
        let y = middleFingerKn2.y * 768;
        let width = 1200;
        let height = (middleFingerKn2.y - middleFingerTip.y) * 768;

        canvasCtx.fillStyle = 'blue';
        canvasCtx.globalAlpha = 0.5;

        // canvasCtx.fillRect(x, y - height, width, height);
    } else {
        flag = false;
    }
    return flag;
}

function littleFingerChecks(multiHandLandmarks, canvasCtx) {
    let wristpoint = { x: multiHandLandmarks[0].x, y: multiHandLandmarks[0].y };
    let middleFingerMcp = { x: multiHandLandmarks[17].x, y: multiHandLandmarks[17].y };
    let middleFingerKn1 = { x: multiHandLandmarks[18].x, y: multiHandLandmarks[18].y };
    let middleFingerKn2 = { x: multiHandLandmarks[19].x, y: multiHandLandmarks[19].y };
    let middleFingerTip = { x: multiHandLandmarks[20].x, y: multiHandLandmarks[20].y };

    let flag = true;

    // wrist to middle finger base
    if (wristpoint.y > middleFingerMcp.y) {
        let x = 0;
        let y = wristpoint.y * 768;
        let width = 1200;
        let height = (wristpoint.y - middleFingerMcp.y) * 768;

        canvasCtx.fillStyle = 'green';
        canvasCtx.globalAlpha = 0.5;

        // canvasCtx.fillRect(x, y - height, width, height);
    } else {
        flag = false;
    }

    // middle finger base to knuckle 1
    if (middleFingerMcp.y > middleFingerKn1.y) {
        let x = 0;
        let y = middleFingerMcp.y * 768;
        let width = 1200;
        let height = (middleFingerMcp.y - middleFingerKn1.y) * 768;

        canvasCtx.fillStyle = 'yellow';
        canvasCtx.globalAlpha = 0.5;

        // canvasCtx.fillRect(x, y - height, width, height);
    } else {
        flag = false;
    }

    // middle knucle 1 to knuckle 2
    if (middleFingerKn1.y > middleFingerKn2.y) {
        let x = 0;
        let y = middleFingerKn1.y * 768;
        let width = 1200;
        let height = (middleFingerKn1.y - middleFingerKn2.y) * 768;

        canvasCtx.fillStyle = 'red';
        canvasCtx.globalAlpha = 0.5;

        // canvasCtx.fillRect(x, y - height, width, height);
    } else {
        flag = false;
    }

    // middle knucle 2 to tip
    if (middleFingerKn2.y > middleFingerTip.y) {
        let x = 0;
        let y = middleFingerKn2.y * 768;
        let width = 1200;
        let height = (middleFingerKn2.y - middleFingerTip.y) * 768;

        canvasCtx.fillStyle = 'blue';
        canvasCtx.globalAlpha = 0.5;

        // canvasCtx.fillRect(x, y - height, width, height);
    } else {
        flag = false;
    }
    return flag;
}

function thumbFingerChecks(multiHandLandmarks, canvasCtx) {
    let wristpoint = { x: multiHandLandmarks[0].x, y: multiHandLandmarks[0].y };
    let middleFingerMcp = { x: multiHandLandmarks[1].x, y: multiHandLandmarks[1].y };
    let middleFingerKn1 = { x: multiHandLandmarks[2].x, y: multiHandLandmarks[2].y };
    let middleFingerKn2 = { x: multiHandLandmarks[3].x, y: multiHandLandmarks[3].y };
    let middleFingerTip = { x: multiHandLandmarks[4].x, y: multiHandLandmarks[4].y };

    let flag = true;

    // wrist to middle finger base
    if (wristpoint.y > middleFingerMcp.y) {
        let x = 0;
        let y = wristpoint.y * 768;
        let width = 1200;
        let height = (wristpoint.y - middleFingerMcp.y) * 768;

        canvasCtx.fillStyle = 'green';
        canvasCtx.globalAlpha = 0.5;

        // canvasCtx.fillRect(x, y - height, width, height);
    } else {
        flag = false;
    }

    // middle finger base to knuckle 1
    if (middleFingerMcp.y > middleFingerKn1.y) {
        let x = 0;
        let y = middleFingerMcp.y * 768;
        let width = 1200;
        let height = (middleFingerMcp.y - middleFingerKn1.y) * 768;

        canvasCtx.fillStyle = 'yellow';
        canvasCtx.globalAlpha = 0.5;

        // canvasCtx.fillRect(x, y - height, width, height);
    } else {
        flag = false;
    }

    // middle knucle 1 to knuckle 2
    if (middleFingerKn1.y > middleFingerKn2.y) {
        let x = 0;
        let y = middleFingerKn1.y * 768;
        let width = 1200;
        let height = (middleFingerKn1.y - middleFingerKn2.y) * 768;

        canvasCtx.fillStyle = 'red';
        canvasCtx.globalAlpha = 0.5;

        // canvasCtx.fillRect(x, y - height, width, height);
    } else {
        flag = false;
    }

    // middle knucle 2 to tip
    if (middleFingerKn2.y > middleFingerTip.y) {
        let x = 0;
        let y = middleFingerKn2.y * 768;
        let width = 1200;
        let height = (middleFingerKn2.y - middleFingerTip.y) * 768;

        canvasCtx.fillStyle = 'blue';
        canvasCtx.globalAlpha = 0.5;

        // canvasCtx.fillRect(x, y - height, width, height);
    } else {
        flag = false;
    }
    return flag;
}


export function calculations(multiHandLandmarks, canvasCtx) {
    let wristpoint = { x: multiHandLandmarks[0].x, y: multiHandLandmarks[0].y };
    let thumbTip = { x: multiHandLandmarks[4].x, y: multiHandLandmarks[4].y };
    let indexFingerTip = { x: multiHandLandmarks[8].x, y: multiHandLandmarks[8].y };
    let middleFingerTip = { x: multiHandLandmarks[12].x, y: multiHandLandmarks[12].y };
    let ringFingerTip = { x: multiHandLandmarks[16].x, y: multiHandLandmarks[16].y };
    let littleFingerTip = { x: multiHandLandmarks[20].x, y: multiHandLandmarks[20].y };

    // const palmDist = distance(wristpoint, middleFingerMcp);
    // const fingerDist = distance(middleFingerMcp, middleFingerTip);
    // const totalMiddleDist = distance(wristpoint, middleFingerTip);

    // console.log('X :: ', wristpoint.x, middleFingerMcp.x, middleFingerTip.x);
    // console.log('Y :: ', wristpoint.y, middleFingerMcp.y, middleFingerTip.y);
    // console.log('Middle finger calc :: ', palmDist, fingerDist, totalMiddleDist);


    if (middleFingerChecks(multiHandLandmarks, canvasCtx)) {
        if (indexFingerChecks(multiHandLandmarks, canvasCtx)) {
            if (ringFingerChecks(multiHandLandmarks, canvasCtx)) {
                if (littleFingerChecks(multiHandLandmarks, canvasCtx)) {
                    if (thumbFingerChecks(multiHandLandmarks, canvasCtx)) {

                        let xMin = Math.min(wristpoint.x, thumbTip.x, indexFingerTip.x, middleFingerTip.x, ringFingerTip.x, littleFingerTip.x);
                        let xMax = Math.max(wristpoint.x, thumbTip.x, indexFingerTip.x, middleFingerTip.x, ringFingerTip.x, littleFingerTip.x);
                        let yMin = Math.min(wristpoint.y, thumbTip.y, indexFingerTip.y, middleFingerTip.y, ringFingerTip.y, littleFingerTip.y);
                        let yMax = Math.max(wristpoint.y, thumbTip.y, indexFingerTip.y, middleFingerTip.y, ringFingerTip.y, littleFingerTip.y);

                        let x = xMin * 1366;
                        let y = yMin * 768;
                        let width = (xMax - xMin) * 1366;
                        let height = (yMax - yMin) * 768;

                        canvasCtx.fillStyle = 'red';
                        canvasCtx.globalAlpha = 0.5;

                        canvasCtx.fillRect(x, y, width, height);

                        return true;
                    }
                }
            }
        }
    }
}