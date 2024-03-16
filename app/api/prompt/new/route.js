import { connectToDB } from "@app/utils/database";
import Prompt from "@app/models/prompt";

export const POST = async (req) => {
  const { userId, prompt, tag } = await req.json();
  console.log("here are userID, prompt, tag", userId, prompt, tag);

  try {
    await connectToDB();
    const newPrompt = new Prompt({
      creator: userId,
      prompt,
      tag,
    });

    await newPrompt.save();

    return new Response(JSON.stringify(newPrompt), { status: 201 });
  } catch (error) {
    console.log("Error in api/prompt/new/route.js");
    console.log(error.message);
    return new Response("Failed to create a new prompt", { status: 500 });
  }
};
