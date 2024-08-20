import { useReducer, createContext, useMemo, Dispatch, ReactNode } from "react";
import { BudgetActions, BudgetState, bugetReducer, initialState } from "../reducers/budget-reducer"; 


type BudgetContextProps = {
    state: BudgetState,
    dispatch: Dispatch<BudgetActions>,
    totalExpenses : number,
    remainingBudget : number

}

type BudgetProviderProps = {
    children: ReactNode
}

export const BudgetContext = createContext<BudgetContextProps>(null!)

export const BudgetProvider = ({children} : BudgetProviderProps) => {

    // instanciando nuestro reducer
    const [state, dispatch] = useReducer(bugetReducer, initialState)
    const totalExpenses = useMemo( () => state.expenses.reduce((total, expense) => expense.amount + total, 0), [state.expenses])
    const remainingBudget = state.budget - totalExpenses

    return (
        <BudgetContext.Provider
            value={{
                state,
                dispatch,
                totalExpenses,
                remainingBudget
            }}
        >
            {children}
        </BudgetContext.Provider>
    )
}