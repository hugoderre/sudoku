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

    static getRowsValuesDuplicateCount( grid ) {
        const rows = []
        rows[0] = Helpers.getMaxDuplicateValues(grid.getCellValue( grid.cells[0]) + grid.getCellValue( grid.cells[1]) + grid.getCellValue( grid.cells[2]) + grid.getCellValue( grid.cells[9]) + grid.getCellValue( grid.cells[10]) + grid.getCellValue( grid.cells[11]) + grid.getCellValue( grid.cells[18]) + grid.getCellValue( grid.cells[19]) + grid.getCellValue( grid.cells[20]) )
        rows[1] = Helpers.getMaxDuplicateValues(grid.getCellValue( grid.cells[3]) + grid.getCellValue( grid.cells[4]) + grid.getCellValue( grid.cells[5]) + grid.getCellValue( grid.cells[12]) + grid.getCellValue( grid.cells[13]) + grid.getCellValue( grid.cells[14]) + grid.getCellValue( grid.cells[21]) + grid.getCellValue( grid.cells[22]) + grid.getCellValue( grid.cells[23]))
        rows[2] = Helpers.getMaxDuplicateValues(grid.getCellValue( grid.cells[6]) + grid.getCellValue( grid.cells[7]) + grid.getCellValue( grid.cells[8]) + grid.getCellValue( grid.cells[15]) + grid.getCellValue( grid.cells[16]) + grid.getCellValue( grid.cells[17]) + grid.getCellValue( grid.cells[24]) + grid.getCellValue( grid.cells[25]) + grid.getCellValue( grid.cells[26]))
        rows[3] = Helpers.getMaxDuplicateValues(grid.getCellValue( grid.cells[27]) + grid.getCellValue( grid.cells[28]) + grid.getCellValue( grid.cells[29]) + grid.getCellValue( grid.cells[36]) + grid.getCellValue( grid.cells[37]) + grid.getCellValue( grid.cells[38]) + grid.getCellValue( grid.cells[45]) + grid.getCellValue( grid.cells[46]) + grid.getCellValue( grid.cells[47]))
        rows[4] = Helpers.getMaxDuplicateValues(grid.getCellValue( grid.cells[30]) + grid.getCellValue( grid.cells[31]) + grid.getCellValue( grid.cells[32]) + grid.getCellValue( grid.cells[39]) + grid.getCellValue( grid.cells[40]) + grid.getCellValue( grid.cells[41]) + grid.getCellValue( grid.cells[48]) + grid.getCellValue( grid.cells[49]) + grid.getCellValue( grid.cells[50]))
        rows[5] = Helpers.getMaxDuplicateValues(grid.getCellValue( grid.cells[33]) + grid.getCellValue( grid.cells[34]) + grid.getCellValue( grid.cells[35]) + grid.getCellValue( grid.cells[42]) + grid.getCellValue( grid.cells[43]) + grid.getCellValue( grid.cells[44]) + grid.getCellValue( grid.cells[51]) + grid.getCellValue( grid.cells[52]) + grid.getCellValue( grid.cells[53]))
        rows[6] = Helpers.getMaxDuplicateValues(grid.getCellValue( grid.cells[54]) + grid.getCellValue( grid.cells[55]) + grid.getCellValue( grid.cells[56]) + grid.getCellValue( grid.cells[63]) + grid.getCellValue( grid.cells[64]) + grid.getCellValue( grid.cells[65]) + grid.getCellValue( grid.cells[72]) + grid.getCellValue( grid.cells[73]) + grid.getCellValue( grid.cells[74]))
        rows[7] = Helpers.getMaxDuplicateValues(grid.getCellValue( grid.cells[57]) + grid.getCellValue( grid.cells[58]) + grid.getCellValue( grid.cells[59]) + grid.getCellValue( grid.cells[66]) + grid.getCellValue( grid.cells[67]) + grid.getCellValue( grid.cells[68]) + grid.getCellValue( grid.cells[75]) + grid.getCellValue( grid.cells[76]) + grid.getCellValue( grid.cells[77]))
        rows[8] = Helpers.getMaxDuplicateValues(grid.getCellValue( grid.cells[60]) + grid.getCellValue( grid.cells[61]) + grid.getCellValue( grid.cells[62]) + grid.getCellValue( grid.cells[69]) + grid.getCellValue( grid.cells[70]) + grid.getCellValue( grid.cells[71]) + grid.getCellValue( grid.cells[78]) + grid.getCellValue( grid.cells[79]) + grid.getCellValue( grid.cells[80]))

        // Debug rows cell values
        for (let i = 0; i < rows.length; i++) {
            document.getElementById('duplicates__row-' + (i + 1)).innerHTML = rows[i]
        }

        return rows
    }

    static getColumnsValuesDuplicateCount( grid ) {
        const cols = []
        cols[0] = Helpers.getMaxDuplicateValues(grid.getCellValue( grid.cells[0]) + grid.getCellValue( grid.cells[3]) + grid.getCellValue( grid.cells[6]) + grid.getCellValue( grid.cells[27]) + grid.getCellValue( grid.cells[30]) + grid.getCellValue( grid.cells[33]) + grid.getCellValue( grid.cells[54]) + grid.getCellValue( grid.cells[57]) + grid.getCellValue( grid.cells[60]))
        cols[1] = Helpers.getMaxDuplicateValues(grid.getCellValue( grid.cells[1]) + grid.getCellValue( grid.cells[4]) + grid.getCellValue( grid.cells[7]) + grid.getCellValue( grid.cells[28]) + grid.getCellValue( grid.cells[31]) + grid.getCellValue( grid.cells[34]) + grid.getCellValue( grid.cells[55]) + grid.getCellValue( grid.cells[58]) + grid.getCellValue( grid.cells[61]))
        cols[2] = Helpers.getMaxDuplicateValues(grid.getCellValue( grid.cells[2]) + grid.getCellValue( grid.cells[5]) + grid.getCellValue( grid.cells[8]) + grid.getCellValue( grid.cells[29]) + grid.getCellValue( grid.cells[32]) + grid.getCellValue( grid.cells[35]) + grid.getCellValue( grid.cells[56]) + grid.getCellValue( grid.cells[59]) + grid.getCellValue( grid.cells[62]))
        cols[3] = Helpers.getMaxDuplicateValues(grid.getCellValue( grid.cells[9]) + grid.getCellValue( grid.cells[12]) + grid.getCellValue( grid.cells[15]) + grid.getCellValue( grid.cells[36]) + grid.getCellValue( grid.cells[39]) + grid.getCellValue( grid.cells[42]) + grid.getCellValue( grid.cells[63]) + grid.getCellValue( grid.cells[66]) + grid.getCellValue( grid.cells[69]))
        cols[4] = Helpers.getMaxDuplicateValues(grid.getCellValue( grid.cells[10]) + grid.getCellValue( grid.cells[13]) + grid.getCellValue( grid.cells[16]) + grid.getCellValue( grid.cells[37]) + grid.getCellValue( grid.cells[40]) + grid.getCellValue( grid.cells[43]) + grid.getCellValue( grid.cells[64]) + grid.getCellValue( grid.cells[67]) + grid.getCellValue( grid.cells[70]))
        cols[5] = Helpers.getMaxDuplicateValues(grid.getCellValue( grid.cells[11]) + grid.getCellValue( grid.cells[14]) + grid.getCellValue( grid.cells[17]) + grid.getCellValue( grid.cells[38]) + grid.getCellValue( grid.cells[41]) + grid.getCellValue( grid.cells[44]) + grid.getCellValue( grid.cells[65]) + grid.getCellValue( grid.cells[68]) + grid.getCellValue( grid.cells[71]))
        cols[6] = Helpers.getMaxDuplicateValues(grid.getCellValue( grid.cells[18]) + grid.getCellValue( grid.cells[21]) + grid.getCellValue( grid.cells[24]) + grid.getCellValue( grid.cells[45]) + grid.getCellValue( grid.cells[48]) + grid.getCellValue( grid.cells[51]) + grid.getCellValue( grid.cells[72]) + grid.getCellValue( grid.cells[75]) + grid.getCellValue( grid.cells[78]))
        cols[7] = Helpers.getMaxDuplicateValues(grid.getCellValue( grid.cells[19]) + grid.getCellValue( grid.cells[22]) + grid.getCellValue( grid.cells[25]) + grid.getCellValue( grid.cells[46]) + grid.getCellValue( grid.cells[49]) + grid.getCellValue( grid.cells[52]) + grid.getCellValue( grid.cells[73]) + grid.getCellValue( grid.cells[76]) + grid.getCellValue( grid.cells[79]))
        cols[8] = Helpers.getMaxDuplicateValues(grid.getCellValue( grid.cells[20]) + grid.getCellValue( grid.cells[23]) + grid.getCellValue( grid.cells[26]) + grid.getCellValue( grid.cells[47]) + grid.getCellValue( grid.cells[50]) + grid.getCellValue( grid.cells[53]) + grid.getCellValue( grid.cells[74]) + grid.getCellValue( grid.cells[77]) + grid.getCellValue( grid.cells[80]))

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