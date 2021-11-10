import React, { useRef, useEffect } from 'react'

const Canvas = props => {

    const canvasRef = useRef(null)

    const draw = (ctx) => {
        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
        for (let i = 0; i < 10; i++) {
            const mov = (i * 100)
            ctx.fillRect(mov, i * 5, 100, 100);
        }
    }

    useEffect(() => {

        const canvas = canvasRef.current
        const context = canvas.getContext('2d')
        draw(context);

    }, [draw])

    return <canvas ref={canvasRef} {...props} />
}

export default Canvas