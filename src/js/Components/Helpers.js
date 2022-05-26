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

    static gridHasDuplicateNumberInGroups() {
        const groups = Helpers.convertRowValuesToGroupedValues( this.grid );
        for (let group of groups) {
            if ((new Set(group)).size !== group.length) {
                return true
            }
        }
        return false
    }

    static getRowsValuesDuplicateCount( board ) {
        const rows = []
        rows[0] = Helpers.getMaxDuplicateValues(board.getCellValue( board.cells[0]) + board.getCellValue( board.cells[1]) + board.getCellValue( board.cells[2]) + board.getCellValue( board.cells[9]) + board.getCellValue( board.cells[10]) + board.getCellValue( board.cells[11]) + board.getCellValue( board.cells[18]) + board.getCellValue( board.cells[19]) + board.getCellValue( board.cells[20]) )
        rows[1] = Helpers.getMaxDuplicateValues(board.getCellValue( board.cells[3]) + board.getCellValue( board.cells[4]) + board.getCellValue( board.cells[5]) + board.getCellValue( board.cells[12]) + board.getCellValue( board.cells[13]) + board.getCellValue( board.cells[14]) + board.getCellValue( board.cells[21]) + board.getCellValue( board.cells[22]) + board.getCellValue( board.cells[23]))
        rows[2] = Helpers.getMaxDuplicateValues(board.getCellValue( board.cells[6]) + board.getCellValue( board.cells[7]) + board.getCellValue( board.cells[8]) + board.getCellValue( board.cells[15]) + board.getCellValue( board.cells[16]) + board.getCellValue( board.cells[17]) + board.getCellValue( board.cells[24]) + board.getCellValue( board.cells[25]) + board.getCellValue( board.cells[26]))
        rows[3] = Helpers.getMaxDuplicateValues(board.getCellValue( board.cells[27]) + board.getCellValue( board.cells[28]) + board.getCellValue( board.cells[29]) + board.getCellValue( board.cells[36]) + board.getCellValue( board.cells[37]) + board.getCellValue( board.cells[38]) + board.getCellValue( board.cells[45]) + board.getCellValue( board.cells[46]) + board.getCellValue( board.cells[47]))
        rows[4] = Helpers.getMaxDuplicateValues(board.getCellValue( board.cells[30]) + board.getCellValue( board.cells[31]) + board.getCellValue( board.cells[32]) + board.getCellValue( board.cells[39]) + board.getCellValue( board.cells[40]) + board.getCellValue( board.cells[41]) + board.getCellValue( board.cells[48]) + board.getCellValue( board.cells[49]) + board.getCellValue( board.cells[50]))
        rows[5] = Helpers.getMaxDuplicateValues(board.getCellValue( board.cells[33]) + board.getCellValue( board.cells[34]) + board.getCellValue( board.cells[35]) + board.getCellValue( board.cells[42]) + board.getCellValue( board.cells[43]) + board.getCellValue( board.cells[44]) + board.getCellValue( board.cells[51]) + board.getCellValue( board.cells[52]) + board.getCellValue( board.cells[53]))
        rows[6] = Helpers.getMaxDuplicateValues(board.getCellValue( board.cells[54]) + board.getCellValue( board.cells[55]) + board.getCellValue( board.cells[56]) + board.getCellValue( board.cells[63]) + board.getCellValue( board.cells[64]) + board.getCellValue( board.cells[65]) + board.getCellValue( board.cells[72]) + board.getCellValue( board.cells[73]) + board.getCellValue( board.cells[74]))
        rows[7] = Helpers.getMaxDuplicateValues(board.getCellValue( board.cells[57]) + board.getCellValue( board.cells[58]) + board.getCellValue( board.cells[59]) + board.getCellValue( board.cells[66]) + board.getCellValue( board.cells[67]) + board.getCellValue( board.cells[68]) + board.getCellValue( board.cells[75]) + board.getCellValue( board.cells[76]) + board.getCellValue( board.cells[77]))
        rows[8] = Helpers.getMaxDuplicateValues(board.getCellValue( board.cells[60]) + board.getCellValue( board.cells[61]) + board.getCellValue( board.cells[62]) + board.getCellValue( board.cells[69]) + board.getCellValue( board.cells[70]) + board.getCellValue( board.cells[71]) + board.getCellValue( board.cells[78]) + board.getCellValue( board.cells[79]) + board.getCellValue( board.cells[80]))

        // Debug rows cell values
        for (let i = 0; i < rows.length; i++) {
            document.getElementById('duplicates__row-' + (i + 1)).innerHTML = rows[i]
        }

        return rows
    }

    static getColumnsValuesDuplicateCount( board ) {
        const cols = []
        cols[0] = Helpers.getMaxDuplicateValues(board.getCellValue( board.cells[0]) + board.getCellValue( board.cells[3]) + board.getCellValue( board.cells[6]) + board.getCellValue( board.cells[27]) + board.getCellValue( board.cells[30]) + board.getCellValue( board.cells[33]) + board.getCellValue( board.cells[54]) + board.getCellValue( board.cells[57]) + board.getCellValue( board.cells[60]))
        cols[1] = Helpers.getMaxDuplicateValues(board.getCellValue( board.cells[1]) + board.getCellValue( board.cells[4]) + board.getCellValue( board.cells[7]) + board.getCellValue( board.cells[28]) + board.getCellValue( board.cells[31]) + board.getCellValue( board.cells[34]) + board.getCellValue( board.cells[55]) + board.getCellValue( board.cells[58]) + board.getCellValue( board.cells[61]))
        cols[2] = Helpers.getMaxDuplicateValues(board.getCellValue( board.cells[2]) + board.getCellValue( board.cells[5]) + board.getCellValue( board.cells[8]) + board.getCellValue( board.cells[29]) + board.getCellValue( board.cells[32]) + board.getCellValue( board.cells[35]) + board.getCellValue( board.cells[56]) + board.getCellValue( board.cells[59]) + board.getCellValue( board.cells[62]))
        cols[3] = Helpers.getMaxDuplicateValues(board.getCellValue( board.cells[9]) + board.getCellValue( board.cells[12]) + board.getCellValue( board.cells[15]) + board.getCellValue( board.cells[36]) + board.getCellValue( board.cells[39]) + board.getCellValue( board.cells[42]) + board.getCellValue( board.cells[63]) + board.getCellValue( board.cells[66]) + board.getCellValue( board.cells[69]))
        cols[4] = Helpers.getMaxDuplicateValues(board.getCellValue( board.cells[10]) + board.getCellValue( board.cells[13]) + board.getCellValue( board.cells[16]) + board.getCellValue( board.cells[37]) + board.getCellValue( board.cells[40]) + board.getCellValue( board.cells[43]) + board.getCellValue( board.cells[64]) + board.getCellValue( board.cells[67]) + board.getCellValue( board.cells[70]))
        cols[5] = Helpers.getMaxDuplicateValues(board.getCellValue( board.cells[11]) + board.getCellValue( board.cells[14]) + board.getCellValue( board.cells[17]) + board.getCellValue( board.cells[38]) + board.getCellValue( board.cells[41]) + board.getCellValue( board.cells[44]) + board.getCellValue( board.cells[65]) + board.getCellValue( board.cells[68]) + board.getCellValue( board.cells[71]))
        cols[6] = Helpers.getMaxDuplicateValues(board.getCellValue( board.cells[18]) + board.getCellValue( board.cells[21]) + board.getCellValue( board.cells[24]) + board.getCellValue( board.cells[45]) + board.getCellValue( board.cells[48]) + board.getCellValue( board.cells[51]) + board.getCellValue( board.cells[72]) + board.getCellValue( board.cells[75]) + board.getCellValue( board.cells[78]))
        cols[7] = Helpers.getMaxDuplicateValues(board.getCellValue( board.cells[19]) + board.getCellValue( board.cells[22]) + board.getCellValue( board.cells[25]) + board.getCellValue( board.cells[46]) + board.getCellValue( board.cells[49]) + board.getCellValue( board.cells[52]) + board.getCellValue( board.cells[73]) + board.getCellValue( board.cells[76]) + board.getCellValue( board.cells[79]))
        cols[8] = Helpers.getMaxDuplicateValues(board.getCellValue( board.cells[20]) + board.getCellValue( board.cells[23]) + board.getCellValue( board.cells[26]) + board.getCellValue( board.cells[47]) + board.getCellValue( board.cells[50]) + board.getCellValue( board.cells[53]) + board.getCellValue( board.cells[74]) + board.getCellValue( board.cells[77]) + board.getCellValue( board.cells[80]))

        // Debug columns cell values
        for (let i = 0; i < cols.length; i++) {
            document.getElementById('duplicates__col-' + (i + 1)).innerHTML = cols[i]
        }

        return cols
    }

    static getMaxDuplicateValues(row) {
        let count = {}
        for (let i = 0; i < row.length; i++) {
            if (count[row[i]]) {
                count[row[i]]++
            } else {
                count[row[i]] = 1
            }
        }
        let out = []
        for(let c of Object.values(count)) {
            out.push(c)
        }
        out.sort((a, b) => b - a)
        return out[0]
    }
}