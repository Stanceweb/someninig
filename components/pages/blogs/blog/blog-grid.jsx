"use client";
import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import BlogItem from './blog-item';
import Pagination from './pagination';
import blogData from '../../../data/blog-data';


const BlogGridMain = ({position}) => {
    const blogItemShow = 4;
    const searchParams = useSearchParams();
    const queryParam = (searchParams?.get('query') || '').trim();
    const [currentPage, setCurrentPage] = useState(0);

    // Filter blogData by query (case-insensitive) — match title or description
    const filteredData = queryParam
        ? blogData.filter(item => {
            const q = queryParam.toLowerCase();
            return (item.title || '').toLowerCase().includes(q) || (item.description || '').toLowerCase().includes(q);
        })
        : blogData;

    const totalPages = Math.max(1, Math.ceil(filteredData.length / blogItemShow));
    const startIndex = currentPage * blogItemShow;
    const endIndex = startIndex + blogItemShow;
    const currentBlogItems = filteredData.slice(startIndex, endIndex);

    // Reset to first page when query changes
    useEffect(() => {
        setCurrentPage(0);
    }, [queryParam]);

    // Clamp currentPage if filtered results shrink
    useEffect(() => {
        if (currentPage > totalPages - 1) {
            setCurrentPage(Math.max(0, totalPages - 1));
        }
    }, [totalPages, currentPage]);

    const handleNextPage = () => {
        if (currentPage < totalPages - 1) {
            setCurrentPage(currentPage + 1);
        }
    };
    const handlePrevPage = () => {
        if (currentPage > 0) {
            setCurrentPage(currentPage - 1);
        }
    };

    return (
        <>
            <div className="two__columns section-padding-three">
                <div className="container">
                    <div className="row">
                        <BlogItem currentBlogItems={currentBlogItems} />
                    </div>
                    <Pagination
                        currentPage={currentPage}
                        handlePrevPage={handlePrevPage}
                        totalPages={totalPages}
                        handleNextPage={handleNextPage}
                        setCurrentPage={setCurrentPage}
                        position={position || "center"}
                    />
                </div>
            </div>
        </>
    );
};

export default BlogGridMain;