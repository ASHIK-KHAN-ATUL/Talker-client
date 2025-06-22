import { useQuery } from "@tanstack/react-query";
import useAuth from "../../Hooks/useAuth";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { MoonLoader } from "react-spinners";

const PostedImage = () => {

    const {user} = useAuth();
    const axiosSecure = useAxiosSecure();

    const {data: posts=[],isLoading, refetch} = useQuery({
        queryKey:['posts', user?.email],
        enabled: !! user?.email,
        queryFn: async()=>{
            const res= await axiosSecure.get(`/posts/image/user/${user?.email}`)
            return res.data;
        }
    })
    console.log('Posts:', posts)

    if (!posts || posts.length === 0) {
    return (
        <div className="w-full text-center text-red-600 py-10">
        You haven't posted any images yet.
        </div>
    );
    }

    if (isLoading) {
        return (
        <div className="min-h-screen flex items-center justify-center">
            <MoonLoader color="#FF6B6B" />
        </div>
    ) ;
    }

    return (
        <div className="w-[95%] max-w-4xl  bg-white/50 p-3 mx-auto grid grid-cols-2 md:grid-cols-3 gap-4">
            {posts.map(post => (
                <img
                    key={post._id}
                    src={post?.postImage}
                    alt="Posted"
                    className="rounded object-cover h-48 w-48 shadow-md border border-[#FF6B6B]"
                />
            ))}
        </div>
    );
};

export default PostedImage;