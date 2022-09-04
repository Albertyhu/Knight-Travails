import React, {useRef, useEffect, useState, useContext} from 'react';
import styled from 'styled-components'; 
import uuid from 'react-uuid'; 
import KnightPiece from '../asset/knightPiece.png'; 
import { AppContext } from './contextItem.js'; 

type Coordinate = {
    x: number;
    y: number;
}

export const ConstructBoard = (size: number) => {
    var Board: Array<Coordinate> = []; 
    for (var x: number = 0; x < size; x++) {
        for (var y:number = 0; y < size; y++) {
            var obj: Coordinate = {
                x,
                y
            }
            Board.push(obj); 
        }
    }
    return Board; 
}


interface RenderSquareProps{
    coor: Coordinate; 
    white: boolean; 
}

export const RenderSquare = ({ coor, white }: RenderSquareProps) => {
    const dotRef = useRef(); 
    var dotElem; 
    const { startingPiecePlaced,
        setStartingPiecePlaced } = useContext(AppContext); 


    useEffect(() => {
        dotElem = document.getElementById(`CenterDot-${coor.x},${coor.y}`); 
    }, [dotRef.current])

    const clickEvent = () => {
        if (startingPiecePlaced) {

        }
    }

    /*
    const clickEvent = () => {
        console.log(`(${dotElem.offsetLeft}, ${dotElem.offsetTop})`)
    }*/

    return (
        <Square id={`${coor.x},${coor.y}`}
            Size='75px'
            BackgroundColor={white ? "#ffffff" : "#585858"}
        ><CenterDot
                ref={dotRef} id={`CenterDot-${coor.x},${coor.y}`}
                //onMouseDown={clickEvent}
            /></Square>)
}

interface RenderRowProps {
    columns: number;
    RowArray: Array<any>; 
}

export const RenderRow = ({ columns, RowArray } : RenderRowProps) => {
    var columnNum: string = ''; 
    for (var i = 0; i < columns; i++) {
        columnNum += "1fr "
    }
    return (<Row ColumnsRendered={columnNum}>
        {RowArray.map((sqr, ind) => {
            return <RenderSquare
                coor={sqr}
                white={!!((ind + sqr.y) % 2)}
                key={uuid()}
            />
        })}
    </Row>)
}

interface RenderBoardProps {
    rows: number; 
}

export const RenderBoard = ({rows}: RenderBoardProps) => {
    var BoardArr = ConstructBoard(rows);
    var rowArray: Array<any> = []; 
    for (var i = 0; i < rows; i++) {
        var row = BoardArr.filter(val => val.y === i)
        rowArray.push(row); 
    }
    return (<>
        <Board id="Board">
        {rowArray.map(arr => <RenderRow
            columns={rows}
            RowArray={arr}
            key={uuid()}
        />)}
        </Board>
        <RenderKnightPiece />
    </>)
}


const Square = styled.span`
    width: ${props => props.Size};
    height: ${props => props.Size}; 
    background-color: ${props => props.BackgroundColor}; 
    resize: none;
    user-select: none; 
    display: flex;
    vertical-align: middle; 
    justify-content: center;
`
const CenterDot = styled.div`
    margin: auto; 
    display: block;
    width: 5px; 
    height: 5px;
    border-radius: 10px; 
    z-index: 3; 
    background-color: #252525; 
    padding: 0;
    cursor: pointer; 
`


const Row = styled.div`
display: grid; 
grid-template-columns: ${props => props.ColumnsRendered}; 
`

const Board = styled.div`
    border: 2px solid #000000; 
    margin: auto; 
    display: inline-block;
    resize: none; 
`

const Piece = styled.img`
    z-index: 1; 
    width: 60px; 
    height: 70px; 
    position: absolute;
    display: ${props => props.Display}; 
    top: ${props => props.Top}; 
    left: ${props => props.Left}; 
`

const RenderKnightPiece = (x, y) => {
    const { displayKnightPiece } = useContext(AppContext);
    return <Piece
        src={KnightPiece}
        Display={displayKnightPiece ? "block" : "none"}
        Top={`${y}px`}
        Left={`${x}px`}
    />
} 