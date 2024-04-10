import { Image } from '../SearchImage'

interface ImageItemProps {
  image: Image
}

function ImageItem({ image }: ImageItemProps) {
  return (
    <div className='overflow-hidden rounded-md'>
      <img className='h-full w-full object-cover' src={image.urls.small} alt='' />
    </div>
  )
}

export default ImageItem
