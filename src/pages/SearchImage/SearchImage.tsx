import axios from 'axios'
import { useState } from 'react'
import { API_KEY, API_URL } from '~/constants/unsplash'
import ImageItem from './components/ImageItem'

export type Image = {
  id: string
  urls: {
    small: string
  }
  slug: string
}

function SearchImage() {
  const [listImage, setListImage] = useState<Image[]>([])
  const [value, setValue] = useState<string>('')

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const result = await axios.get(`${API_URL}?query=${value}&page=1&per_page=10&client_id=${API_KEY}`)
    setListImage(result.data.results)
  }

  const handleSearchCategory = async (category_name: string) => {
    const result = await axios.get(
      `${API_URL}?query=${value}&page=1&per_page=20&client_id=${API_KEY}&topic=${category_name}`
    )
    setListImage(result.data.results)
  }

  return (
    <div className='mx-auto w-3/4'>
      <h1 className='mt-5 text-center text-2xl font-semibold'>Tìm kiếm hình ảnh</h1>
      <form onSubmit={handleSubmit} className='mt-5'>
        <div className='flex gap-2'>
          <input
            type='text'
            className='block w-full rounded-lg border border-gray-300 bg-gray-50 p-3 text-sm text-gray-900 outline-none focus:border-blue-500 focus:ring-blue-500  dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500'
            placeholder='Hình ảnh muốn tìm kiếm ...'
            onChange={(e) => setValue(e.target.value)}
          />
          <button
            type='submit'
            className='w-[125px] rounded-lg bg-blue-700 px-4 py-[8px] text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300'
          >
            Tìm kiếm
          </button>
        </div>
      </form>
      <div className='mt-5 flex gap-4'>
        <button className='rounded-md bg-red-500 px-5 py-2 text-white' onClick={() => handleSearchCategory('Travel')}>
          Travel
        </button>
        <button className='rounded-md bg-blue-500 px-5 py-2 text-white' onClick={() => handleSearchCategory('Film')}>
          Film
        </button>
        <button
          className='rounded-md bg-orange-500 px-5 py-2 text-white'
          onClick={() => handleSearchCategory('Nature')}
        >
          Nature
        </button>
        <button
          className='rounded-md bg-green-500 px-5 py-2 text-white'
          onClick={() => handleSearchCategory('Animals')}
        >
          Animals
        </button>
      </div>
      <div className='mt-5 grid grid-cols-4 gap-4'>
        {listImage.map((image) => (
          <ImageItem image={image} key={image.id} />
        ))}
      </div>
    </div>
  )
}

export default SearchImage
