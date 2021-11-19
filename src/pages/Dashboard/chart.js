import React, { useRef, useEffect } from 'react'

const Canvas = props => {

    const canvasRef = useRef(null);
    const canvasStyle = {
        backgroundColor: 'green',
        width: '100%',
    }

    const draw = (canvas) => {
        const context = canvas.getContext('2d')
        // context.imageSmoothingQuality = "high";
        context.imageSmoothingEnabled = false;
        context.clearRect(0, 0, context.canvas.width, context.canvas.height);
        // const [screenWidth, screenHeight] = [canvas.clientWidth, canvas.clientHeight];

        const [canais, tempo] = [300, 50];
        const r1 = generateFrame(canais, tempo);
        // 300x148

        const w = 300 / canais;
        const h = 150 / tempo;
        // context.fillRect(0, 0, w, h);
        // context.fillRect(50 + 5, 0, w, h);
        // context.fillRect(100 + 10, 0, w, h);
        // context.fillRect(150 + 15, 0, w, h);
        for (let j = 0; j < tempo; j++) {
            const py = h * j;
            for (let i = 0; i < canais; i++) {
                const px = (w * i);
                let x = "rgb(0,0," + r1[j][i] + ")";
                context.fillStyle = x;
                context.fillRect(px, py, w, h);
            }
        }
    }

    const getRandomInt = (min, max) => {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min)) + min;
    }

    const generateFrame = (canais, tempo) => {
        const data = [];
        for (let j = 0; j < tempo; j++) {
            const line = [];
            for (let i = 0; i < canais; i++) {
                const x = getRandomInt(0, 254);
                line.push(x);
            }
            data.push(line);
        }
        return data;
    }
    const canvas = canvasRef.current;
    useEffect(() => {
        
    }, []);

    setInterval(() => canvas ? draw(canvas) : () => { }, 1000);
    return <canvas ref={canvasRef} {...props} style={canvasStyle} />
}

export default Canvas