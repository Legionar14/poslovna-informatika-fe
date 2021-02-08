import { useState } from "react"

import { v4 as uuid } from "uuid"

const useCurrentUser = () => {
  const [currentUser, setCurrentUser] = useState({
    id: uuid,
    username: "user",
    preduzeceId: '481a4f2d-450d-4b83-a516-bad9d6e12159'
  })

  return { currentUser }
}

export default useCurrentUser