"use client"
import { useMigration } from '@/contexts/MigrationContext'; // Adjust the path as necessary

const CrescendoComponent = () => {
  const { data, error } = useMigration();

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!data.contracts) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Crescendo Data</h1>
      <ul>
        {data?.contracts.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
      <ul>
        {data?.addresses.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
      <ul>
        {Object.keys(data?.contractsByAddress).map((item, index) => (
          <li key={index}><strong>{item}</strong><br/>
            {data?.contractsByAddress[item].join("\n")}
            </li>
        ))}
      </ul>
    </div>
  );
};

export default CrescendoComponent;