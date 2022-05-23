export default class Generator {
    constructor( board, difficulty ) {
        this.board = board
        this.difficulty = difficulty
    }

    generateValues() {
        
        for (let groupIndex = 0; groupIndex < 9; groupIndex++) {
            this.generateValuesForGroup( groupIndex )
        }

        let groupWithMostDouble = this.getGroupWithMostDouble()

       
        for (let i = 0; i < 20000; i++) {
            this.generateValuesForGroup( groupWithMostDouble )
            groupWithMostDouble = this.getGroupWithMostDouble()
            console.log(groupWithMostDouble)
            
        }
    }

    generateValuesForGroup( groupIndex ) {
        const sudokuValues = [ 1, 2, 3, 4, 5, 6, 7, 8, 9 ]
        for (let i = 0; i < 9; i++) {
            const sudokuValue = sudokuValues.splice( Math.floor( Math.random() * sudokuValues.length ), 1 )[ 0 ]
            const currentCell = this.board.cells[ groupIndex * 9 + i ]

            this.board.updateCellValue( currentCell, sudokuValue )
        }
    }

    isValidSudoku() {

    }

    getGroupWithMostDouble() {
        const rowValuesDupplicates = this.getRowsValuesDupplicateCounts()
        const columnValuesDupplicates = this.getColumnsValuesDupplicateCount()

        const groupX1Dupplicate = rowValuesDupplicates[0] + rowValuesDupplicates[1] + rowValuesDupplicates[2]
        const groupX2Dupplicate = rowValuesDupplicates[3] + rowValuesDupplicates[4] + rowValuesDupplicates[5]
        const groupX3Dupplicate = rowValuesDupplicates[6] + rowValuesDupplicates[7] + rowValuesDupplicates[8]
        const groupY1Dupplicate = columnValuesDupplicates[0] + columnValuesDupplicates[1] + columnValuesDupplicates[2]
        const groupY2Dupplicate = columnValuesDupplicates[3] + columnValuesDupplicates[4] + columnValuesDupplicates[5]
        const groupY3Dupplicate = columnValuesDupplicates[6] + columnValuesDupplicates[7] + columnValuesDupplicates[8]

        const sumOfDupplicateGroup = [
            groupX1Dupplicate + groupY1Dupplicate,
            groupX1Dupplicate + groupY2Dupplicate,
            groupX1Dupplicate + groupY3Dupplicate,
            groupX2Dupplicate + groupY1Dupplicate,
            groupX2Dupplicate + groupY2Dupplicate,
            groupX2Dupplicate + groupY3Dupplicate,
            groupX3Dupplicate + groupY1Dupplicate,
            groupX3Dupplicate + groupY2Dupplicate,
            groupX3Dupplicate + groupY3Dupplicate
        ]
        
        const groupWithMostDouble = sumOfDupplicateGroup.indexOf(Math.max(...sumOfDupplicateGroup))

        console.log(sumOfDupplicateGroup)
        // if(Math.max(...sumOfDupplicateGroup) == 0) {
        //     return 'stop'
        // }

        return groupWithMostDouble
    }

    getRowsValuesDupplicateCounts() {
        const rows = []
        rows[0] = this.getMaxDupplicateValues(this.board.getCellValue( this.board.cells[0]) + this.board.getCellValue( this.board.cells[1]) + this.board.getCellValue( this.board.cells[2]) + this.board.getCellValue( this.board.cells[9]) + this.board.getCellValue( this.board.cells[10]) + this.board.getCellValue( this.board.cells[11]) + this.board.getCellValue( this.board.cells[18]) + this.board.getCellValue( this.board.cells[19]) + this.board.getCellValue( this.board.cells[20]) )
        rows[1] = this.getMaxDupplicateValues(this.board.getCellValue( this.board.cells[3]) + this.board.getCellValue( this.board.cells[4]) + this.board.getCellValue( this.board.cells[5]) + this.board.getCellValue( this.board.cells[12]) + this.board.getCellValue( this.board.cells[13]) + this.board.getCellValue( this.board.cells[14]) + this.board.getCellValue( this.board.cells[21]) + this.board.getCellValue( this.board.cells[22]) + this.board.getCellValue( this.board.cells[23]))
        rows[2] = this.getMaxDupplicateValues(this.board.getCellValue( this.board.cells[6]) + this.board.getCellValue( this.board.cells[7]) + this.board.getCellValue( this.board.cells[8]) + this.board.getCellValue( this.board.cells[15]) + this.board.getCellValue( this.board.cells[16]) + this.board.getCellValue( this.board.cells[17]) + this.board.getCellValue( this.board.cells[24]) + this.board.getCellValue( this.board.cells[25]) + this.board.getCellValue( this.board.cells[26]))
        rows[3] = this.getMaxDupplicateValues(this.board.getCellValue( this.board.cells[27]) + this.board.getCellValue( this.board.cells[28]) + this.board.getCellValue( this.board.cells[29]) + this.board.getCellValue( this.board.cells[36]) + this.board.getCellValue( this.board.cells[37]) + this.board.getCellValue( this.board.cells[38]) + this.board.getCellValue( this.board.cells[45]) + this.board.getCellValue( this.board.cells[46]) + this.board.getCellValue( this.board.cells[47]))
        rows[4] = this.getMaxDupplicateValues(this.board.getCellValue( this.board.cells[30]) + this.board.getCellValue( this.board.cells[31]) + this.board.getCellValue( this.board.cells[32]) + this.board.getCellValue( this.board.cells[39]) + this.board.getCellValue( this.board.cells[40]) + this.board.getCellValue( this.board.cells[41]) + this.board.getCellValue( this.board.cells[48]) + this.board.getCellValue( this.board.cells[49]) + this.board.getCellValue( this.board.cells[50]))
        rows[5] = this.getMaxDupplicateValues(this.board.getCellValue( this.board.cells[33]) + this.board.getCellValue( this.board.cells[34]) + this.board.getCellValue( this.board.cells[35]) + this.board.getCellValue( this.board.cells[42]) + this.board.getCellValue( this.board.cells[43]) + this.board.getCellValue( this.board.cells[44]) + this.board.getCellValue( this.board.cells[51]) + this.board.getCellValue( this.board.cells[52]) + this.board.getCellValue( this.board.cells[53]))
        rows[6] = this.getMaxDupplicateValues(this.board.getCellValue( this.board.cells[54]) + this.board.getCellValue( this.board.cells[55]) + this.board.getCellValue( this.board.cells[56]) + this.board.getCellValue( this.board.cells[63]) + this.board.getCellValue( this.board.cells[64]) + this.board.getCellValue( this.board.cells[65]) + this.board.getCellValue( this.board.cells[72]) + this.board.getCellValue( this.board.cells[73]) + this.board.getCellValue( this.board.cells[74]))
        rows[7] = this.getMaxDupplicateValues(this.board.getCellValue( this.board.cells[57]) + this.board.getCellValue( this.board.cells[58]) + this.board.getCellValue( this.board.cells[59]) + this.board.getCellValue( this.board.cells[66]) + this.board.getCellValue( this.board.cells[67]) + this.board.getCellValue( this.board.cells[68]) + this.board.getCellValue( this.board.cells[75]) + this.board.getCellValue( this.board.cells[76]) + this.board.getCellValue( this.board.cells[77]))
        rows[8] = this.getMaxDupplicateValues(this.board.getCellValue( this.board.cells[60]) + this.board.getCellValue( this.board.cells[61]) + this.board.getCellValue( this.board.cells[62]) + this.board.getCellValue( this.board.cells[69]) + this.board.getCellValue( this.board.cells[70]) + this.board.getCellValue( this.board.cells[71]) + this.board.getCellValue( this.board.cells[78]) + this.board.getCellValue( this.board.cells[79]) + this.board.getCellValue( this.board.cells[80]))
        return rows
    }

    

    getColumnsValuesDupplicateCount() {
        const col = []
        col[0] = this.getMaxDupplicateValues(this.board.getCellValue( this.board.cells[0]) + this.board.getCellValue( this.board.cells[3]) + this.board.getCellValue( this.board.cells[6]) + this.board.getCellValue( this.board.cells[27]) + this.board.getCellValue( this.board.cells[30]) + this.board.getCellValue( this.board.cells[33]) + this.board.getCellValue( this.board.cells[54]) + this.board.getCellValue( this.board.cells[57]) + this.board.getCellValue( this.board.cells[60]))
        col[1] = this.getMaxDupplicateValues(this.board.getCellValue( this.board.cells[1]) + this.board.getCellValue( this.board.cells[4]) + this.board.getCellValue( this.board.cells[7]) + this.board.getCellValue( this.board.cells[28]) + this.board.getCellValue( this.board.cells[31]) + this.board.getCellValue( this.board.cells[34]) + this.board.getCellValue( this.board.cells[55]) + this.board.getCellValue( this.board.cells[58]) + this.board.getCellValue( this.board.cells[61]))
        col[2] = this.getMaxDupplicateValues(this.board.getCellValue( this.board.cells[2]) + this.board.getCellValue( this.board.cells[5]) + this.board.getCellValue( this.board.cells[8]) + this.board.getCellValue( this.board.cells[29]) + this.board.getCellValue( this.board.cells[32]) + this.board.getCellValue( this.board.cells[35]) + this.board.getCellValue( this.board.cells[56]) + this.board.getCellValue( this.board.cells[59]) + this.board.getCellValue( this.board.cells[62]))
        col[3] = this.getMaxDupplicateValues(this.board.getCellValue( this.board.cells[9]) + this.board.getCellValue( this.board.cells[12]) + this.board.getCellValue( this.board.cells[15]) + this.board.getCellValue( this.board.cells[36]) + this.board.getCellValue( this.board.cells[39]) + this.board.getCellValue( this.board.cells[42]) + this.board.getCellValue( this.board.cells[63]) + this.board.getCellValue( this.board.cells[66]) + this.board.getCellValue( this.board.cells[69]))
        col[4] = this.getMaxDupplicateValues(this.board.getCellValue( this.board.cells[10]) + this.board.getCellValue( this.board.cells[13]) + this.board.getCellValue( this.board.cells[16]) + this.board.getCellValue( this.board.cells[37]) + this.board.getCellValue( this.board.cells[40]) + this.board.getCellValue( this.board.cells[43]) + this.board.getCellValue( this.board.cells[64]) + this.board.getCellValue( this.board.cells[67]) + this.board.getCellValue( this.board.cells[70]))
        col[5] = this.getMaxDupplicateValues(this.board.getCellValue( this.board.cells[11]) + this.board.getCellValue( this.board.cells[14]) + this.board.getCellValue( this.board.cells[17]) + this.board.getCellValue( this.board.cells[38]) + this.board.getCellValue( this.board.cells[41]) + this.board.getCellValue( this.board.cells[44]) + this.board.getCellValue( this.board.cells[65]) + this.board.getCellValue( this.board.cells[68]) + this.board.getCellValue( this.board.cells[71]))
        col[6] = this.getMaxDupplicateValues(this.board.getCellValue( this.board.cells[18]) + this.board.getCellValue( this.board.cells[21]) + this.board.getCellValue( this.board.cells[24]) + this.board.getCellValue( this.board.cells[45]) + this.board.getCellValue( this.board.cells[48]) + this.board.getCellValue( this.board.cells[51]) + this.board.getCellValue( this.board.cells[72]) + this.board.getCellValue( this.board.cells[75]) + this.board.getCellValue( this.board.cells[78]))
        col[7] = this.getMaxDupplicateValues(this.board.getCellValue( this.board.cells[19]) + this.board.getCellValue( this.board.cells[22]) + this.board.getCellValue( this.board.cells[25]) + this.board.getCellValue( this.board.cells[46]) + this.board.getCellValue( this.board.cells[49]) + this.board.getCellValue( this.board.cells[52]) + this.board.getCellValue( this.board.cells[73]) + this.board.getCellValue( this.board.cells[76]) + this.board.getCellValue( this.board.cells[79]))
        col[8] = this.getMaxDupplicateValues(this.board.getCellValue( this.board.cells[20]) + this.board.getCellValue( this.board.cells[23]) + this.board.getCellValue( this.board.cells[26]) + this.board.getCellValue( this.board.cells[47]) + this.board.getCellValue( this.board.cells[50]) + this.board.getCellValue( this.board.cells[53]) + this.board.getCellValue( this.board.cells[74]) + this.board.getCellValue( this.board.cells[77]) + this.board.getCellValue( this.board.cells[80]))

        return col
    }

    getMaxDupplicateValues(row) {
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