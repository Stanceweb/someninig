"use client";

import { useMemo, useState } from 'react';
import projectRecords from '@/components/data/projects-data';

const filters = [
    { value: 'all', label: 'All Projects' },
    { value: 'pipeline', label: 'Pipeline & Maintenance' },
    { value: 'fabrication', label: 'Fabrication & Industrial' },
    { value: 'civil', label: 'Civil & Buildings' },
    { value: 'infrastructure', label: 'Roads & Infrastructure' },
    { value: 'brownfield', label: 'Brownfield & Maintenance' },
];

const ProjectsTable = () => {
    const [activeFilter, setActiveFilter] = useState('all');
    const [query, setQuery] = useState('');

    const visibleProjects = useMemo(() => {
        const normalizedQuery = query.trim().toLowerCase();

        return projectRecords.filter((record) => {
            const matchesFilter = activeFilter === 'all' || record.category === activeFilter;
            const matchesQuery = !normalizedQuery || [record.project, record.client, record.service, record.location]
                .some((value) => value.toLowerCase().includes(normalizedQuery));

            return matchesFilter && matchesQuery;
        });
    }, [activeFilter, query]);

    return (
        <section className="projects__area section-padding">
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-xl-10 t-center">
                        <div className="title mb-35">
                            <span className="subtitle">Our Project Track Record</span>
                            <h2>50 Completed Projects Across Nigeria</h2>
                            <p>Explore a selection of completed engineering, construction, infrastructure, fabrication, and maintenance projects delivered for energy, industrial, and public-sector clients.</p>
                        </div>
                    </div>
                </div>

                <div className="projects__controls mb-35">
                    <label className="projects__search" htmlFor="project-search">
                        <span className="sr-only">Search projects</span>
                        <i className="far fa-search" aria-hidden="true"></i>
                        <input
                            id="project-search"
                            type="search"
                            value={query}
                            onChange={(event) => setQuery(event.target.value)}
                            placeholder="Search projects, clients, or locations"
                        />
                    </label>
                    <div className="projects__filters" aria-label="Project categories">
                        {filters.map((filter) => (
                            <button
                                key={filter.value}
                                type="button"
                                className={activeFilter === filter.value ? 'active' : ''}
                                onClick={() => setActiveFilter(filter.value)}
                            >
                                {filter.label}
                            </button>
                        ))}
                    </div>
                </div>

                <p className="projects__result-count mb-20">Showing {visibleProjects.length} of {projectRecords.length} completed projects</p>

                <div className="projects__table-wrap">
                    <table className="projects__table">
                        <thead>
                            <tr>
                                <th scope="col">Project</th>
                                <th scope="col">Client</th>
                                <th scope="col">Service Category</th>
                                <th scope="col">Location</th>
                                <th scope="col">Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {visibleProjects.map((record) => (
                                <tr key={`${record.project}-${record.client}`}>
                                    <td>{record.project}</td>
                                    <td>{record.client}</td>
                                    <td>{record.service}</td>
                                    <td>{record.location}</td>
                                    <td><span className="projects__status">{record.status}</span></td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    {!visibleProjects.length && <p className="projects__empty">No projects match your search.</p>}
                </div>
            </div>
        </section>
    );
};

export default ProjectsTable;
