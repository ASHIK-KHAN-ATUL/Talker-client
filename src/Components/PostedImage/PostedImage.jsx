import { useQuery } from "@tanstack/react-query";
import useAuth from "../../Hooks/useAuth";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import useAxiosSecure from "../../Hooks/useAxiosSecure";

const PostedImage = () => {

    const {user} = useAuth();
    const axiosSecure = useAxiosSecure();

    const {data: posts=[], refetch} = useQuery({
        queryKey:['posts', user?.email],
        enabled: !! user?.email,
        queryFn: async()=>{
            const res= await axiosSecure.get(`/posts/image/user/${user?.email}`)
            return res.data;
        }
    })
    console.log('Posts:', posts)

    return (
        <div className="max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-3 gap-4">
            {posts.map(post => (
                <img
                    key={post._id}
                    src={post?.postImage}
                    alt="Posted"
                    className="rounded object-cover h-48 w-48 shadow-md"
                />
            ))}
        </div>
    );
};

export default PostedImage;