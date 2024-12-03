import { User } from '@prisma/client'

interface props {
    firstName: string
    lastName: string
    profilePicture?: string
    className?: string
    onClick?: (...args: any) => any
}

export function UserCircle({ firstName,lastName, profilePicture, onClick, className }: props) {

    //console.log(profilePicture)
    return (

        <div
            className={`${className} cursor-pointer bg-gray-400 rounded-full flex justify-center items-center`}
            onClick={onClick}
            style={{
                backgroundSize: "cover",
                ...(profilePicture ? { backgroundImage: `url(pps/${profilePicture})` } : {}),
            }}
        >
            {
                !profilePicture && (
                    <h2>{firstName.charAt(0).toUpperCase()}{lastName.charAt(0).toUpperCase()}</h2>
                )
            }
        </div>
    )
}