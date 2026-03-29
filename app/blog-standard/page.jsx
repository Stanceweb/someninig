"use client"
import React, { Suspense } from "react";
import BlogStandardPage from "@/components/pages/blogs/blog-standard";

export default function Page() {
    return (
        <Suspense fallback={
            <div style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                minHeight: '400px',
                fontSize: '1.2rem',
                color: '#666'
            }}>
                Loading blog posts...
            </div>
        }>
            <BlogStandardPage />
        </Suspense>
    );
}