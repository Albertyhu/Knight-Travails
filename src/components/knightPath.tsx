export type Coordinate = {
    x: number;
    y: number;
}

interface KnightPathFormat{
    start: Coordinate; 
    final: Coordinate; 
    firstStep: FootPrint | null | undefined; 
    boardSize: number; 
    generateOptions(currentCoor: Coordinate, pathHistory: Coordinate[]): Coordinate[] | void;  
    execute(): void; 
    knightMove(starting: [number, number], ending: [number, number]): void; 
}

export class KnightPath implements KnightPathFormat {
    constructor(boardSize: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8) {
        if (boardSize > 8) {
            console.log("This board is too big. Try again.")
            return;
        }
        this.firstStep = null; 
        this.boardSize = boardSize; 
    }
    start;
    final; 
    firstStep;
    boardSize;

    //allPossiblePaths is an array that contains the final nodes of all paths
    //They will have the same coordinates, which should the same as this.final 
    //However, their paths are different. 
    //The strategy is to use this array to work backwards to find the shortest route 
    allPossiblePaths: FootPrint[] = []; 

    setFirstLocation(coor: Coordinate) {
        this.start = coor; 
        var possiblePaths: Coordinate[] = this.generateOptions(this.start, [this.start]); 
        this.firstStep = new FootPrint(this.start, [this.start], possiblePaths); 
    }
    setFinalLocation(coor: Coordinate) {
        this.final = coor; 
    }

    //This function generates all the possible valid locations that the Knight can move inside the board
    //The starting position and previous locations can't be among the options. 
    generateOptions(currentCoor: Coordinate, pathHistory: Coordinate[]) {
        if (this.final === null || this.final == undefined) {
            console.log("Error: No final position has been indicated yet")
            return []; 
        }
        const arr = [{
                x: currentCoor.x - 2,
                y: currentCoor.y + 1,  
            },
            {
                x: currentCoor.x - 2, 
                y: currentCoor.y - 1, 
            },
            {
                x: currentCoor.x + 2,
                y: currentCoor.y + 1, 
            }, 
            {
                x: currentCoor.x + 2,
                y: currentCoor.y - 1,
            }, 
            {
                x: currentCoor.x + 1,
                y: currentCoor.y + 2,
            }, 
            {
                x: currentCoor.x - 1,
                y: currentCoor.y + 2,
            }, 
            {
                x: currentCoor.x + 1,
                y: currentCoor.y - 2,
            }, 
            {
                x: currentCoor.x - 1,
                y: currentCoor.y - 2,
            }, 
        ]

        //if one of the options happens to be the same coordinates as the starting coordinates
        //this.final must have value for this to work. 
        if (arr.some(val => val.x === this.final.x && val.y === this.final.y)) {
            //return an array of only starting coordinates 
            return [this.final]
        }

        return arr.filter(val => {
            var duplicate = pathHistory.some(past => val.x === past.x && val.y === past.y)
            return val.x < this.boardSize && val.x >= 0 && val.y < this.boardSize && val.y >= 0 && !duplicate
        })
    } 

    generateAllPaths = (parentNode: FootPrint, nextCoor: Coordinate) => {
        //This folloowing line is necessary for boards that have a dimension bigger than 5x5
        //Because the bigger boards causes more permutations of possible paths and as a result, 
        //...the app runs out of heap memory. 
        //I figure that the shortest path shouldn't be bigger than 6. 
        if (parentNode.pathHistory.length > 6) {
           // console.log("Path is not viable as it risks the app running out of heap memory")
            return;
        }
        if (parentNode.pathHistory.length > Math.pow(this.boardSize, 2)) {
            console.log('Error: There\'s an issue generating pathway')
            return;
        }
        if (parentNode.x === this.final.x && parentNode.y === this.final.y) {
            this.allPossiblePaths.push(parentNode);
            return; 
        }
        var updatedPathHistory: Coordinate[] = [...parentNode.pathHistory, nextCoor]; 
        var newMoves = this.generateOptions(nextCoor, updatedPathHistory)
        var nextStep = new FootPrint(nextCoor, updatedPathHistory, newMoves)
        //store the pointer into nextSteps 
        var updateNextSteps = [...parentNode.nextSteps, nextStep]
        parentNode.nextSteps = updateNextSteps; 

        nextStep.previousStep = parentNode; 

        newMoves.forEach(move => {
            this.generateAllPaths(nextStep, move)
        })
    }

    //this should return an array of the coordinates of the shortest route 
    //It should just count how many items in the pathHistory 
    findShortestRoute() {
        //find the number that represents the shortest path possible
        if (this.allPossiblePaths.length > 0) {
            //first, assign a value to count and targetNode
            //count should only contain the smallest number of moves the Knight makes
            var count: number = this.allPossiblePaths[0].pathHistory.length;
            //targetNode should store the last node of the shortest path
            var targetNode: FootPrint | undefined | null = this.allPossiblePaths[0];
            //Go through the array that contains the last nodes of all paths generated 
            //...to find the shortest path
            this.allPossiblePaths.forEach(path => {
                if (count > path.pathHistory.length) {
                    targetNode = path;
                    count = path.pathHistory.length;
                }
              
            })
            return targetNode !== undefined && targetNode !== null ? targetNode.pathHistory : [];
        }
        else {
            return []
        }
    }
    //Function that brings everything together
    execute() {
        var allOptions = this.generateOptions(this.start, [this.start])
        allOptions.forEach(opt => {
            this.generateAllPaths(this.firstStep, opt)
        })
        return this.findShortestRoute(); 
    }
    knightMove(starting, ending) {
        this.reset();
        var firstLocation = {
            x: starting[0],
            y: starting[1],
        }
        var lastLocation = {
            x: ending[0],
            y: ending[1],
        }

        this.setFirstLocation(firstLocation);
        this.setFinalLocation(lastLocation); 
        var arr = this.execute(); 
        var moveArr: Array<any> = []
        arr.forEach(val => {
            var move: number[] = []; 
            move.push(val.x)
            move.push(val.y)
            moveArr.push(move)
        })
        return moveArr; 
    }
    reset() {
        this.allPossiblePaths = []; 
        this.firstStep = null; 
    }
}

interface FootPrintInterface {
    nextStep: FootPrint | null;
    nextSteps: FootPrint[]; 
    x: number | null;
    y: number | null;
//    pathHistory: any[] | null; 
    possiblePaths: Array<Coordinate> | null | undefined;  
    pathHistory: Coordinate[]; 
}

class FootPrint implements FootPrintInterface {
    constructor(coor: Coordinate, path, options) {
        this.x = coor.x; 
        this.y = coor.y;
        this.pathHistory = path; 
        this.possiblePaths = options; 
        this.nextStep = null;
        this.previousStep = null; 
    }
    //x and y carries the current coordinate of the FootPrint
    x;
    y; 
    //The original strategy for this is flawed because that nextStep can only point to one Node at a time
    //The original strategy is that next can point to multiple nodes, but I need an array 
    nextStep; 

    //this is an array of nodes of next moves 
    nextSteps: FootPrint[] = []; 

    //This is an array that keeps track of the path of the knight 
    previousStep; 

    //This keeps track of the trail the knigt makes
    //The length of pathHistory will always be 2 or more. 
    pathHistory; 
    //This is an array that contains all options for next moves for the Knight 
    possiblePaths = []; 
}