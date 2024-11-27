import { useEffect, useReducer, useRef, useState } from "react";
import './App.css';
import {useNavigate} from "react-router-dom";

interface CalcState {
    firstOperand: number;
    secondOperand: number | null;
    operator: string | null;
    error: boolean;
}

type ReducerAction =
    | { type: 'ADD_DIGIT', payload: number }
    | { type: 'SET_OPERATOR', payload: string }
    | { type: 'EVALUATE' }
    | { type: 'CLEAR' }
    | { type: 'DELETE_DIGIT' }
    | { type: 'SET_ERROR', payload: boolean };

const initialState: CalcState = {
    firstOperand: 0,
    secondOperand: null,
    operator: null,
    error: false,
};

const evaluateExpression = (state: CalcState): number | null => {
    const { firstOperand, secondOperand, operator } = state;

    if (secondOperand === null || operator === null) return firstOperand;

    try {
        switch (operator) {
            case '+': return firstOperand + secondOperand;
            case '-': return firstOperand - secondOperand;
            case 'x': return firstOperand * secondOperand;
            case '/': return secondOperand === 0 ? null : firstOperand / secondOperand;
            default: return firstOperand;
        }
    } catch (error) {
        return null;
    }
};

const calculatorReducer = (state: CalcState, action: ReducerAction): CalcState => {
    switch (action.type) {
        case 'ADD_DIGIT': {
            if (state.operator === null) {
                return {
                    ...state,
                    firstOperand: Number(`${state.firstOperand}${action.payload}`)
                };
            }

            return {
                ...state,
                secondOperand: state.secondOperand === null ? action.payload : Number(`${state.secondOperand}${action.payload}`)
            };
        }

        case 'SET_OPERATOR': {
            if (state.secondOperand !== null) {
                const result = evaluateExpression(state);
                return {
                    firstOperand: result ?? 0,
                    secondOperand: null,
                    operator: action.payload,
                    error: false
                };
            }

            return { ...state, operator: action.payload };
        }

        case 'EVALUATE': {
            if (state.secondOperand === null || state.operator === null) return state;

            const result = evaluateExpression(state);
            if (result === null) {
                return {
                    ...state,
                    error: true
                };
            }

            return {
                firstOperand: result,
                secondOperand: null,
                operator: null,
                error: false
            };
        }

        case 'CLEAR': {
            return initialState;
        }

        case 'DELETE_DIGIT': {
            if (state.secondOperand !== null) {
                const stringSecondOperand = state.secondOperand.toString();
                return {
                    ...state,
                    secondOperand: stringSecondOperand.length > 1
                        ? Number(stringSecondOperand.slice(0, -1))
                        : null
                };
            }

            if (state.operator !== null) {
                return { ...state, operator: null };
            }

            const stringFirstOperand = state.firstOperand.toString();
            return {
                ...state,
                firstOperand: stringFirstOperand.length > 1
                    ? Number(stringFirstOperand.slice(0, -1))
                    : 0
            };
        }

        case 'SET_ERROR': {
            return { ...state, error: action.payload };
        }

        default:
            return state;
    }
};

function App() {
    const [calcState, dispatch] = useReducer(calculatorReducer, initialState);
    const [history, setHistory] = useState<number[]>([]);
    const bottomHistoryRef = useRef<HTMLDivElement>(null);

    const updateHistory = (result: number | null) => {
        if (result !== null) {
            setHistory(prevHistory => [...prevHistory, result]);
        }
    };

    useEffect(() => {
        if (bottomHistoryRef.current) {
            bottomHistoryRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [history]);

    const displayValue = calcState.error ? 'Err' :
        calcState.secondOperand !== null ? calcState.secondOperand : calcState.operator !== null ? calcState.operator : calcState.firstOperand;

    const handleNumberClick = (number: number) => {
        dispatch({ type: 'ADD_DIGIT', payload: number });
    };

    const handleOperatorClick = (operator: string) => {
        if (calcState.firstOperand !== undefined && calcState.secondOperand !== null && calcState.operator !== null) {
            const result = evaluateExpression(calcState);
            updateHistory(result);
        }
        dispatch({ type: 'SET_OPERATOR', payload: operator });
    };

    const handleEvaluate = () => {
        if (calcState.firstOperand !== undefined && calcState.secondOperand !== null && calcState.operator !== null) {
            const result = evaluateExpression(calcState);
            if (result === null) {
                dispatch({ type: 'SET_ERROR', payload: true });
            } else {
                updateHistory(result);
                dispatch({ type: 'EVALUATE' });
            }
        }
    };

    const nav = useNavigate();

    return (
        <div className="containerSection">
            <div className="topSection">
                <div className="historySection">
                    <ul>
                        {history.map((item, index) => (
                            <li key={index}>{item}</li>
                        ))}
                    </ul>
                    <div ref={bottomHistoryRef}></div>
                </div>
                <div className="resultSection">
                    <p>{displayValue}</p>
                </div>
            </div>
            <div className="h-4 bg-black xl:w-2/12 w-6/12"></div>
            <div className="bottomSection pr-2 pl-2">
                <div className="grid grid-rows-subgrid row-span-full grid-cols-subgrid col-span-full gap-1">
                    <button onClick={() => dispatch({ type: 'CLEAR' })}>C</button>
                    <button onClick={() => dispatch({ type: 'DELETE_DIGIT' })}>DEL</button>

                    <button className="bg-amber-700 hover:bg-amber-600" onClick={()=>nav('/support')}>?</button>

                    <button className="operatorButton" onClick={() => handleOperatorClick('/')}>÷</button>
                    <button onClick={() => handleNumberClick(1)}>1</button>
                    <button onClick={() => handleNumberClick(2)}>2</button>
                    <button onClick={() => handleNumberClick(3)}>3</button>
                    <button className="operatorButton" onClick={() => handleOperatorClick('x')}>×</button>
                    <button onClick={() => handleNumberClick(4)}>4</button>
                    <button onClick={() => handleNumberClick(5)}>5</button>
                    <button onClick={() => handleNumberClick(6)}>6</button>
                    <button className="operatorButton" onClick={() => handleOperatorClick('-')}>-</button>
                    <button onClick={() => handleNumberClick(7)}>7</button>
                    <button onClick={() => handleNumberClick(8)}>8</button>
                    <button onClick={() => handleNumberClick(9)}>9</button>
                    <button className="operatorButton" onClick={() => handleOperatorClick('+')}>+</button>
                    <button className="col-span-2" onClick={() => handleNumberClick(0)}>0</button>
                    <button className="operatorButton col-span-2" onClick={handleEvaluate}>=</button>
                </div>
                <div className="h-4 bg-black xl:w-2/12 w-6/12"></div>
            </div>
        </div>
    );
}

export default App;
