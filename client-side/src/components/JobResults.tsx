const dummyJobs = [
    { id: 1, title: 'Développeur Frontend', company: 'Tech Company', location: 'Paris' },
    { id: 2, title: 'Designer UI/UX', company: 'Creative Agency', location: 'Lyon' },
    { id: 3, title: 'Data Scientist', company: 'Data Corp', location: 'Marseille' },
    { id: 4, title: 'Chef de Projet', company: 'Management Co', location: 'Toulouse' },
];

const JobResults: React.FC<{ onToggle: () => void }> = ({ onToggle }) => {
    return (
        <div className="bg-gray-100 p-4 rounded-md shadow-md cursor-pointer" onClick={onToggle}>
            <h2 className="font-bold">Résultats des Offres d'Emploi</h2>
            <ul>
                {dummyJobs.map((job) => (
                    <li key={job.id} className="border-b py-2">
                        <h3 className="text-lg">{job.title}</h3>
                        <p>{job.company} - {job.location}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default JobResults;
