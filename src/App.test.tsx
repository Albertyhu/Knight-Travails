import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';
import { KnightPath } from './components/knightPath'; 

/*
test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});*/


describe("Test Knight algorithms", () => {
    var Knight = new KnightPath(8)
    Knight.setFirstLocation({ x: 6, y: 4 })
    Knight.setFinalLocation({ x: 6, y: 5 })
    var location1 = { x: 5, y: 5 };
    var location2 = { x: 4, y: 3 }
    var location4 = { x: 0, y: 0 }; 
    var location5 = { x: 7, y: 7 }; 
    var location6 = { x: 7, y: 0 };
    var location7 = { x: 1, y: 7 };
    var location8 = { x: 6, y: 3 }; 
 
    it("Test generateOptions function", () => {
        var location3 = {x: 6, y: 7}
        var arr = Knight.generateOptions(location1, [location2, location3])
    })
    it("Text generateOptions on location4", () => {
        var arr = Knight.generateOptions(location4, [location2, location1])
        expect(arr).toEqual([{ x: 2, y: 1 }, { x: 1, y: 2 }])
    })
    it("Text generateOptions on location5", () => {
        var arr = Knight.generateOptions(location5, [location2, location1])
        expect(arr).toEqual([{ x: 6, y: 5 }])
    })
    it("Text generateOptions on location6", () => {
        var arr = Knight.generateOptions(location6, [location2, location1])
        expect(arr).toEqual(expect.arrayContaining([{ x: 5, y: 1 }, { x: 6, y: 2 }]))
    })
    it("Test findShortestRoute Function", () => {
        var arr = Knight.execute(); 
        console.log(arr); 
    })

})

describe("Test with a 3x3 board", () => {
    var Knight = new KnightPath(3)
    Knight.setFirstLocation({ x: 0, y: 0 })
    Knight.setFinalLocation({ x: 2, y: 0 })
    it("Test the construction of the tree", () => {
        var arr = Knight.execute(); 
        expect(arr).toEqual([{ x: 0, y: 0 }, { x: 1, y: 2 }, { x: 2, y: 0 }])
    })

})


describe("Text with 4x4 board", () => {
    var Knight = new KnightPath(4)
    Knight.setFirstLocation({ x: 1, y: 0 })
    Knight.setFinalLocation({ x: 2, y: 0 })

    it("Test the construction of the tree", () => {
        var arr = Knight.execute();
        console.log(arr)
        // expect(arr).toEqual([{ x: 0, y: 0 }, { x: 1, y: 2 }, { x: 2, y: 0 }])
    })
})

describe("Text with 5x5 board", () => {
    var Knight = new KnightPath(5)
    Knight.setFirstLocation({ x: 4, y: 4 })
    Knight.setFinalLocation({ x: 0, y: 0 })

    it("Test the construction of the tree", () => {
        var arr = Knight.execute();
        console.log(arr)
        var expectedArr = [
            { x: 4, y: 4 },
            { x: 2, y: 3 },
            { x: 0, y: 4 },
            { x: 1, y: 2 },
            { x: 0, y: 0 }
        ]
         expect(arr).toEqual(expectedArr)
    })
    it("Test new path way ", () => {
        Knight.reset(); 
        Knight.setFirstLocation({ x: 3, y: 4 })
        Knight.setFinalLocation({ x: 2, y: 4 })
        var arr = Knight.execute();
        console.log(arr)
    })
})

//This dimension started causing errors because the the app runs out of allocated heap memory
describe("Text with 6x6 board", () => {
    var Knight = new KnightPath(6)
    Knight.setFirstLocation({ x: 0, y: 0 })
    Knight.setFinalLocation({ x: 5, y: 5 })

    it("Test the construction of the tree", () => {
        var arr = Knight.execute();
        var expectedArr = [
            { x: 0, y: 0 },
            { x: 2, y: 1 },
            { x: 4, y: 2 },
            { x: 3, y: 4 },
            { x: 5, y: 5 }
        ]
         expect(arr).toEqual(expectedArr)
    })
})

describe("Text with 8x8 board", () => {
    var Knight = new KnightPath(8)
    Knight.setFirstLocation({ x: 0, y: 0 })
    Knight.setFinalLocation({ x: 0, y: 1 })

    it("Test pathway", () => {
        var arr = Knight.execute();
        var expectedArr = [{ x: 0, y: 0 }, { x: 2, y: 1 }, { x: 1, y: 3 }, { x: 0, y: 1 }]; 
        expect(arr).toEqual(expectedArr)
    })
    it("Test pathway 2", () => {
        Knight.reset(); 
        Knight.setFirstLocation({ x: 0, y: 0 })
        Knight.setFinalLocation({ x: 7, y:  6})
        var arr = Knight.execute();
        var expectedArr = [
            { x: 0, y: 0 },
            { x: 2, y: 1 },
            { x: 4, y: 2 },
            { x: 6, y: 3 },
            { x: 5, y: 5 },
            { x: 7, y: 6 }
        ]
        expect(arr).toEqual(expectedArr)
    })
    it("Test pathway 3", () => {
        Knight.reset();
        Knight.setFirstLocation({ x: 0, y: 4 })
        Knight.setFinalLocation({ x: 7, y: 4 })
        var arr = Knight.execute();
       var expectedArr = [
              { x: 0, y: 4 },
              { x: 2, y: 5 },
              { x: 4, y: 6 },
              { x: 6, y: 7 },
              { x: 5, y: 5 },
              { x: 7, y: 4 }
         ]
        expect(arr).toEqual(expectedArr)
    })
    it("Test pathway 4", () => {
        Knight.reset();
        Knight.setFirstLocation({ x: 3, y: 5 })
        Knight.setFinalLocation({ x: 5, y: 1 })
        var arr = Knight.execute();
        var expectedArr = [ { x: 3, y: 5 }, { x: 4, y: 3 }, { x: 5, y: 1 } ]
        expect(arr).toEqual(expectedArr)
    })
    it("Test pathway 5", () => {
        Knight.reset();
        Knight.setFirstLocation({ x: 3, y: 5 })
        Knight.setFinalLocation({ x: 4, y: 4 })
        var arr = Knight.execute();
        var expectedArr = [ { x: 3, y: 5 }, { x: 5, y: 6 }, { x: 4, y: 4 }]
        expect(arr).toEqual(expectedArr)
    })
    it("Test pathway 6", () => {
        Knight.reset();
        Knight.setFirstLocation({ x: 3, y: 5 })
        Knight.setFinalLocation({ x: 4, y: 6 })
        var arr = Knight.execute();
        var expectedArr = [ { x: 3, y: 5 }, { x: 5, y: 4 }, { x: 4, y: 6 }]
        expect(arr).toEqual(expectedArr)
        //console.log(arr)
    })
    it("Test pathway 7", () => {
        Knight.reset();
        Knight.setFirstLocation({ x: 3, y: 5 })
        Knight.setFinalLocation({ x: 5, y: 6 })
        var arr = Knight.execute();
        var expectedArr = [{ x: 3, y: 5 }, { x: 5, y: 6 }]
        expect(arr).toEqual(expectedArr)
        //console.log(arr)
    })
    it("Test KnightMove function", () => {
        var arr = Knight.knightMove([3, 5], [3, 7]);
        console.log(arr)
    })
})
