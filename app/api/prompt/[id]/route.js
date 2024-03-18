import Prompt from "@app/models/prompt";
import { connectToDB } from "@app/utils/database";

// get request to read one specific prompt
export const GET = async (req, { params }) => {
  try {
    console.log("here is the request object: ", req);
    await connectToDB();
    const prompt = await Prompt.findById(params.id).populate("creator");
    if (!prompt) {
      return new Response("Prompt Not Found", { status: 404 });
    }
    return new Response(JSON.stringify(prompt), { status: 200 });
  } catch (error) {
    console.log("Error in api/prompt/[id], :::: GET ROUTE");
    console.log(error.message);
    return Response("Failed to fetch the asked prompt details: ", {
      status: 500,
    });
  }
};
export const PATCH = async (req, { params }) => {
  const { prompt, tag } = await req.json();
  try {
    await connectToDB();
    const existingPrompt = await Prompt.findById(params.id);
    if (!existingPrompt)
      return new Response("Prompt Not Found", { status: 404 });

    existingPrompt.prompt = prompt;
    existingPrompt.tag = tag;

    await existingPrompt.save();
    return new Response(JSON.stringify(existingPrompt), { status: 200 });
  } catch (error) {
    console.log("Error in api/prompt/[id]");
    console.log(error.message);
    return new Response("Failed to update the prompt", { status: 500 });
  }
};
export const DELETE = async (req, { params }) => {
  try {
    await connectToDB();
    await Prompt.findByIdAndDelete(params.id);
    return new Response("Prompt deleted successfully", { status: 200 });
  } catch (error) {
    console.log("Error in api/prompt/[id]");
    console.log(error.message);
    return new Response("Could not delete the prompt", { status: 500 });
  }
};
