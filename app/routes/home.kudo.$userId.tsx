import {json, LoaderFunction, redirect} from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'
import {getUserById} from "~/utils/user.server";

export const loader: LoaderFunction = async ({ request, params }) => {
    const { userId } = params

    if (typeof userId !== 'string') {
        return redirect('/home')
    }
    const recipient = await getUserById(parseInt(userId))
    return json({ recipient })
}

export default function KudoModal() {
    // 3
    const data: any = useLoaderData()
    return <h2> User: {data.recipient.firstName} </h2>
}