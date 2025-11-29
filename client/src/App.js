import React from "react";
import "./App.css";
import Header from "./components/Header/Header";
import WebhookForm from "./components/WebhookForm/WebhookForm";
import CompaniesList from "./components/CompaniesList/CompaniesList";
import Loading from "./components/Loading/Loading";
import ErrorMessage from "./components/ErrorMessage/ErrorMessage";
import { fetchCompanies } from "./services/api";

function App() {
  const [companies, setCompanies] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(null);

  const handleFetchCompanies = async (webhookUrl) => {
    setLoading(true);
    setError(null);
    setCompanies([]);

    try {
      const data = await fetchCompanies(webhookUrl);
      setCompanies(data.companies || []);
    } catch (err) {
      setError(err.message || "Failed to load companies");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="App">
      <Header />
      <div className="container">
        <WebhookForm onSubmit={handleFetchCompanies} disabled={loading} />
        {loading && <Loading />}
        {error && <ErrorMessage message={error} />}
        {companies.length > 0 && <CompaniesList companies={companies} />}
      </div>
    </div>
  );
}

export default App;
