'use client'

import { useEffect, useState } from "react"
//To know which eh
import { useSession } from "next-auth/react"
import { useRouter, useSearchParams } from "next/navigation"

import Form from "@components/Form"
import { Suspense } from 'react';


function UpdatePromptPage() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <UpdatePrompt />
        </Suspense>
    );
}

const UpdatePrompt = () => {
    const router = useRouter();
    const { data: session } = useSession();
    const searchParams = useSearchParams();
    const promptId = searchParams.get('id');

    const [submitting, setSubmitting] = useState(false);
    const [post, setPost] = useState({
        prompt: "",
        tag: ""
    })

    useEffect(() => {
        const getPromptDetails = async () => {
            const response = await fetch(`/api/prompt/${promptId}`);
            const data = await response.json();
            if (data) {
                setPost({
                    prompt: data.prompt,
                    tag: data.tag
                });
            }
        }
        if (promptId) { getPromptDetails() };
    }, [promptId])

    const updatePrompt = async (e) => {
        e.preventDefault();
        setSubmitting(true);
        if (!promptId) alert("Prompt ID not found");

        try {
            const response = await fetch(`/api/prompt/${promptId}`, {
                method: 'PATCH',
                body: JSON.stringify({
                    prompt: post.prompt,
                    tag: post.tag
                })
            })
            if (response.ok) {
                router.push('/profile');
            }
        } catch (error) {
            console.log(error);
        } finally {
            setSubmitting(false);
        }

    }

    return (
        <Form
            type="Update"
            post={post}
            setPost={setPost}
            submitting={submitting}
            handleSubmit={updatePrompt}
        />
    )
}

export default UpdatePromptPage