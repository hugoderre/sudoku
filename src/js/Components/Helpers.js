export default class Helpers {
    static convertRowValuesToGroupedValues(rowValues) {
        const groupedValues = []
        let group = []
        let a = 0
        let b = 0
        for (let i = 0; i < 81; i++) {
            if (i != 0) {
                if (i % 27 === 0) {
                    a += 3
                    b = 0
                }
                if (i % 9 === 0) {
                    groupedValues.push(group)
                    group = []
                    a -= 3
                    b += 3
                }
                if (i % 3 === 0) {
                    a++
                    b -= 3
                }
            }
            group.push(rowValues[a][b])
            b++
        }
        groupedValues.push(group)
        return groupedValues
    }

    static convertGroupedValuesToRowValues(groupedValues) {
        return Helpers.convertRowValuesToGroupedValues(groupedValues)
    }

    static concatArraysInArray(array) {
        let result = []
        for (let i = 0; i < array.length; i++) {
            result = result.concat(array[i])
        }
        return result
    }

    static arraysInArray(array, itemByArray = 9) {
        let result = []
        let subArray = []
        for (let i = 0; i < array.length; i++) {
            if(i && i % itemByArray === 0) {
                result.push(subArray)
                subArray = []
            }
            subArray.push(array[i])
        }
        result.push(subArray)
        return result
    }
}