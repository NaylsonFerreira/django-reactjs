import React, { useRef, useEffect, useState } from 'react'
import { useDataProvider } from 'react-admin';
const now = new Date();

const Canvas = ({
    min_channel,
    max_channel = 2048,
    seconds = 50,
    intensity = 2,
    date_start = now,
    date_end = now,
    ...props
}) => {
    // "2021-11-09 15:07:05-03"
    const canvasRef = useRef(null);
    const canvasStyle = {
        backgroundColor: 'green',
        width: '100%',
    }

    const dataProvider = useDataProvider();
    const [matrix, setMatrix] = useState([]);

    // const [min_channel, max_channel, seconds, intensity] = [0, 2048, 50, 2];
    const channels = max_channel - min_channel;

    const nextRequest = (date_input) => {
        const [date, time] = date_input.split("T");
        const [y, m, d] = date.split("-");
        const start = new Date(`${y}-${m}-${d}T${time}`);
        const end = new Date(`${y}-${m}-${d}T${time}`);
        start.setSeconds(start.getSeconds() - (2 * seconds));
        end.setSeconds(end.getSeconds() - seconds);
        console.log(start);
        console.log(end);
        return [start, end];
    }

    useEffect(() => {
        const canvas = canvasRef.current;
        const context = canvas.getContext('2d')
        // context.imageSmoothingQuality = "high";
        // context.imageSmoothingEnabled = false;
        context.clearRect(0, 0, context.canvas.width, context.canvas.height);
        // const [screenWidth, screenHeight] = [canvas.clientWidth, canvas.clientHeight];
        // 300x148

        const frames = seconds / 0.256
        const w = 300 / channels;
        const h = 150 / frames;

        for (let second = 0; second < frames; second++) {
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
        const [start, end] = nextRequest(date_start);
        dataProvider.create('waterfall/', {
            data: {
                date_start: start,
                date_end: end,
                channel_start: min_channel,
                channel_end: max_channel
            }
        }).then(({ data }) => {
            setMatrix(data.json);
        }).catch(error => {
            console.log(error);
        })

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [date_start, max_channel, min_channel, seconds]);

    return <canvas ref={canvasRef} {...props} style={canvasStyle} />
}

export default Canvas