import Helpers from './Helpers.js'

export default class Generator {
    constructor( grid, difficulty ) {
        this.grid = grid
        this.difficulty = difficulty
        this.gridValues = this.getBaseGrid()
    }

    generateValues() {

        for (let i = 0; i < 200; i++) {
            this.shuffleDigits()
        }

        for (let i = 0; i < 20; i++) {
            this.shuffleRows([0, 2])
            this.shuffleRows([3, 5])
            this.shuffleRows([6, 8])
        }

        for (let i = 0; i < 20; i++) {
            this.shuffleColumns([0, 2])
            this.shuffleColumns([3, 5])
            this.shuffleColumns([6, 8])
        }

        const groups = Helpers.convertRowValuesToGroupedValues( this.gridValues )
        const groupsFlat = Helpers.concatArraysInArray( groups )

        for(let i = 0; i < groupsFlat.length; i++) {
            this.grid.updateCellValue(this.grid.cells[i], groupsFlat[i])
        }

        this.hideSomeCellsInGroups()
        
        return this.gridValues
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
        const randomDigit1 = Math.ceil(Math.random() * possibleDigits.length)
        possibleDigits.splice(possibleDigits.indexOf(randomDigit1), 1)
        const randomDigit2 = Math.ceil(Math.random() * possibleDigits.length)

        const groups = Helpers.convertRowValuesToGroupedValues( this.gridValues )

        for (let i = 0; i < groups.length; i++) {
            let randomIndex1 = groups[i].indexOf(randomDigit1)
            let randomIndex2 = groups[i].indexOf(randomDigit2)
            this.gridValues[i][randomIndex1] = randomDigit2
            this.gridValues[i][randomIndex2] = randomDigit1
        }
    } 

    shuffleRows(range) {
        const min = range[0]
        const max = range[1]
        const randomRow = Math.floor(Math.random() * (max - min + 1) + min)
        const randomRow2 = Math.floor(Math.random() * (max - min + 1) + min)
        const row = this.gridValues[randomRow]
        this.gridValues[randomRow] = this.gridValues[randomRow2]
        this.gridValues[randomRow2] = row
    }

    shuffleColumns(range) {
        const min = range[0]
        const max = range[1]
        const randomColumn = Math.floor(Math.random() * (max - min + 1) + min)
        const randomColumn2 = Math.floor(Math.random() * (max - min + 1) + min)
        const column = this.gridValues.map(row => row[randomColumn])
        this.gridValues.map((row, i) => row[randomColumn] = this.gridValues[i][randomColumn2])
        this.gridValues.map((row, i) => row[randomColumn2] = column[i])
    }

    hideSomeCellsInGroups() {
        let numbersPerGroupToHide;
        switch (this.difficulty) {
            case 'easy':
                numbersPerGroupToHide = 4
                break
            case 'medium':
                numbersPerGroupToHide = 5
                break
            case 'hard':
                numbersPerGroupToHide = 6
                break
            default:
                break
        }

        let possibleIndex = [0, 1, 2, 3, 4, 5, 6, 7, 8]
        let indexesToHide
        for (let i = 0; i < this.grid.cells.length; i++) {
            if(i % 9 === 0) {
                indexesToHide = []
                for (let j = 0; j < numbersPerGroupToHide; j++) {
                    let randomIndex = Math.floor(Math.random() * possibleIndex.length)
                    indexesToHide.push(possibleIndex[randomIndex]);
                    possibleIndex.splice(possibleIndex.indexOf(possibleIndex[randomIndex]), 1)
                }
                possibleIndex = [0, 1, 2, 3, 4, 5, 6, 7, 8]
            }
            if(indexesToHide.includes(i % 9)) {
                this.grid.updateCellValue(this.grid.cells[i], null) // Values to find
            } else {
                this.grid.cells[i].classList.add('static') // Base values
            }
        }
    }
}

    