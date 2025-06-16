import { UserRound } from "lucide-react";

function ProfileImage({url, alt, styling}){

    return(
        <>
            <div className="w-full h-full">
                {url ? (
                        <img
                            src={url}
                            alt={alt}
                            className={styling}
                        />
                    ): (
                        <>
                            <UserRound className={styling || "w-10 h-10 rounded-full object-cover mr-3"} />
                        </>
                    )
                }
            </div>
        </>
    )
}

export default ProfileImage;