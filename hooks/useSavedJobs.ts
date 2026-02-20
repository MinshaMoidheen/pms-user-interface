import { useState, useEffect } from 'react';

export function useSavedJobs() {
    const [savedJobs, setSavedJobs] = useState<string[]>([]);

    useEffect(() => {
        const storedJobs = localStorage.getItem('savedJobs');
        if (storedJobs) {
            setSavedJobs(JSON.parse(storedJobs));
        }
    }, []);

    const isSaved = (jobId: string) => {
        return savedJobs.includes(jobId);
    };

    const toggleSave = (jobId: string) => {
        let newSavedJobs;
        if (savedJobs.includes(jobId)) {
            newSavedJobs = savedJobs.filter(id => id !== jobId);
        } else {
            newSavedJobs = [...savedJobs, jobId];
        }
        setSavedJobs(newSavedJobs);
        localStorage.setItem('savedJobs', JSON.stringify(newSavedJobs));
    };

    return { savedJobs, isSaved, toggleSave };
}
