import Helpers from './Helpers.js';

export default class Generator {
    constructor( board, difficulty ) {
        this.board = board
        this.difficulty = difficulty
        this.grid = this.getBaseGrid()
    }

    generateValues() {

        for (let i = 0; i < 200; i++) {
            this.shuffleDigits()
        }

        for (let i = 0; i < 5; i++) {
            this.shuffleRows([0, 2])
            this.shuffleRows([3, 5])
            this.shuffleRows([6, 8])
        }

        for (let i = 0; i < 5; i++) {
            this.shuffleColumns([0, 2])
            this.shuffleColumns([3, 5])
            this.shuffleColumns([6, 8])
        }

        const groups = Helpers.convertRowValuesToGroupedValues( this.grid );
        const groupsFlat = Helpers.concatArraysInArray( groups );

        for(let i = 0; i < groupsFlat.length; i++) {
            this.board.updateCellValue(this.board.cells[i], groupsFlat[i])
        }

        this.hideSomeCellsInGroups()

        // Debug
        // this.getRowsValuesDuplicateCount()
        // this.getColumnsValuesDuplicateCount()
        
        return this.grid
    }

    getBaseGrid() {
        return ( [            
            [1,2,3,  4,5,6,  7,8,9],
            [4,5,6,  7,8,9,  1,2,3],
            [7,8,9,  1,2,3,  4,5,6],

            [2,3,1,  5,6,4,  8,9,7],
            [5,6,4,  8,9,7,  2,3,1],
            [8,9,7,  2,3,1,  5,6,4],

            [3,1,2,  6,4,5,  9,7,8],
            [6,4,5,  9,7,8,  3,1,2],
            [9,7,8,  3,1,2,  6,4,5],
        ] )
    }

    shuffleDigits() {
        const possibleDigits = [1, 2, 3, 4, 5, 6, 7, 8, 9]
        const randomDigit1 = Math.ceil(Math.random() * possibleDigits.length);
        possibleDigits.splice(possibleDigits.indexOf(randomDigit1), 1)
        const randomDigit2 = Math.ceil(Math.random() * possibleDigits.length);

        const groups = Helpers.convertRowValuesToGroupedValues( this.grid );

        for (let i = 0; i < groups.length; i++) {
            let randomIndex1 = groups[i].indexOf(randomDigit1)
            let randomIndex2 = groups[i].indexOf(randomDigit2)
            this.grid[i][randomIndex1] = randomDigit2
            this.grid[i][randomIndex2] = randomDigit1
        }
    } 

    shuffleRows(range) {
        const min = range[0]
        const max = range[1]
        const randomRow = Math.floor(Math.random() * (max - min + 1) + min);
        const randomRow2 = Math.floor(Math.random() * (max - min + 1) + min);
        const row = this.grid[randomRow]
        this.grid[randomRow] = this.grid[randomRow2]
        this.grid[randomRow2] = row
    }

    shuffleColumns(range) {
        const min = range[0]
        const max = range[1]
        const randomColumn = Math.floor(Math.random() * (max - min + 1) + min);
        const randomColumn2 = Math.floor(Math.random() * (max - min + 1) + min);
        const column = this.grid.map(row => row[randomColumn])
        this.grid.map((row, i) => row[randomColumn] = this.grid[i][randomColumn2])
        this.grid.map((row, i) => row[randomColumn2] = column[i])
    }

    hideSomeCellsInGroups() {
        let numbersPerGroupToHide;
        switch (this.difficulty) {
            case 'no-hide':
                numbersPerGroupToHide = 0;
                break;
            case 'easy':
                numbersPerGroupToHide = 3
                break;
            case 'medium':
                numbersPerGroupToHide = 4
                break;
            case 'hard':
                numbersPerGroupToHide = 5
                break;
            default:
                break;
        }

        let possibleIndex = [0, 1, 2, 3, 4, 5, 6, 7, 8]
        let indexesToHide;
        for (let i = 0; i < this.board.cells.length; i++) {
            if(i % 9 === 0) {
                indexesToHide = []
                for (let j = 0; j < numbersPerGroupToHide; j++) {
                    let randomIndex = Math.floor(Math.random() * possibleIndex.length)
                    indexesToHide.push(possibleIndex[randomIndex]);
                    possibleIndex.splice(possibleIndex.indexOf(randomIndex), 1)
                }
                possibleIndex = [0, 1, 2, 3, 4, 5, 6, 7, 8]
            }
            if(indexesToHide.includes(i % 9)) {
                this.board.updateCellValue(this.board.cells[i], null)
            }
        }
    }

    gridHasDuplicateNumberInGroups() {
        const groups = Helpers.convertRowValuesToGroupedValues( this.grid );
        for (let group of groups) {
            if ((new Set(group)).size !== group.length) {
                return true
            }
        }
        return false
    }

    getRowsValuesDuplicateCount() {
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

        // Debug rows cell values
        for (let i = 0; i < rows.length; i++) {
            document.getElementById('duplicates__row-' + (i + 1)).innerHTML = rows[i]
        }

        return rows
    }

    

