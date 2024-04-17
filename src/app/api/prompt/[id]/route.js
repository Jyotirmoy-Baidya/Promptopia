import connectToDB from "@utils/database";
import Prompt from "@models/prompt"

//GET => To read the data
export const GET = async (req, { params }) => {
    try {
        await connectToDB();

        console.log(params.id);
        const prompt = await Prompt.findById(params.id).populate('creator');
        console.log(prompt);
        if (!prompt) {
            return new Response("Prompt not found", { status: 404 });
        }

        return new Response(JSON.stringify(prompt), { status: 200 });

    } catch (error) {
        return new Response("Failed to fetch prompt", { status: 500 });
    }
}

//PATCH => To Update
export const PATCH = async (req, { params }) => {
    const { prompt, tag } = await req.json();
    try {
        await connectToDB();

        const existingPrompt = await Prompt.findById(params.id);
        if (!existingPrompt) {
            return new Response("Prompt not found", { status: 404 });
        }

        existingPrompt.prompt = prompt;
        existingPrompt.tag = tag;

        await existingPrompt.save();
        return new Response(JSON.stringify(existingPrompt), { status: 200 });
    } catch (error) {
        return new Response("Failed to update prompt");
    }
}

//DELETE => To delete the post
export const DELETE = async (req, { params }) => {
    try {
        await connectToDB();
        const c = await Prompt.deleteOne({ _id: params.id });
        return new Response("Prompt deleted successfully", { status: 200 });
    } catch (error) {
        return new Response("Could not delete the prompt", { status: 500 });
    }
}