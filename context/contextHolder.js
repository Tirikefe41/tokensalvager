import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'

export const TransactionContext = React.createContext()





export const TransactionProvider = ({ children }) => {
  const [currentAccount, setCurrentAccount] = useState()
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const [formData, setFormData] = useState({
    addressTo: '',
    amount: '',
  })

  /**
   * Trigger loading modal
   */
  useEffect(() => {
    if (isLoading) {
      router.push(`/?loading=${currentAccount}`)
    } else {
      router.push(`/`)
    }
  }, [isLoading])

  /**
   * Create user profile in Sanity
   */
  useEffect(() => {
    if (!currentAccount) return
    ;(async () => {
      const userDoc = {
        _type: 'users',
        _id: currentAccount,
        userName: 'Unnamed',
        address: currentAccount,
      }

      // await client.createIfNotExists(userDoc)
    })()
  }, [currentAccount])

  const handleChange = (e, name) => {
    setFormData(prevState => ({ ...prevState, [name]: e.target.value }))
  }
 

  return (
    <TransactionContext.Provider
      value={{
        handleChange
      }}
    >
      {children}
    </TransactionContext.Provider>
  )
}