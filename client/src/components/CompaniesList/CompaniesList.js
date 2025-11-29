import "./CompaniesList.css";

const CompaniesList = ({ companies }) => {
  return (
    <div className="companies-list-container">
      <ul className="companies-list">
        {companies.map((company) => (
          <li key={company.ID} className="company-item">
            {company.TITLE || company.ID || "No Name"}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CompaniesList;
