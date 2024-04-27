//Hooks
import useCollection from '../../hooks/useCollection'
import { useAuthContext } from '../../hooks/useAuthContext'

//styles
import './Home.css'

//components
import TransactionForm from './TransactionForm'
import TransactionList from './TransactionList'

export default function Home() {

  const {user} = useAuthContext()   //to get the id of the user logged in 
  const {document, error, total} = useCollection('transactions', ["uid", "==", user.uid])
                                                          // this above part is query in firebase which is used to
                                                          // fetch data based on some conditions like we are using 
                                                          // to show only those data where users uid = uid of the 
                                                          //transaction 
  return (
    <div className='container'>
      <div className='content' >
        {error && <p>{error}</p>}
        {document && <TransactionList transactions={document} />}
      </div>
      <div className="sidebar">
        <TransactionForm uid={user.uid} total={total}/>  {/* passing the user id to identify transactions */}
      </div>
    </div>
  )
}
