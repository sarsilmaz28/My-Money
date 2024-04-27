import { useEffect, useState } from "react"
import { useFirestore } from "../../hooks/useFirestore"


export default function TransactionForm({uid, total}) {   //user id is received from homepage

    const [name, setName] = useState('')
    const [amount, setAmount] = useState('')
    const {addDocument, response} = useFirestore('transactions')  // the parameter passed is the name of the collection to be created in the firebase. We had to passs it here as we mentioned that the hook takes a collection as argument. Also this collection will be created if there is not any any collecyion int firebase of this name

    /* TRYING TO ADD TOTAL BUDGET
    const [budgetButton, setBudgetButton] = useState(false)
    const [addBudgetButton, setAddBudgetButton] = useState(false)
    const [budgetAmount, setBudgetAmount] = useState(null)
    const [displayBudget, setDisplayBudget] = useState(null) 

    const handleAddBudget= ()=>{
        setAddBudgetButton(true)
        setDisplayBudget(budgetAmount)
    }
 */

    const handleSubmit = (e) => {
        e.preventDefault()
        addDocument({
            uid,             // id of the user currently logged in is stored in the transaction so we can later     
                            //filter out the transactions of particular users and show them only their transacrions
            name: name,      //when we have the name of variable and value as same, we can just write it once
            amount           //like this
        })
    }

    useEffect(()=>{          //to reset the form field everytime adding doc is successful
        if(response.success)
        {
            setName('')
            setAmount('')
        }
    },[response.success])    //useeffect to run everytime the success field of the transaction object changes

    return (
        <>
            {/*displayBudget && <h3>Budget: ${displayBudget}</h3>*/}
            <h3 className="total">TOTAL SPENT: ${total}</h3>
            <h3>Add Transaction</h3>
            <form onSubmit={handleSubmit}>
                <label>
                    <span>Transaction Name:</span>
                    <input type="text"
                        required
                        onChange={(e) => setName(e.target.value)}
                        value={name}
                    />
                </label>
                <label>
                    <span>Amount ($):</span>
                    <input type="number"
                        required
                        onChange={(e) => setAmount(e.target.value)}
                        value={amount}
                    />
                </label>
                <button>Add Transaction</button>
                {/* {!budgetButton && <button onClick={()=> setBudgetButton(true)}>Add Total Budget</button>}
                {budgetButton && !addBudgetButton && 
                <>
                 <label>
                    <span>Budget Amount:</span>
                    <input type="number"
                        required
                        onChange={(e) => setBudgetAmount(e.target.value)}
                        value={budgetAmount}
                    />
                </label>
                <button onClick={handleAddBudget} >Add Amount</button>
                </>
                } */}
            </form>
        </>
    )
}