    getColumnsValuesDuplicateCount() {
        const cols = []
        cols[0] = this.getMaxDupplicateValues(this.board.getCellValue( this.board.cells[0]) + this.board.getCellValue( this.board.cells[3]) + this.board.getCellValue( this.board.cells[6]) + this.board.getCellValue( this.board.cells[27]) + this.board.getCellValue( this.board.cells[30]) + this.board.getCellValue( this.board.cells[33]) + this.board.getCellValue( this.board.cells[54]) + this.board.getCellValue( this.board.cells[57]) + this.board.getCellValue( this.board.cells[60]))
        cols[1] = this.getMaxDupplicateValues(this.board.getCellValue( this.board.cells[1]) + this.board.getCellValue( this.board.cells[4]) + this.board.getCellValue( this.board.cells[7]) + this.board.getCellValue( this.board.cells[28]) + this.board.getCellValue( this.board.cells[31]) + this.board.getCellValue( this.board.cells[34]) + this.board.getCellValue( this.board.cells[55]) + this.board.getCellValue( this.board.cells[58]) + this.board.getCellValue( this.board.cells[61]))
        cols[2] = this.getMaxDupplicateValues(this.board.getCellValue( this.board.cells[2]) + this.board.getCellValue( this.board.cells[5]) + this.board.getCellValue( this.board.cells[8]) + this.board.getCellValue( this.board.cells[29]) + this.board.getCellValue( this.board.cells[32]) + this.board.getCellValue( this.board.cells[35]) + this.board.getCellValue( this.board.cells[56]) + this.board.getCellValue( this.board.cells[59]) + this.board.getCellValue( this.board.cells[62]))
        cols[3] = this.getMaxDupplicateValues(this.board.getCellValue( this.board.cells[9]) + this.board.getCellValue( this.board.cells[12]) + this.board.getCellValue( this.board.cells[15]) + this.board.getCellValue( this.board.cells[36]) + this.board.getCellValue( this.board.cells[39]) + this.board.getCellValue( this.board.cells[42]) + this.board.getCellValue( this.board.cells[63]) + this.board.getCellValue( this.board.cells[66]) + this.board.getCellValue( this.board.cells[69]))
        cols[4] = this.getMaxDupplicateValues(this.board.getCellValue( this.board.cells[10]) + this.board.getCellValue( this.board.cells[13]) + this.board.getCellValue( this.board.cells[16]) + this.board.getCellValue( this.board.cells[37]) + this.board.getCellValue( this.board.cells[40]) + this.board.getCellValue( this.board.cells[43]) + this.board.getCellValue( this.board.cells[64]) + this.board.getCellValue( this.board.cells[67]) + this.board.getCellValue( this.board.cells[70]))
        cols[5] = this.getMaxDupplicateValues(this.board.getCellValue( this.board.cells[11]) + this.board.getCellValue( this.board.cells[14]) + this.board.getCellValue( this.board.cells[17]) + this.board.getCellValue( this.board.cells[38]) + this.board.getCellValue( this.board.cells[41]) + this.board.getCellValue( this.board.cells[44]) + this.board.getCellValue( this.board.cells[65]) + this.board.getCellValue( this.board.cells[68]) + this.board.getCellValue( this.board.cells[71]))
        cols[6] = this.getMaxDupplicateValues(this.board.getCellValue( this.board.cells[18]) + this.board.getCellValue( this.board.cells[21]) + this.board.getCellValue( this.board.cells[24]) + this.board.getCellValue( this.board.cells[45]) + this.board.getCellValue( this.board.cells[48]) + this.board.getCellValue( this.board.cells[51]) + this.board.getCellValue( this.board.cells[72]) + this.board.getCellValue( this.board.cells[75]) + this.board.getCellValue( this.board.cells[78]))
        cols[7] = this.getMaxDupplicateValues(this.board.getCellValue( this.board.cells[19]) + this.board.getCellValue( this.board.cells[22]) + this.board.getCellValue( this.board.cells[25]) + this.board.getCellValue( this.board.cells[46]) + this.board.getCellValue( this.board.cells[49]) + this.board.getCellValue( this.board.cells[52]) + this.board.getCellValue( this.board.cells[73]) + this.board.getCellValue( this.board.cells[76]) + this.board.getCellValue( this.board.cells[79]))
        cols[8] = this.getMaxDupplicateValues(this.board.getCellValue( this.board.cells[20]) + this.board.getCellValue( this.board.cells[23]) + this.board.getCellValue( this.board.cells[26]) + this.board.getCellValue( this.board.cells[47]) + this.board.getCellValue( this.board.cells[50]) + this.board.getCellValue( this.board.cells[53]) + this.board.getCellValue( this.board.cells[74]) + this.board.getCellValue( this.board.cells[77]) + this.board.getCellValue( this.board.cells[80]))

        // Debug columns cell values
        for (let i = 0; i < cols.length; i++) {
            document.getElementById('duplicates__col-' + (i + 1)).innerHTML = cols[i]
        }

        return cols
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

    