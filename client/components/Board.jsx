import React, { useState, useEffect } from 'react'

export default function Board () {
  const [colorArr, setColorArr] = useState([])
  const [draggedItem, setDraggedItem] = useState(null)
  const [replacedItem, setReplacedItem] = useState(null)
  // const [replacedItem, setReplacedItem] = useState(null)

  const width = 8
  const candyColors = ['blue', 'red', 'green', 'yellow', 'orange', 'purple']

  function checkforColFour () {
    for (let i = 0; i < (width * (width - 3)); i++) {
      const colOfFour = [i, i + width, i + (width * 2), i + (width * 3)]
      const colorCheck = colorArr[i]

      if (colOfFour.every(item => colorArr[item] === colorCheck)) {
        // .map or ForEach?
        (colOfFour.map(item => colorArr[item] = ''))
        return true
      }
    }
  }

  function checkforColThree () {
    for (let i = 0; i < (width * (width - 2)); i++) {
      const colOfThree = [i, i + width, i + (width * 2)]
      const colorCheck = colorArr[i]

      if (colOfThree.every(item => colorArr[item] === colorCheck)) {
        (colOfThree.map(item => colorArr[item] = ''))
        return true
      }
    }
  }

  function checkforRowFour () {
    console.log((46 + 2) % width)
    for (let i = 0; i < (width * width); i++) {
      const rowOfFOur = [i, i + 1, i + 2, i + 3]
      const colorCheck = colorArr[i]
      const skipCheckFour = []
      if ((i + 1) % width === 0 || (i + 2) % width === 0 || (i + 3) % width === 0) {
        skipCheckFour.push(i)
      }
      if (skipCheckFour.includes(i) === false) {
        if (rowOfFOur.every(item => colorArr[item] === colorCheck)) {
          (rowOfFOur.map(item => colorArr[item] = ''))
          return true
        }
      }
    }
  }

  function checkforRowThree () {
    for (let i = 0; i < (width * width); i++) {
      const rowOfThree = [i, i + 1, i + 2]
      const colorCheck = colorArr[i]
      const skipCheck = []
      if ((i + 1) % width === 0 || (i + 2) % width === 0) {
        skipCheck.push(i)
      }
      if (skipCheck.includes(i) === false) {
        if (rowOfThree.every(item => colorArr[item] === colorCheck)) {
          (rowOfThree.map(item => colorArr[item] = ''))
          return true
        }
      }
    }
  }

  function dropToEmptySpace () {
    // const firstRow = Array.apply(null, Array(width)).map((x, i) => { return i })
    for (let i = 0; i < width * (width - 1); i++) {
      const firstRow = Array.apply(null, Array(width)).map((x, i) => { return i })
      const checkFirstRow = firstRow.includes(i)

      if (checkFirstRow && colorArr[i] === '') {
        colorArr[i] = candyColors[Math.floor(Math.random() * candyColors.length)]
      }

      if ((colorArr[i + width] === '')) {
        colorArr[i + width] = colorArr[i]
        colorArr[i] = ''
      }
    }
  }

  function handleOnDragStart (e) {
    setDraggedItem(e.target)
  }
  function handleOnDrop (e) {
    setReplacedItem(e.target)
  }
  function handleOnDragEnd (e) {
    const itemDraggedId = parseInt(draggedItem.getAttribute('data-id'))
    const itemReplacedId = parseInt(replacedItem.getAttribute('data-id'))
    // console.log(typeof itemReplacedId)
    // console.log(typeof itemDraggedId)

    colorArr[itemReplacedId] = draggedItem.style.backgroundColor
    colorArr[itemDraggedId] = replacedItem.style.backgroundColor

    const validMoves = [
      itemDraggedId - 1,
      itemDraggedId + 1,
      itemDraggedId - width,
      itemDraggedId + width
    ]

    const validMove = validMoves.includes(itemReplacedId)

    const isARowOfFour = checkforRowFour()
    const isAColOfFour = checkforColFour()
    const isARowOfThree = checkforRowThree()
    const isAColOfThree = checkforColThree()

    if (itemReplacedId && validMove && (isARowOfFour || isAColOfFour || isARowOfThree || isAColOfThree)) {
      setDraggedItem(null)
      setReplacedItem(null)
    } else {
      colorArr[itemReplacedId] = replacedItem.style.backgroundColor
      colorArr[itemDraggedId] = draggedItem.style.backgroundColor
      setColorArr([...colorArr])
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
      dropToEmptySpace()
      setColorArr([...colorArr])
    }, 100)
    return () => clearInterval(timer)
  }, [checkforColFour, checkforRowFour, checkforRowThree, checkforColThree, dropToEmptySpace, colorArr])

  return (
    <div className='Board'>
      <div className='game'>
        {colorArr.map((candy, index) => {
          return <img key={index}
            style={{ backgroundColor: candy }}
            alt={candy}
            data-id={index}
            draggable='true'
            onDragOver={(e) => e.preventDefault()}
            onDragEnter={(e) => e.preventDefault()}
            onDragLeave={(e) => e.preventDefault()}
            onDrop={ handleOnDrop }
            onDragStart={ handleOnDragStart }
            onDragEnd={ handleOnDragEnd }
          />
        })}
      </div>
    </div>
  )
}
