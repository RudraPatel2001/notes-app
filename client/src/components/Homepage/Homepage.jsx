import React, { useEffect, useState } from 'react'
import { getAllUsers, userPost } from '../../apis/apis'
import { formatRelativeTime } from '../../utils/formatTime'
import CustomLoader from '../custom/CustomLoader'

const bgColors = ["#FFE5B4", "#C8E6D7", "#FDCCD1", "#D3DDB5", "#D4D5EA", "#FFE9A4"]

function Homepage() {
    const [loading, setLoading] = useState(true)
    const [users, setUsers] = useState(null)
    const [uname, setUname] = useState("")
    const [note, setNote] = useState("")
    const [reRender, setReRender] = useState(new Date().getTime())

    const handleFormSubmit = (e) => {
        e.preventDefault()
        const payload = {
            name: uname,
            note
        }
        userPost(payload, setReRender)
    }

    useEffect(() => {
        getAllUsers(setUsers, setLoading, false)
    }, [reRender])

    useEffect(() => {
        setTimeout(() => {
            getAllUsers(setUsers, setLoading)
        }, 750);
    }, [])

    return (
        <>
            {loading
                ? <CustomLoader />
                : <div className='flex items-center justify-center gap-x-3 w-full h-full p-4'>
                    <div className='flex flex-col justify-start h-full w-3/5 items-start gap-y-4 p-4 rounded-md overflow-y-auto'
                        style={{ scrollbarWidth: "none" }}
                    >
                        <div className='text-2xl leading-none pb-3 border-b border-b-gray-600 w-full px-1'>User Notes <span className='text-base leading-none'>({users?.length})</span></div>
                        <div className='flex flex-wrap gap-4 w-full'>
                            {users?.length > 0
                                ? users?.map((user, index) => {
                                    const bg = bgColors[index % 6]
                                    return (
                                        <div
                                            key={index}
                                            className='flex flex-col gap-y-3 w-[calc(50%-8px)] min-h-[224px] max-h-56 p-3 rounded-md'
                                            style={{ backgroundColor: bg }}
                                        >
                                            <div className='flex items-center justify-between'>
                                                <div className='text-xl leading-none tracking-wide text-blue-800 underline underline-offset-4'>
                                                    {user?.name}
                                                </div>
                                                <div className='text-gray-500 text-sm leading-none'>
                                                    {formatRelativeTime(user?.createdAt)}
                                                </div>
                                            </div>
                                            <p className='!m-0 text-justify tracking-wide text-gray-700'>
                                                {user?.note}
                                            </p>
                                        </div>
                                    )
                                })
                                : <div className='text-gray-400 tracking-wide'>No users found!</div>
                            }
                        </div>
                    </div>
                    <div className='border border-gray-600 p-4 flex flex-col justify-center h-full w-2/5 items-center gap-y-3 rounded-md'>
                        <div className='text-2xl leading-none mb-4'>Add your notes...</div>
                        <form
                            className='w-full flex flex-col gap-y-4 items-center justify-center'
                            onSubmit={e => handleFormSubmit(e)}
                        >
                            <div className='flex flex-col items-start w-[80%] gap-y-1'>
                                <label htmlFor="name" className='text-gray-400'>Name</label>
                                <input
                                    id='name'
                                    name='name'
                                    type="text"
                                    value={uname}
                                    onChange={e => setUname(e.target.value)}
                                    className='min-w-[256px] w-full h-10 p-2 bg-gray-200 text-gray-800 rounded-md'
                                    placeholder='Name'
                                />
                            </div>
                            <div className='flex flex-col items-start w-[80%] gap-y-1'>
                                <label htmlFor="note" className='text-gray-400'>Note</label>
                                <textarea
                                    id='note'
                                    name='note'
                                    type="text"
                                    value={note}
                                    onChange={e => setNote(e.target.value)}
                                    className='min-w-[256px] w-full p-2 bg-gray-200 text-gray-800 rounded-md'
                                    placeholder='Note (Max 200 characters)'
                                    rows={6}
                                />
                            </div>
                            <button
                                type='submit'
                                className='min-w-[256px] w-[80%] mt-2 h-10 p-2 bg-blue-600 text-gray-200 rounded-md'
                            >Submit</button>
                        </form>
                    </div>
                </div>
            }
        </>
    )
}

export default Homepage