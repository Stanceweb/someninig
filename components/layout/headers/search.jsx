"use client";
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

const Search = ({ isOpen, setIsOpen, onSearch }) => {
	// controlled input for the search query
	const [query, setQuery] = useState('');
	const router = useRouter();

	useEffect(() => {
		// clear query when opened/closed
		if (!isOpen) setQuery('');
	}, [isOpen]);

	useEffect(() => {
		// close on ESC
		const onKey = (e) => {
			if (e.key === 'Escape' && isOpen) setIsOpen(false);
		};
		if (isOpen) window.addEventListener('keydown', onKey);
		return () => window.removeEventListener('keydown', onKey);
	}, [isOpen, setIsOpen]);

	const handleSubmit = (e) => {
		e.preventDefault();
		const trimmed = query.trim();

		// navigate to the blog listing (existing page) instead of a non-existent /search route
		if (typeof onSearch === 'function') {
			if (trimmed) onSearch(trimmed);
			else onSearch('');
		} else {
			if (trimmed) {
				router.push(`/blog?query=${encodeURIComponent(trimmed)}`);
			} else {
				// go to blog index when no query to avoid 404
				router.push('/blog');
			}
		}

		setIsOpen(false);
		setQuery('');
	};

	return (
		<>
			<div className={`header__area-menubar-right-search-box ${isOpen ? 'active' : ''}`}>
				<form onSubmit={handleSubmit}>
					<input
						type="search"
						placeholder="Search here..."
						aria-label="Search"
						value={query}
						onChange={(e) => setQuery(e.target.value)}
					/>
					<button type="submit" aria-label="Submit search"><i className="fal fa-search" /></button>
				</form>
				<span
					className="header__area-menubar-right-search-box-icon"
					onClick={() => { setIsOpen(false); setQuery(''); }}
					role="button"
					tabIndex={0}
					aria-label="Close search"
					onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { setIsOpen(false); setQuery(''); } }}
				>
					<i className="fal fa-times" />
				</span>
			</div>
		</>
	);
};

export default Search;