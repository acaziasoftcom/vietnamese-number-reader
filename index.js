function separateNumber (inputNumber) {
  var bufferList = []
  while (inputNumber > 0) {
    bufferList.push(inputNumber % 10)
    inputNumber = Math.floor(inputNumber / 10)
  }
  return bufferList
}

function numberToString (list) {
  for (var i = 0; i < list.length; i++) {
    if (list[i] === 1 && (i % 3 === 0) && list[i + 1] > 1) {
      list[i] = 'mốt'
    } else if (list[i] === 1) {
      list[i] = 'một'
    } else if (list[i] === 2) {
      list[i] = 'hai'
    } else if (list[i] === 3) {
      list[i] = 'ba'
    } else if (list[i] === 4 && i % 3 !== 0) {
      list[i] = 'bốn'
    } else if (list[i] === 4 && i % 3 === 0) {
      list[i] = 'tư'
    } else if (list[i] === 5 && i % 3 !== 0) {
      list[i] = 'năm'
    } else if (list[i] === 5 && i % 3 === 0) {
      list[i] = 'lăm'
    } else if (list[i] === 6) {
      list[i] = 'sáu'
    } else if (list[i] === 7) {
      list[i] = 'bảy'
    } else if (list[i] === 8) {
      list[i] = 'tám'
    } else if (list[i] === 9) {
      list[i] = 'chín'
    } else {
      list[i] = 'không'
    }
  }

  return list
}

// Đọc tiền tố:
function readPrefix (list) {
  for (var i = 0; i < list.length; i++) {
    if (i % 3 === 0 && list[i] !== 'không') {
      list[i] += ''
    } else if (i % 3 === 0 && list[i] === 'không') {
      list[i] = ''
    } else if (i % 3 === 1 && list[i] === 'không' && list[i - 1] !== '') {
      list[i] = 'lẻ'
    } else if (i % 3 === 1 && list[i - 1] === 'không' && list[i - 1] === '') {
      list[i] = ''
    } else if (i % 3 === 1 && list[i] === 'một') {
      list[i] = ' mười' // Cái này là mười (<19)
    } else if (i % 3 === 1 && list[i] !== 'mốt') {
      list[i] += ' mươi' // Cái này là mươi (>19)
    } else {
      list[i] += ' trăm'
    }
  }

  return list
}

// Đọc hậu tố:
function readSuffix (list) {
  var len = list.length
  if (len <= 3) {
    list[0] += ''
  } else if (len > 3 && len <= 6) {
    list[0] += ''
    list[3] += ' nghìn'
  } else if (len > 6 && len <= 9) {
    list[0] += ''
    list[3] += ' nghìn'
    list[6] += ' triệu'
  } else {
    list[0] += ''
    list[3] += ' nghìn'
    list[6] += ' triệu'
    list[9] += ' tỉ'
  }

  return list
}

module.exports = function readNumber (inputNum) {
  var newArray = separateNumber(inputNum)
  var stringifiedNumber = numberToString(newArray)

  var pArray = readPrefix(stringifiedNumber)
  var sArray = readSuffix(pArray)
  var srArray = sArray.reverse()

  var result = ''

  for (var i = 0; i < srArray.length; i++) {
    result += srArray[i] + ' '
  }

  return result
}
