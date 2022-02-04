import React, { useState, useEffect } from 'react'

export default function Board () {
  const [colorArr, setColorArr] = useState([])

  const width = 8
  const candyColors = ['blue', 'red', 'green', 'yellow', 'orange', 'purple']

  function createBoard () {
    const randomColorArr = []
    for (let i = 0; i < width * width; i++) {
      const randomColor = candyColors[Math.floor(Math.random() * candyColors.length)]
      randomColorArr.push(randomColor)
    }
    setColorArr(randomColorArr)
  }

  useEffect(() => {
    createBoard()
  }, [])
  return (
    <div className='Board'>
      <div className='game'>
        {colorArr.map((candy, index) => {
          return <img key={index} style={{ backgroundColor: candy }}/>
        })}
        {console.log(colorArr)}
      </div>
    </div>
  )
}
