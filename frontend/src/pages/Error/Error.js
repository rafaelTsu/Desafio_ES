const ErrorPage = () => {
    return (
      <div className="d-flex flex-column justify-content-center align-items-center vh-100 text-center">
        <h1 className="display-1 text-danger">404</h1>
        <h2 className="mb-4">Página não encontrada!</h2>
        <p className="text-muted mb-4">Desculpe, a página que você está procurando não existe ou foi movida.</p>
        <div className="d-flex gap-3">
          <button 
            className="btn btn-primary" 
            onClick={() => window.history.back()}
          >
            Voltar
          </button>
          <button 
            className="btn btn-secondary" 
            onClick={() => window.location.href = '/'}
          >
            Ir para a Página Inicial
          </button>
        </div>
      </div>
    );
}
  

export default ErrorPage;