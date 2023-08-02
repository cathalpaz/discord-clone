import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { thunkGetAllDirectMessages } from '../../store/directMessages';

export default function DirectMessage() {
  const directMessageStore = useSelector((state) => state.directMessages)
  const directMessageId = useSelector((state) => state.directMessages.orderedDirectMessages)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(thunkGetAllDirectMessages());
  }, [dispatch]);

return (
    <>
        <div>
            {directMessageId.map((id) => (
                <>
                    <p>{directMessageStore[id].content}</p>
                    <p>{directMessageStore[id].user_from_id}</p>
                </>
            ))}
        </div>
    </>
  )
}
