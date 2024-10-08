import getCurrentUser from "@/app/action/getCurrentUser";
import { NextResponse } from "next/server";
import client from '@/app/libs/prismadb'
import { pusherSrver } from "@/app/libs/pusher";



export async function POST(request: Request) {
    try {
        const currentUser = await getCurrentUser();
        const body = await request.json();
        const {
            message,
            image,
            conversationId
        } = body;
        if (!currentUser?.id || !currentUser?.email) {
            return new NextResponse('Unauthorized', { status: 401 });
        }
        const newMessage = await client.message.create({
            data: {
                body: message,
                image: image,
                sender: {
                    connect: {
                        id: currentUser.id
                    }
                },
                seen: {
                    connect: {
                        id: currentUser.id
                    }
                },
                conversation: {
                    connect: {
                        id: conversationId
                    }
                }
            },
            include: {
                seen: true,
                sender: true,
            }
        });
        const updateConversation = await client.conversation.update({
            where: {
                id: conversationId
            },
            data: {
                lastMessageAt: new Date(),
                messages: {
                    connect: {
                        id: newMessage.id
                    }
                }
            },
            include: {
                users: true,
                messages: {
                    include: {
                        seen: true
                    }
                }
            }
        })

        await pusherSrver.trigger(conversationId, 'messages:new', newMessage);
        const lastMessage = updateConversation.messages[updateConversation.messages.length - 1];
        updateConversation.users.map((user) => {
            pusherSrver.trigger(user.email!, 'conversation:update', {
                id: conversationId,
                messages: [lastMessage]
            })
        })

        return NextResponse.json(newMessage);
    } catch (error) {
        console.log(error, 'ERROR_MESSAGES');
        return new NextResponse('Internal Error', { status: 500 });
    }
}