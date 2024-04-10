function EmptyMessage() {
  return (
    <div className='relative flex flex-1 flex-col items-center justify-center border-l'>
      <span className='mb-5 inline-block text-xl font-semibold tracking-wide tracking-wide text-gray-700'>
        Hiện không có trong cuộc trò chuyện nào!
      </span>
      <div className='w-[275px]'>
        <img
          className='h-full w-full object-contain'
          src='https://cdn0.iconfinder.com/data/icons/interface-1-5/200/No-conversations-1-512.png'
          alt=''
        />
      </div>
    </div>
  )
}

export default EmptyMessage
