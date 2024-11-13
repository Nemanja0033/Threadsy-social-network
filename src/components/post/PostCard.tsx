import { Heart, MessageSquare } from "lucide-react"
import { PostCardType } from "../../types/PostCardType"

const PostCard = ({ title, postData, author}: PostCardType) => {

  
  return (
    <div className="flex justify-center">
        <div className="w-[600px] mt-6 ml-0 mr-0 flex-row rounded border border-gray-100">
        <h1 className="text-md font-semibold text-center mt-3 mb-3">@{author}</h1>
        <h1 className="text-2xl ml-3 font-semibold text-center mb-3">{title}</h1>
        <div className="md:overflow-auto overflow-hidden h-48 w-full ml-1 mr-1 rounded text-center shadow-sm">
            {postData}
        </div>
        <div className="w-full h-7 bg-white rounded flex justify-center gap-8 shadow-sm">
        <Heart className="cursor-pointer hover:text-red-500" />
        <MessageSquare className="cursor-pointer hover:text-red-500" />
        </div>
    </div>
    </div>
  )
}

export default PostCard