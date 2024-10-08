import {json, LoaderFunction, redirect} from '@remix-run/node'
import { useLoaderData, useActionData } from '@remix-run/react'
import {getUserById} from "~/utils/user.server";
import { Portal } from '~/components/portal'
import { Modal } from '~/components/modal';
import { getUser } from '~/utils/auth.server'
import { UserCircle } from '~/components/user-circle'
import React, { useState } from 'react'
import { KudoStyle } from '@prisma/client'

// Define the types
type ActionData = {
    error?: string;
}

type LoaderData = {
    recipient: {
        firstName: string;
        // Other recipient fields
    };
    user: {
        // User fields
    };
}

export const loader: LoaderFunction = async ({ request, params }) => {
    const { userId } = params

    if (typeof userId !== 'string') {
        return redirect('/home')
    }
    const recipient = await getUserById(parseInt(userId))
    const user = await getUser(request)

    return json({ recipient, user })
}

export default function KudoModal() {
    // Specify the types for actionData and data
    const actionData = useActionData<ActionData>()
    const data = useLoaderData<LoaderData>()

    const [formError] = useState(actionData?.error || '')
    const [formData, setFormData] = useState({
        message: '',
        style: {
            backgroundColor: 'RED',
            textColor: 'WHITE',
            emoji: 'THUMBSUP',
        } as KudoStyle,
    })

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, field: string) => {
        setFormData(data => ({ ...data, [field]: e.target.value }))
    }


    //@ts-ignore
    const {
        //@ts-ignore
        recipient,
        //@ts-ignore
        user
    } = useLoaderData()

    return (
        <Modal isOpen={true} className="w-2/3 p-10">
            <div className="text-xs font-semibold text-center tracking-wide text-red-500 w-full mb-2">{formError}</div>
            <form method="post">
                <input type="hidden" value={recipient.id} name="recipientId" />
                <div className="flex flex-col md:flex-row gap-y-2 md:gap-y-0">
                    <div className="text-center flex flex-col items-center gap-y-2 pr-8">
                        <UserCircle firstName={recipient.firstName} lastName={recipient.lastName} className="h-24 w-24" />
                        <p className="text-blue-300">
                            {recipient.firstName} {recipient.lastName}
                        </p>
                        {recipient.department && (
                            <span className="px-2 py-1 bg-gray-300 rounded-xl text-blue-300 w-auto">
                {recipient.department[0].toUpperCase() + recipient.department.toLowerCase().slice(1)}
              </span>
                        )}
                    </div>
                    <div className="flex-1 flex flex-col gap-y-4">
            <textarea
                name="message"
                className="w-full rounded-xl h-40 p-4"
                value={formData.message}
                onChange={e => handleChange(e, 'message')}
                placeholder={`Say something nice about ${recipient.firstName}...`}
            />
                        <div className="flex flex-col items-center md:flex-row md:justify-start gap-x-4">
                            {/* Select Boxes Go Here */}
                        </div>
                    </div>
                </div>
                <br />
                <p className="text-blue-600 font-semibold mb-2">Preview</p>
                <div className="flex flex-col items-center md:flex-row gap-x-24 gap-y-2 md:gap-y-0">
                    {/* The Preview Goes Here */}
                    <div className="flex-1" />
                    <button
                        type="submit"
                        className="rounded-xl bg-yellow-300 font-semibold text-blue-600 w-80 h-12 transition duration-300 ease-in-out hover:bg-yellow-400 hover:-translate-y-1"
                    >
                        Send
                    </button>
                </div>
            </form>
        </Modal>
    )
}
