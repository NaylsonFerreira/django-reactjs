import React, { useRef, useEffect, useState } from 'react'
import { useDataProvider } from 'react-admin';
const Canvas = props => {

    const canvasRef = useRef(null);
    const canvasStyle = {
        backgroundColor: 'green',
        width: '100%',
    }

    const dataProvider = useDataProvider();
    const [matrix, setMatrix] = useState([]);

    const [min_channel, max_channel, seconds, intensity] = [0, 300, 50, 1];
    const channels = max_channel - min_channel;

    useEffect(() => {
        const canvas = canvasRef.current;
        const context = canvas.getContext('2d')
        // context.imageSmoothingQuality = "high";
        // context.imageSmoothingEnabled = false;
        context.clearRect(0, 0, context.canvas.width, context.canvas.height);
        // const [screenWidth, screenHeight] = [canvas.clientWidth, canvas.clientHeight];
        // 300x148

        const w = 300 / channels;
        const h = 150 / seconds;

        for (let second = 0; second < seconds; second++) {
            const py = h * second;
            for (let channel = 0; channel < channels; channel++) {
                const px = (w * channel);
                // Plot
                if (second < matrix.length) {
                    const c = matrix[second][channel];
                    let x = `rgb(0,${c * intensity},60)`;
                    context.fillStyle = x;
                }
                context.fillRect(px, py, w, h);
            }
        }

    }, [channels, intensity, matrix, seconds]);

    useEffect(() => {
        dataProvider.create('waterfall', {
            data: {
                date_start: "2021-11-09 15:08:00-03",
                date_end: "2021-11-09 15:09:00-03",
                channel_start: min_channel,
                channel_end: max_channel
            }
        }).then(({ data }) => {
            setMatrix(data.json);
        }).catch(error => {
            console.log(error);
        })

    }, [dataProvider, max_channel, min_channel]);

    return <canvas ref={canvasRef} {...props} style={canvasStyle} />
}

export default Canvas