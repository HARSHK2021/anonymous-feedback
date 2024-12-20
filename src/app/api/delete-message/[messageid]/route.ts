import UserModel from '@/model/User';

import dbConnect from '@/lib/dbConnect';
import { User } from 'next-auth';
import { auth } from "@/auth"


export async function DELETE(
  request: Request,
  { params }: { params:  string } 
) {
  const messageId =  params;

  console.log(messageId)
  await dbConnect();
  const session = await auth()
  const user: User = session?.user as User
  console.log('User details:', user);
  if (!session || !user) {
    return Response.json(
      { success: false, message: 'Not authenticated' },
      { status: 401 }
    );
  }

  try {
    const updateResult = await UserModel.updateOne(
      { _id: user._id },
      { $pull: { messages: { _id: messageId } } }
    );

    if (updateResult.modifiedCount === 0) {
      return Response.json(
        { message: 'Message not found or already deleted', success: false },
        { status: 404 }
      );
    }

    return Response.json(
      { message: 'Message deleted', success: true },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error deleting message:', error);
    return Response.json(
      { message: 'Error deleting message', success: false },
      { status: 500 }
    );
  }
}