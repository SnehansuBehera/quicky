import getCurrentUser from "@/app/action/getCurrentUser";
import { NextResponse } from "next/server";
import prisma from "@/app/libs/prismadb";
import { pusherSrver } from "@/app/libs/pusher";

export async function POST(req: Request) {
    try {

        const currentUser = await getCurrentUser();
        const body = await req.json();
        const { userId, isGroup, members, name } = body;

        if (!currentUser?.id || !currentUser?.email) {
            return new NextResponse('Unauthorised', { status: 401 });
        }

        if (isGroup && (!members || members.length > 2 || !name)) {
            return new NextResponse('Invalid Data', { status: 400 })
        }

        if (isGroup) {
            const newConversation = await prisma.conversation.create({
                data: {
                    name,
                    isGroup,
                    users: {
                        connect: [
                            ...members.map((member: { value: string }) => ({
                                id: member.value
                            })),
                            {
                                id: currentUser.id
                            }
                        ]
                    }
                },
                include: {
                    users: true
                }
            })

            newConversation.users.forEach((user) => {
                if (user.email) {
                    pusherSrver.trigger(user.email, 'conversation:new', newConversation)
                }
            })

            return NextResponse.json(newConversation)
        }

        const existingConversations = await prisma.conversation.findMany({
            where: {
                OR: [
                    {
                        userids: {
                            equals: [currentUser.id, userId]
                        }
                    },
                    {
                        userids: {
                            equals: [userId, currentUser.id]
                        }
                    }
                ]
            }
        })
        const singleConversation = existingConversations[0];
        if (singleConversation) {
            return NextResponse.json(singleConversation);
        }
        const newConversation = await prisma.conversation.create({
            data: {
                users: {
                    connect: [
                        {
                            id: currentUser.id
                        },
                        {
                            id: userId
                        }
                    ]
                }
            },
            include: {
                users: true
            }
        })

        newConversation.users.map((user) => {
            if (user.email) {
                pusherSrver.trigger(user.email, 'conversation:new', newConversation);
            }
        })

        return NextResponse.json(newConversation);
    } catch (error) {
        return new NextResponse('Internal Error', { status: 500 })
    }
}