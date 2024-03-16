import { connectToDB } from "@app/utils/database";
import Prompt from "@app/models/prompt";
export const GET = async (req) => {
  try {
    await connectToDB();
    const prompts = await Prompt.find({}).populate("creator");

    return new Response(JSON.stringify(prompts), { status: 200 });
  } catch (error) {
    console.log("Error in /api/prompt/page.jsx");
    console.log(error.message);
    return new Response("Failed to fetch prompts", { status: 500 });
  }
};
