import connectToDB from '@utils/database'
import Prompt from '@models/prompt'

//How to define route
//Specify the route type here POST the define a async req, res function
export const POST = async (req) => {
    const { userId, prompt, tag } = await req.json();
    try {
        await connectToDB();
        const newPrompt = new Prompt({
            creator: userId,
            prompt,
            tag
        })

        await newPrompt.save();

        return new Response(JSON.stringify(newPrompt), { status: 201 })

    } catch (error) {
        return new Response("Failed to create a new prompt", { status: 500 })
    }

}