import React, { useRef, useEffect } from 'react'

 function Canvas(props){

    const canvasRef = useRef(null)

    function draw(ctx) {
        ctx.fillStyle = "#000000"
        ctx.beginPath()
        ctx.arc(50,100,20,0,2*Math.PI)
        ctx.fill()
    }

    useEffect(() => {
        const canvas = canvasRef.current
        const context = canvas.getContext('2d')
    
        // context.fillStyle= '#000000'
        // context.fillRect(0,0, context.canvas.width, context.canvas.height)
        draw(context)
    }, [draw])

    return <canvas ref={canvasRef} {...props} />

}

export default Canvas
