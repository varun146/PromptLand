import Prompt from "@app/models/prompt";
import { connectToDB } from "@app/utils/database";

export const GET = async (req, { params }) => {
  try {
    await connectToDB();
    const posts = await Prompt.find({ creator: params.id }).populate("creator");

    console.log("here are the user posts", posts);

    return new Response(JSON.stringify(posts), { status: 200 });
  } catch (error) {
    console.log("Error in users/[id]/posts route");
    console.log(error.message);
    return new Response("Failed to get user posts", { status: 500 });
  }
};
