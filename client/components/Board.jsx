import React, { useState, useEffect } from 'react'

export default function Board () {
  const [colorArr, setColorArr] = useState([])

  const width = 8
  const candyColors = ['blue', 'red', 'green', 'yellow', 'orange', 'purple']

  function checkforColFour () {
    for (let i = 0; i < (width * (width - 3)); i++) {
      const colOfFour = [i, i + width, i + width * 2, i + width * 3]
      const colorCheck = colorArr[i]

      if (colOfFour.every(item => colorArr[item] === colorCheck)) {
        return colOfFour.map(item => colorArr[item] = '')
      }
    }
  }

  function checkforColThree () {
    for (let i = 0; i < (width * (width - 2)); i++) {
      const colOfThree = [i, i + width, i + width * 2]
      const colorCheck = colorArr[i]

      if (colOfThree.every(item => colorArr[item] === colorCheck)) {
        return colOfThree.map(item => colorArr[item] = '')
      }
    }
  }

  function checkforRowFour () {
    for (let i = 0; i < (width * width); i++) {
      const rowOfFOur = [i, i + 1, i + 2, i + 3]
      const colorCheck = colorArr[i]
      const skipCheck = []
      if (i + 1 % width === 0) {
        skipCheck.push(i - 1)
        skipCheck.push(i - 2)
        skipCheck.push(i - 3)
      }
      console.log(skipCheck)
      if (!skipCheck.includes(i)) continue

      if (rowOfFOur.every(item => colorArr[item] === colorCheck)) {
        return rowOfFOur.map(item => colorArr[item] = '')
      }
    }
  }

  function checkforRowThree () {
    for (let i = 0; i < (width * width); i++) {
      const rowOfThree = [i, i + 1, i + 2]
      const colorCheck = colorArr[i]
      const skipCheck = []
      if (i + 1 % width === 0) {
        skipCheck.push(i - 1)
        skipCheck.push(i - 2)
      }
      console.log(skipCheck)

      if (skipCheck.includes(i)) continue

      if (rowOfThree.every(item => colorArr[item] === colorCheck)) {
        return rowOfThree.map(item => colorArr[item] = '')
      }
    }
  }

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

  useEffect(() => {
    const timer = setInterval(() => {
      checkforRowFour()
      checkforColFour()
      checkforRowThree()
      checkforColThree()
      setColorArr([...colorArr])
    }, 100)
    return () => clearInterval(timer)
  }, [checkforColFour, checkforRowFour, checkforRowThree, checkforColThree, colorArr])

  return (
    <div className='Board'>
      <div className='game'>
        {colorArr.map((candy, index) => {
          return <img key={index} style={{ backgroundColor: candy }} alt={candy}/>
        })}
      </div>
    </div>
  )
}
